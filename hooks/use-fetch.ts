"use client"

import { useState, useEffect } from "react"
import { logError } from "@/lib/logger"

interface UseFetchResult<T> {
  data: T | null
  error: string | null
  loading: boolean
  mutate: () => Promise<void>
}

export function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const json = await response.json()
      setData(json)
    } catch (err) {
      logError(err, `useFetch: ${url}`)
      setError("Failed to fetch data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [url]) //Fixed dependency

  const mutate = async () => {
    await fetchData()
  }

  return { data, error, loading, mutate }
}

