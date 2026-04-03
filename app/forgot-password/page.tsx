"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { KeyRound, Mail } from "lucide-react"

import { ThemeToggle } from "../components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPasswordPage() {
  const [identifier, setIdentifier] = useState("")
  const [message, setMessage] = useState<string | null>(null)
  const [resetUrl, setResetUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setMessage(null)
    setResetUrl(null)
    setIsLoading(true)

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: identifier.trim() }),
      })

      const contentType = res.headers.get("content-type") ?? ""
      const data = contentType.includes("application/json")
        ? await res.json()
        : { error: await res.text() }

      if (!res.ok) {
        throw new Error(data.error || "Unable to start password reset")
      }

      setMessage(data.message ?? "If an account matches that email or username, a reset link is now available.")
      setResetUrl(data.demoResetUrl ?? null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to start password reset")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="mb-6 flex justify-center">
            <div className="rounded-md bg-primary/10 p-2">
              <KeyRound className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-center text-2xl">Forgot password</CardTitle>
          <CardDescription className="text-center">
            Request a password reset link for the secure reporting portal using your email or username.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error ? <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div> : null}
            {message ? <div className="rounded-md border border-border bg-muted/40 p-3 text-sm text-muted-foreground">{message}</div> : null}
            {resetUrl ? (
              <div className="rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">
                Demo reset link:{" "}
                <Link href={resetUrl} className="font-medium underline">
                  Open reset password
                </Link>
              </div>
            ) : null}

            <div className="space-y-2">
              <Label htmlFor="identifier">Email or username</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="identifier"
                  placeholder="name@example.com or username"
                  className="pl-10"
                  value={identifier}
                  onChange={(event) => setIdentifier(event.target.value)}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Requesting reset..." : "Request reset link"}
            </Button>

            <div className="text-center text-sm">
              Remembered your password?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
