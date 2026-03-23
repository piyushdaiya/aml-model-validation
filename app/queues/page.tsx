"use client"

import { useState } from "react"
import { ArrowLeft, HelpCircle, Bell } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ThemeToggle } from "../components/theme-toggle"
import Link from "next/link"
import ErrorBoundary from "../components/error-boundary"

type Alert = {
  id: string
  name: string
  type: string
  status: "Open" | "In Progress" | "Closed"
  priority: "Low" | "Medium" | "High"
  assignee: string
  createdAt: string
  entityName: string
}

type User = {
  id: string
  name: string
  role: string
  avatarUrl: string
  alerts: Alert[]
}

const users: User[] = [
  {
    id: "USR-001",
    name: "John Doe",
    role: "Analyst",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    alerts: [
      {
        id: "ALT-001",
        name: "Suspicious Transaction Pattern",
        type: "Transaction Monitoring",
        status: "Open",
        priority: "High",
        assignee: "John Doe",
        createdAt: "2024-08-30 09:15:00",
        entityName: "Acme Corp",
      },
      {
        id: "ALT-002",
        name: "Large Cash Deposit",
        type: "Transaction Monitoring",
        status: "In Progress",
        priority: "Medium",
        assignee: "John Doe",
        createdAt: "2024-08-30 10:30:00",
        entityName: "John Smith",
      },
    ],
  },
  {
    id: "USR-002",
    name: "Jane Smith",
    role: "Compliance Officer",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    alerts: [
      {
        id: "ALT-003",
        name: "Potential Identity Theft",
        type: "KYC",
        status: "Open",
        priority: "High",
        assignee: "Jane Smith",
        createdAt: "2024-08-30 11:45:00",
        entityName: "Global Tech Inc",
      },
    ],
  },
  {
    id: "USR-003",
    name: "Bob Johnson",
    role: "Analyst",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    alerts: [
      {
        id: "ALT-004",
        name: "Unusual Account Activity",
        type: "Fraud Detection",
        status: "Open",
        priority: "Medium",
        assignee: "Bob Johnson",
        createdAt: "2024-08-30 13:00:00",
        entityName: "Sarah Williams",
      },
      {
        id: "ALT-005",
        name: "Sanctions List Match",
        type: "Compliance",
        status: "In Progress",
        priority: "High",
        assignee: "Bob Johnson",
        createdAt: "2024-08-30 14:15:00",
        entityName: "XYZ Corporation",
      },
    ],
  },
]

function UserCard({ user, onClick }: { user: User; onClick: () => void }) {
  return (
    <Card className="cursor-pointer hover:bg-accent" onClick={onClick}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{user.name}</CardTitle>
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.avatarUrl} alt={`${user.name}'s avatar`} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{user.alerts.length}</div>
        <p className="text-xs text-muted-foreground">{user.alerts.length === 1 ? "Alert" : "Alerts"} Assigned</p>
        <p className="text-xs text-muted-foreground mt-1">{user.role}</p>
      </CardContent>
    </Card>
  )
}

function AlertsTable({ alerts }: { alerts: Alert[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Entity</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {alerts.map((alert) => (
          <TableRow key={alert.id}>
            <TableCell className="font-medium">{alert.id}</TableCell>
            <TableCell>{alert.name}</TableCell>
            <TableCell>{alert.type}</TableCell>
            <TableCell>
              <Badge
                variant={alert.status === "Open" ? "default" : alert.status === "In Progress" ? "secondary" : "outline"}
              >
                {alert.status}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge
                variant={
                  alert.priority === "High" ? "destructive" : alert.priority === "Medium" ? "warning" : "default"
                }
              >
                {alert.priority}
              </Badge>
            </TableCell>
            <TableCell>{alert.entityName}</TableCell>
            <TableCell>{alert.createdAt}</TableCell>
            <TableCell>
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/alerts/${alert.id}`}>View Details</Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default function Queues() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container flex items-center h-14 gap-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-lg font-semibold">Queues</h1>
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
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">User Queues</h2>
              <p className="text-sm text-muted-foreground">View alerts assigned to users</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
              <UserCard key={user.id} user={user} onClick={() => setSelectedUser(user)} />
            ))}
          </div>

          {selectedUser && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Alerts Assigned to {selectedUser.name}</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedUser.alerts.length > 0 ? (
                  <AlertsTable alerts={selectedUser.alerts} />
                ) : (
                  <p>No alerts assigned to this user.</p>
                )}
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </ErrorBoundary>
  )
}

