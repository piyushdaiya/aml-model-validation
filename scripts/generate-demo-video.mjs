import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

import { RAW_FRAME_DIR, SCENES, VIDEO_OUTPUTS, FRAME_SIZE } from "./demo-video/scenes.mjs"
import { renderDemoAssets } from "./demo-video/render-assets.mjs"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.join(__dirname, "..")

const CHROME_DEBUG_BASE = process.env.CHROME_DEBUG_BASE ?? "http://127.0.0.1:9222"
const APP_BASE_URL = process.env.APP_BASE_URL ?? "http://127.0.0.1:3000"
const DEMO_USERNAME = process.env.DEMO_USERNAME ?? "video_demo"
const DEMO_EMAIL = process.env.DEMO_EMAIL ?? `${DEMO_USERNAME}@example.com`
const DEMO_PASSWORD = process.env.DEMO_PASSWORD ?? "video-pass-123"

const outputDir = path.join(repoRoot, RAW_FRAME_DIR)

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

async function navigate(client, target) {
  const url = typeof target === "string" ? target : `data:text/html;charset=utf-8,${encodeURIComponent(target.html)}`
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

async function clickTab(client, label) {
  await client.evaluate(`
    (() => {
      const tab = Array.from(document.querySelectorAll('[role="tab"]')).find((element) =>
        element.textContent?.trim() === ${JSON.stringify(label)}
      )

      if (!tab) {
        throw new Error('Unable to find tab: ' + ${JSON.stringify(label)})
      }

      tab.click()
      return true
    })()
  `)
}

async function loginDemoUser(client) {
  await navigate(client, `${APP_BASE_URL}/login`)
  await waitForText(client, "AML Validation Reporting Portal")
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
      document.querySelector("form")?.requestSubmit()
      return true
    })()
  `)
  await waitForText(client, "Executive Dashboard")
  await delay(1200)
}

async function ensureDemoUser() {
  const response = await fetch(`${APP_BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: DEMO_EMAIL,
      username: DEMO_USERNAME,
      password: DEMO_PASSWORD,
    }),
  })

  if (response.ok) {
    return
  }

  const payload = await response.json().catch(() => null)
  if (payload?.error === "Username or Email already exists") {
    return
  }

  throw new Error(`Unable to prepare demo user: ${response.status} ${JSON.stringify(payload)}`)
}

async function main() {
  await mkdir(outputDir, { recursive: true })
  await ensureDemoUser()

  const target = await createTarget(`${APP_BASE_URL}/login`)
  const client = new CdpClient(target.webSocketDebuggerUrl)

  await client.connect()
  await client.command("Page.enable")
  await client.command("Runtime.enable")
  await client.command("Network.enable")
  await client.command("Emulation.setDeviceMetricsOverride", {
    width: FRAME_SIZE.width,
    height: FRAME_SIZE.height,
    deviceScaleFactor: 1,
    mobile: false,
  })

  let didLogin = false

  for (const [index, scene] of SCENES.entries()) {
    const isProtectedRoute = typeof scene.route === "string" && !["/login", "/register"].includes(scene.route)

    if (isProtectedRoute && !didLogin) {
      await loginDemoUser(client)
      didLogin = true
    }

    if (scene.state) {
      await setDemoShellState(client, scene.state)
      await delay(300)
    }

    const targetUrl = typeof scene.route === "string" ? `${APP_BASE_URL}${scene.route}` : scene.route
    await navigate(client, targetUrl)

    const waitFor = typeof scene.route === "string" ? scene.waitForText : scene.route.waitForText
    if (waitFor) {
      await waitForText(client, waitFor)
    }

    if (scene.afterNavigate?.type === "click-tab") {
      await clickTab(client, scene.afterNavigate.label)
      await delay(300)
      if (scene.afterNavigate.waitForText) {
        await waitForText(client, scene.afterNavigate.waitForText)
      }
      await delay(600)
    }

    await capture(client, `${scene.id}.png`)

    if (index === 1 && !didLogin) {
      await loginDemoUser(client)
      didLogin = true
    }
  }

  await client.close()

  await renderDemoAssets({
    scenes: SCENES,
    framesDir: outputDir,
    outputMp4: path.join(repoRoot, VIDEO_OUTPUTS.mp4),
    outputGif: path.join(repoRoot, VIDEO_OUTPUTS.gif),
    cwd: repoRoot,
  })

  console.log(`Generated frames in ${outputDir}`)
  console.log(`Generated video at ${path.join(repoRoot, VIDEO_OUTPUTS.mp4)}`)
  console.log(`Generated preview at ${path.join(repoRoot, VIDEO_OUTPUTS.gif)}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
