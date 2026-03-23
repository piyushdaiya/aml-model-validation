"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { useEffect } from "react"
import { logError } from "@/lib/logger"

interface Props {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorBoundary({ error, reset }: Props) {
  useEffect(() => {
    logError(error)
  }, [error])

  return (
    <Card className="mx-auto max-w-md mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <AlertCircle className="h-5 w-5" />
          Something went wrong
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground space-y-2">
          <p>An error occurred while trying to perform this operation.</p>
          {process.env.NODE_ENV === "development" && (
            <>
              <p className="font-mono text-xs">{error.message}</p>
              {error.digest && <p className="font-mono text-xs">Error ID: {error.digest}</p>}
            </>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={reset}>Try again</Button>
      </CardFooter>
    </Card>
  )
}

