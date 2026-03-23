import type { Metadata } from "next"
import type React from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "AML Model Validation Accelerator",
    template: "%s | AML Model Validation Accelerator",
  },
  description:
    "Consulting-grade AML model validation accelerator for stakeholder demos, client previews, and future product buildout.",
  applicationName: "AML Model Validation Accelerator",
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
