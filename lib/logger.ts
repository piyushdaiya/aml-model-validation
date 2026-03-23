type ErrorWithMessage = {
  message: string
  stack?: string
  cause?: unknown
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (maybeError instanceof Error) {
    return maybeError
  }

  try {
    return new Error(JSON.stringify(maybeError))
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError))
  }
}

export function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message
}

export function logError(error: unknown, context?: string) {
  const errorWithMessage = toErrorWithMessage(error)

  console.error(`🔴 Error${context ? ` in ${context}` : ""}: ${errorWithMessage.message}`)
  if (errorWithMessage.stack) {
    console.error("Stack trace:", errorWithMessage.stack)
  }
  if (errorWithMessage.cause) {
    console.error("Caused by:", errorWithMessage.cause)
  }

  // Here you could also send the error to an error reporting service
  // like Sentry, LogRocket, etc.
}

