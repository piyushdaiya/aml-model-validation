import type { Metadata } from "next"
import type React from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "AML Validation Reporting Portal",
    template: "%s | AML Validation Reporting Portal",
  },
  description:
    "Consulting-hosted secure reporting portal for AML validation findings, evidence summaries, audit-ready outputs, and GenAI assurance reporting.",
  applicationName: "AML Validation Reporting Portal",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // suppressHydrationWarning is strictly required by next-themes
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
