"use client"

import React, { type ErrorInfo, type ReactNode } from "react"

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 border border-red-500 rounded-md bg-red-100 text-red-700">
          <h2 className="text-lg font-bold mb-2">Something went wrong</h2>
          <p className="mb-2">Error: {this.state.error?.message}</p>
          <p className="mb-2">Stack: {this.state.error?.stack}</p>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

