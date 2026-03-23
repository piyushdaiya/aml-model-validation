"use client"

import { useState } from "react"
import { logError } from "@/lib/logger"

interface UseMutationOptions<TData, TVariables> {
  onSuccess?: (data: TData) => void
  onError?: (error: Error) => void
}

interface UseMutationResult<TData, TVariables> {
  mutate: (variables: TVariables) => Promise<void>
  loading: boolean
  error: Error | null
  data: TData | null
}

export function useMutation<TData = any, TVariables = any>(
  url: string,
  options: UseMutationOptions<TData, TVariables> = {},
): UseMutationResult<TData, TVariables> {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [data, setData] = useState<TData | null>(null)

  const mutate = async (variables: TVariables) => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(variables),
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.error || "An error occurred")
      }

      setData(responseData)
      options.onSuccess?.(responseData)
    } catch (err) {
      const error = err instanceof Error ? err : new Error("An error occurred")
      logError(error, `useMutation: ${url}`)
      setError(error)
      options.onError?.(error)
    } finally {
      setLoading(false)
    }
  }

  return { mutate, loading, error, data }
}

