import { mkdir } from "node:fs/promises"
import { spawn } from "node:child_process"
import path from "node:path"

import { OUTPUT_SIZE } from "./scenes.mjs"

function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: "inherit",
      ...options,
    })

    child.on("error", reject)
    child.on("close", (code) => {
      if (code === 0) {
        resolve()
        return
      }

      reject(new Error(`${command} exited with code ${code}`))
    })
  })
}

export async function renderDemoAssets({ scenes, framesDir, outputMp4, outputGif, cwd }) {
  await mkdir(path.dirname(outputMp4), { recursive: true })
  await mkdir(path.dirname(outputGif), { recursive: true })

  const inputs = []
  const filters = []
  const concatInputs = []

  scenes.forEach((scene, index) => {
    const framePath = `${framesDir}/${scene.id}.png`

    inputs.push("-loop", "1", "-t", String(scene.durationSeconds), "-i", framePath)
    filters.push(
      `[${index}:v]scale=${OUTPUT_SIZE.width}:${OUTPUT_SIZE.height}:force_original_aspect_ratio=decrease,` +
        `pad=${OUTPUT_SIZE.width}:${OUTPUT_SIZE.height}:(ow-iw)/2:(oh-ih)/2:color=white[v${index}]`
    )
    concatInputs.push(`[v${index}]`)
  })

  const filterComplex = `${filters.join(";")};${concatInputs.join("")}concat=n=${scenes.length}:v=1:a=0,format=yuv420p[vout]`

  await runCommand(
    "ffmpeg",
    [
      "-y",
      ...inputs,
      "-filter_complex",
      filterComplex,
      "-map",
      "[vout]",
      "-r",
      "30",
      "-c:v",
      "libx264",
      "-pix_fmt",
      "yuv420p",
      outputMp4,
    ],
    { cwd }
  )

  await runCommand(
    "ffmpeg",
    [
      "-y",
      "-i",
      outputMp4,
      "-vf",
      "fps=8,scale=1200:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=128[p];[s1][p]paletteuse=dither=bayer",
      outputGif,
    ],
    { cwd }
  )
}
