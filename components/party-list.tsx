"use client"

import { useFetch } from "@/hooks/use-fetch"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import Loading from "@/components/loading"
import { AlertCircle, RefreshCw } from "lucide-react"

interface Party {
  id: string
  name: string
  // ... other party fields
}

export default function PartyList() {
  const { data, error, loading, mutate } = useFetch<Party[]>("/api/parties")

  if (loading) {
    return <Loading message="Loading parties..." />
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex items-center justify-between">
          {error}
          <Button variant="outline" size="sm" onClick={() => mutate()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Try again
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  return <div>{/* Render party list */}</div>
}

