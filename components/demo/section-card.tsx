import * as React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function SectionCard({
  title,
  description,
  action,
  children,
  contentClassName,
}: {
  title: string
  description?: string
  action?: React.ReactNode
  children: React.ReactNode
  contentClassName?: string
}) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 border-b border-slate-100 bg-slate-50/60">
        <div className="space-y-1">
          <CardTitle className="text-lg text-slate-900">{title}</CardTitle>
          {description ? <CardDescription className="max-w-2xl text-slate-600">{description}</CardDescription> : null}
        </div>
        {action}
      </CardHeader>
      <CardContent className={contentClassName}>{children}</CardContent>
    </Card>
  )
}
