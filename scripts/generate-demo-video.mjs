import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const CHROME_DEBUG_BASE = process.env.CHROME_DEBUG_BASE ?? "http://127.0.0.1:9222"
const APP_BASE_URL = process.env.APP_BASE_URL ?? "http://127.0.0.1:3000"
const DEMO_USERNAME = process.env.DEMO_USERNAME ?? "video_undefined"
const DEMO_PASSWORD = process.env.DEMO_PASSWORD ?? "video-pass-123"

const outputDir = path.join(__dirname, "..", "public", "demo", "frames")

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

class CdpClient {
  constructor(webSocketUrl) {
    this.webSocketUrl = webSocketUrl
    this.ws = null
    this.nextId = 1
    this.pending = new Map()
    this.eventWaiters = new Map()
  }

  async connect() {
    await new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.webSocketUrl)
      this.ws.addEventListener("open", resolve, { once: true })
      this.ws.addEventListener("error", reject, { once: true })
      this.ws.addEventListener("message", (event) => {
        const message = JSON.parse(String(event.data))

        if (message.id) {
          const pending = this.pending.get(message.id)
          if (!pending) return

          this.pending.delete(message.id)

          if (message.error) {
            pending.reject(new Error(message.error.message))
            return
          }

          pending.resolve(message.result)
          return
        }

        const waiters = this.eventWaiters.get(message.method)
        if (!waiters || waiters.length === 0) {
          return
        }

        const waiter = waiters.shift()
        waiter?.(message.params)
      })
    })
  }

  async command(method, params = {}) {
    const id = this.nextId++

    const response = new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject })
    })

    this.ws.send(JSON.stringify({ id, method, params }))
    return response
  }

  async waitForEvent(method, timeoutMs = 10000) {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error(`Timed out waiting for ${method}`)), timeoutMs)
      const waiters = this.eventWaiters.get(method) ?? []

      waiters.push((params) => {
        clearTimeout(timeout)
        resolve(params)
      })

      this.eventWaiters.set(method, waiters)
    })
  }

  async evaluate(expression) {
    return this.command("Runtime.evaluate", {
      expression,
      awaitPromise: true,
      returnByValue: true,
    })
  }

  async close() {
    if (!this.ws) return
    this.ws.close()
    await delay(250)
  }
}

async function createTarget(url) {
  const response = await fetch(`${CHROME_DEBUG_BASE}/json/new?${encodeURIComponent(url)}`, { method: "PUT" })

  if (!response.ok) {
    throw new Error(`Failed to create Chrome target: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

async function navigate(client, url) {
  const loadEvent = client.waitForEvent("Page.loadEventFired", 15000).catch(() => null)
  await client.command("Page.navigate", { url })
  await loadEvent
  await delay(1200)
}

async function waitForText(client, text, timeoutMs = 15000) {
  const started = Date.now()

  while (Date.now() - started < timeoutMs) {
    const result = await client.evaluate(`document.body && document.body.innerText.includes(${JSON.stringify(text)})`)
    if (result?.result?.value) {
      return
    }
    await delay(300)
  }

  throw new Error(`Timed out waiting for text: ${text}`)
}

async function capture(client, filename) {
  const result = await client.command("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
    captureBeyondViewport: false,
  })

  await writeFile(path.join(outputDir, filename), Buffer.from(result.data, "base64"))
}

async function setDemoShellState(client, state) {
  await client.evaluate(`
    (() => {
      window.localStorage.setItem("aml-demo-shell-state", ${JSON.stringify(JSON.stringify(state))})
      return true
    })()
  `)
}

async function main() {
  await mkdir(outputDir, { recursive: true })

  const target = await createTarget(`${APP_BASE_URL}/login`)
  const client = new CdpClient(target.webSocketDebuggerUrl)

  await client.connect()
  await client.command("Page.enable")
  await client.command("Runtime.enable")
  await client.command("Network.enable")
  await client.command("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  })

  await navigate(client, `${APP_BASE_URL}/login`)
  await waitForText(client, "AML Model Validation Accelerator")
  await capture(client, "01-login.png")

  await client.evaluate(`
    (() => {
      const setInputValue = (element, value) => {
        const prototype = Object.getPrototypeOf(element)
        const descriptor = Object.getOwnPropertyDescriptor(prototype, "value")
        descriptor.set.call(element, value)
        element.dispatchEvent(new Event("input", { bubbles: true }))
        element.dispatchEvent(new Event("change", { bubbles: true }))
      }

      setInputValue(document.getElementById("username"), ${JSON.stringify(DEMO_USERNAME)})
      setInputValue(document.getElementById("password"), ${JSON.stringify(DEMO_PASSWORD)})
      document.querySelector("form").requestSubmit()
      return true
    })()
  `)

  await waitForText(client, "Executive Dashboard")
  await delay(1800)

  const scenes = [
    {
      file: "02-dashboard-compliance.png",
      route: "/dashboard",
      waitFor: "Review Compliance Posture",
      state: {
        selectedClientId: "northstar-bank",
        personaId: "compliance-officer",
        selectedModelId: "cash-velocity-v32",
      },
    },
    {
      file: "03-dashboard-risk.png",
      route: "/dashboard",
      waitFor: "Review Risk Exposure",
      state: {
        selectedClientId: "atlas-private-bank",
        personaId: "risk-manager",
        selectedModelId: "watchlist-fuzzy-match-v9",
      },
    },
    {
      file: "04-models-owner.png",
      route: "/models",
      waitFor: "Model Inventory",
      state: {
        selectedClientId: "harbor-credit",
        personaId: "model-owner",
        selectedModelId: "customer-risk-v5",
      },
    },
    {
      file: "05-testing-validator.png",
      route: "/testing",
      waitFor: "Testing Lab",
      state: {
        selectedClientId: "summit-payments",
        personaId: "validator",
        selectedModelId: "sanctions-screening-v14",
      },
    },
    {
      file: "06-findings.png",
      route: "/findings",
      waitFor: "Findings & Remediation",
      state: {
        selectedClientId: "atlas-private-bank",
        personaId: "compliance-officer",
        selectedModelId: "watchlist-fuzzy-match-v9",
      },
    },
    {
      file: "07-report-preview.png",
      route: "/reports/watchlist-fuzzy-match-v9",
      waitFor: "Report Preview / Audit Pack",
      state: {
        selectedClientId: "atlas-private-bank",
        personaId: "admin",
        selectedModelId: "watchlist-fuzzy-match-v9",
      },
    },
  ]

  for (const scene of scenes) {
    await setDemoShellState(client, scene.state)
    await navigate(client, `${APP_BASE_URL}${scene.route}`)
    await waitForText(client, scene.waitFor)
    await delay(1000)
    await capture(client, scene.file)
  }

  await client.close()
  console.log(`Generated frames in ${outputDir}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
