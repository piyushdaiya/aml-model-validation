"use client"

import Link from "next/link"
import { notFound, useParams, useRouter } from "next/navigation"
import { ArrowLeft, Bell, HelpCircle } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/app/components/theme-toggle"

type AlertRecord = {
  id: string
  name: string
  type: string
  status: "Open" | "In Progress" | "Closed"
  priority: "Low" | "Medium" | "High"
  assignee: string
  createdAt: string
  description: string
  partyId: string
  partyName: string
}

const alerts: AlertRecord[] = [
  {
    id: "ALT-001",
    name: "Suspicious Transaction Pattern",
    type: "Transaction Monitoring",
    status: "Open",
    priority: "High",
    assignee: "John Doe",
    createdAt: "2024-08-30 09:15:00",
    description: "Multiple high-value transactions were detected in a short period of time.",
    partyId: "ENT-001",
    partyName: "John Doe",
  },
  {
    id: "ALT-002",
    name: "Potential Identity Theft",
    type: "KYC",
    status: "In Progress",
    priority: "Medium",
    assignee: "Jane Smith",
    createdAt: "2024-08-30 10:30:00",
    description: "Profile changes and login attempts indicate a possible account takeover scenario.",
    partyId: "ENT-002",
    partyName: "Acme Corporation",
  },
  {
    id: "ALT-003",
    name: "Large Cash Deposit",
    type: "Transaction Monitoring",
    status: "Open",
    priority: "High",
    assignee: "Unassigned",
    createdAt: "2024-08-30 11:45:00",
    description: "A large cash deposit exceeded the configured monitoring threshold.",
    partyId: "ENT-003",
    partyName: "Global Charity Foundation",
  },
  {
    id: "ALT-004",
    name: "Sanctions List Match",
    type: "Compliance",
    status: "Closed",
    priority: "High",
    assignee: "Bob Johnson",
    createdAt: "2024-08-30 13:00:00",
    description: "A sanctions-screening hit was reviewed and resolved.",
    partyId: "ENT-004",
    partyName: "Jane Smith",
  },
  {
    id: "ALT-005",
    name: "Unusual Account Activity",
    type: "Fraud Detection",
    status: "Open",
    priority: "Medium",
    assignee: "Alice Brown",
    createdAt: "2024-08-30 14:15:00",
    description: "Behavioral anomaly detection flagged account access from unusual locations.",
    partyId: "ENT-005",
    partyName: "Tech Innovators LLC",
  },
]

export default function AlertDetailsPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const alertRecord = alerts.find((item) => item.id === params.id)

  if (!alertRecord) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-14 items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push("/alerts")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold">Alert Details</h1>
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
        <div className="mb-6 space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">{alertRecord.name}</h2>
          <p className="text-sm text-muted-foreground">Review the alert context and linked party information.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Badge variant={alertRecord.status === "Open" ? "default" : alertRecord.status === "In Progress" ? "secondary" : "outline"}>
                  {alertRecord.status}
                </Badge>
                <Badge variant={alertRecord.priority === "High" ? "destructive" : alertRecord.priority === "Medium" ? "warning" : "default"}>
                  {alertRecord.priority}
                </Badge>
              </div>
              <dl className="grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-sm text-muted-foreground">Alert ID</dt>
                  <dd className="font-medium">{alertRecord.id}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Type</dt>
                  <dd className="font-medium">{alertRecord.type}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Assignee</dt>
                  <dd className="font-medium">{alertRecord.assignee}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Created At</dt>
                  <dd className="font-medium">{alertRecord.createdAt}</dd>
                </div>
              </dl>
              <div>
                <h3 className="mb-2 text-sm font-medium">Description</h3>
                <p className="text-sm text-muted-foreground">{alertRecord.description}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Related Party</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">Party ID</p>
                <p className="font-medium">{alertRecord.partyId}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Party Name</p>
                <Link href={`/parties/${alertRecord.partyId}`} className="font-medium text-primary hover:underline">
                  {alertRecord.partyName}
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
