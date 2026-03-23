"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, HelpCircle, Bell, AlertTriangle, LinkIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "../../components/theme-toggle"
import Link from "next/link"

type Case = {
  id: string
  entity: {
    id: string
    name: string
    type: string
  }
  status: {
    label: string
    timeAgo: string
    type: "approved" | "requires-action"
  }
  monitoring: {
    status: string
    isActive: boolean
  }
  riskLabels: string[]
  assignee: string
  origin: string
  created: string
  alertIds: string[]
}

const cases: Case[] = [
  {
    id: "66d04460b7401...",
    entity: {
      id: "ENT-001",
      name: "Jack Posek",
      type: "Counterparty • Individual",
    },
    status: {
      label: "Approved",
      timeAgo: "Took a few s...",
      type: "approved",
    },
    monitoring: {
      status: "Ongoing monitoring off",
      isActive: true,
    },
    riskLabels: [],
    assignee: "Unassigned",
    origin: "New case",
    created: "Aug 29, 2024 10:50 AM (GMT+1)",
    alertIds: ["ALT-001", "ALT-002"],
  },
  {
    id: "66d04035a882c...",
    entity: {
      id: "ENT-002",
      name: "John Dough",
      type: "Counterparty • Individual",
    },
    status: {
      label: "Approved",
      timeAgo: "Took a few s...",
      type: "approved",
    },
    monitoring: {
      status: "Ongoing monitoring off",
      isActive: true,
    },
    riskLabels: [],
    assignee: "Unassigned",
    origin: "New case",
    created: "Aug 29, 2024 10:32 AM (GMT+1)",
    alertIds: ["ALT-003"],
  },
  {
    id: "66d03f98d1b163...",
    entity: {
      id: "ENT-003",
      name: "Acme Corp",
      type: "Counterparty • Business",
    },
    status: {
      label: "Approved",
      timeAgo: "Took a few s...",
      type: "approved",
    },
    monitoring: {
      status: "Ongoing monitoring off",
      isActive: true,
    },
    riskLabels: [],
    assignee: "Unassigned",
    origin: "New case",
    created: "Aug 29, 2024 10:15 AM (GMT+1)",
    alertIds: ["ALT-004", "ALT-005"],
  },
  {
    id: "66d03e1bd9f06...",
    entity: {
      id: "ENT-004",
      name: "Global Charity Foundation",
      type: "Counterparty • Organization",
    },
    status: {
      label: "Requires action",
      timeAgo: "6 ho...",
      type: "requires-action",
    },
    monitoring: {
      status: "Ongoing monitoring off",
      isActive: true,
    },
    riskLabels: ["Adverse Media", "Terrorism", "PEP"],
    assignee: "Unassigned",
    origin: "I",
    created: "Aug 29, 2024 9:45 AM (GMT+1)",
    alertIds: ["ALT-006", "ALT-007", "ALT-008"],
  },
]

export default function CaseDetails() {
  const params = useParams()
  const router = useRouter()
  const [caseData, setCaseData] = useState<Case | null>(null)

  useEffect(() => {
    const foundCase = cases.find((c) => c.id === params.id)
    if (foundCase) {
      setCaseData(foundCase)
    }
  }, [params.id])

  if (!caseData) {
    return <div>Case not found</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex items-center h-14 gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold">Case Details</h1>
          <span className="text-muted-foreground">Max K.</span>
          <div className="ml-auto flex items-center gap-4">
            <ThemeToggle />
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Avatar>
              <AvatarImage
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-02%20at%2011.08.45%E2%80%AFAM-AffLYlH3E3alKZzLeiso0Ng8V9QC0h.png"
                alt="User avatar"
              />
              <AvatarFallback>MK</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="container py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold tracking-tight">Case {caseData.id}</h2>
          <p className="text-sm text-muted-foreground">Detailed information about the case</p>
        </div>

        <Tabs defaultValue="details" className="space-y-4">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="risk-assessment">Risk Assessment</TabsTrigger>
            <TabsTrigger value="related-alerts">Related Alerts</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Case Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">ID</dt>
                      <dd className="text-sm font-semibold">{caseData.id}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Entity ID</dt>
                      <dd className="text-sm font-semibold">{caseData.entity.id}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Entity Name</dt>
                      <dd className="text-sm font-semibold">{caseData.entity.name}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Entity Type</dt>
                      <dd className="text-sm font-semibold">{caseData.entity.type}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Status</dt>
                      <dd>
                        <Badge variant={caseData.status.type === "approved" ? "default" : "secondary"}>
                          {caseData.status.label}
                        </Badge>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Assignee</dt>
                      <dd className="text-sm font-semibold">{caseData.assignee}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Origin</dt>
                      <dd className="text-sm font-semibold">{caseData.origin}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Created</dt>
                      <dd className="text-sm font-semibold">{caseData.created}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monitoring</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Status</dt>
                      <dd className="text-sm font-semibold">{caseData.monitoring.status}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Active</dt>
                      <dd className="text-sm font-semibold">{caseData.monitoring.isActive ? "Yes" : "No"}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="risk-assessment">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Risk Labels</h3>
                  {caseData.riskLabels.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {caseData.riskLabels.map((label, index) => (
                        <Badge key={index} variant="secondary" className="bg-amber-50 text-amber-600">
                          {label}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p>No risk labels associated with this case.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="related-alerts">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Related Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                {caseData.alertIds.length > 0 ? (
                  <ul className="space-y-2">
                    {caseData.alertIds.map((alertId) => (
                      <li key={alertId} className="flex items-center gap-2">
                        <LinkIcon className="h-4 w-4" />
                        <Link href={`/alerts/${alertId}`} className="text-primary hover:underline">
                          {alertId}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No related alerts for this case.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <Button variant="outline" onClick={() => router.push("/case-management")}>
            Back to Case Management
          </Button>
        </div>
      </main>
    </div>
  )
}

