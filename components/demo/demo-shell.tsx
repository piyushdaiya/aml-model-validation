"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpenText, Building2, ClipboardCheck, FileBadge2, LayoutDashboard, Settings2 } from "lucide-react"

import { ClientSelector } from "@/components/demo/client-selector"
import { DemoProvider, useDemoContext } from "@/components/demo/demo-context"
import { PersonaSwitcher } from "@/components/demo/persona-switcher"
import { Button } from "@/components/ui/button"
import { clientEngagements } from "@/lib/demo-data/clients"
import { demoPersonas } from "@/lib/demo-data/personas"
import { cn } from "@/lib/utils"

const navigation = [
  { href: "/dashboard", label: "Executive Dashboard", icon: LayoutDashboard },
  { href: "/models", label: "Validation Inventory", icon: Building2 },
  { href: "/testing", label: "Testing Evidence", icon: ClipboardCheck },
  { href: "/findings", label: "Findings & Remediation", icon: FileBadge2 },
]

function DemoShellInner({
  title,
  description,
  actions,
  children,
}: {
  title: string
  description: string
  actions?: React.ReactNode
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { activeClient, activeModel, personaId, selectedClientId, setPersonaId, setSelectedClientId } = useDemoContext()

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef2f7_100%)] text-slate-950">
      <div className="flex min-h-screen">
        <aside className="hidden w-[280px] flex-col border-r border-slate-200 bg-slate-950 text-slate-100 lg:flex">
          <div className="border-b border-slate-800 px-6 py-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Secure Reporting Portal</p>
            <h1 className="mt-3 text-xl font-semibold tracking-tight">AML Validation Reporting Portal</h1>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Consulting-hosted portal for multi-client reporting, evidence summaries, findings, remediation tracking, and committee-ready outputs across traditional AML and GenAI validation.
            </p>
          </div>
          <nav className="flex-1 space-y-2 px-4 py-6">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition",
                    isActive ? "bg-white text-slate-950 shadow-sm" : "text-slate-300 hover:bg-slate-900 hover:text-white"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
            <Link
              href={`/reports/${activeModel.id}`}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition",
                pathname.startsWith("/reports/") ? "bg-white text-slate-950 shadow-sm" : "text-slate-300 hover:bg-slate-900 hover:text-white"
              )}
            >
              <BookOpenText className="h-4 w-4" />
              Report Preview
            </Link>
            <Link
              href="/settings/demo"
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition",
                pathname === "/settings/demo" ? "bg-white text-slate-950 shadow-sm" : "text-slate-300 hover:bg-slate-900 hover:text-white"
              )}
            >
              <Settings2 className="h-4 w-4" />
              Demo Settings
            </Link>
          </nav>
          <div className="border-t border-slate-800 px-6 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Current focus</p>
            <p className="mt-2 text-sm font-medium text-white">{activeClient.clientName}</p>
            <p className="mt-1 text-sm text-slate-400">{activeModel.name}</p>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <div className="border-b border-slate-200 bg-white/80 backdrop-blur">
            <div className="mx-auto max-w-[1600px] px-6 py-5 lg:px-10">
              <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {activeClient.engagementName}
                  </p>
                  <div>
                    <h2 className="text-3xl font-semibold tracking-tight text-slate-950">{title}</h2>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{description}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 xl:items-end">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <ClientSelector
                      clients={clientEngagements}
                      value={selectedClientId}
                      onValueChange={setSelectedClientId}
                    />
                    <PersonaSwitcher value={personaId} onValueChange={setPersonaId} />
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600">
                      {demoPersonas.find((persona) => persona.id === personaId)?.description}
                    </div>
                    {actions}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-[1600px] px-6 py-8 lg:px-10">{children}</div>
        </main>
      </div>
    </div>
  )
}

export function DemoShell({
  title,
  description,
  actions,
  children,
}: {
  title: string
  description: string
  actions?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <DemoProvider>
      <DemoShellInner title={title} description={description} actions={actions}>
        {children}
      </DemoShellInner>
    </DemoProvider>
  )
}

export function DemoPrimaryAction({ children }: { children: React.ReactNode }) {
  return <Button className="bg-slate-950 text-white hover:bg-slate-800">{children}</Button>
}
