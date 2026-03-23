"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, HelpCircle, Bell, Search, Filter, MoreVertical, ChevronDown, ArrowUpDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ThemeToggle } from "../components/theme-toggle"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

type Alert = {
  id: string
  name: string
  type: string
  status: "Open" | "In Progress" | "Closed"
  priority: "Low" | "Medium" | "High"
  assignee: string
  createdAt: string
  entityId: string
  entityName: string
}

const alerts: Alert[] = [
  {
    id: "ALT-001",
    name: "Suspicious Transaction Pattern",
    type: "Transaction Monitoring",
    status: "Open",
    priority: "High",
    assignee: "John Doe",
    createdAt: "2024-08-30 09:15:00",
    entityId: "ENT-001",
    entityName: "John Doe",
  },
  {
    id: "ALT-002",
    name: "Potential Identity Theft",
    type: "KYC",
    status: "In Progress",
    priority: "Medium",
    assignee: "Jane Smith",
    createdAt: "2024-08-30 10:30:00",
    entityId: "ENT-002",
    entityName: "Acme Corporation",
  },
  {
    id: "ALT-003",
    name: "Large Cash Deposit",
    type: "Transaction Monitoring",
    status: "Open",
    priority: "High",
    assignee: "Unassigned",
    createdAt: "2024-08-30 11:45:00",
    entityId: "ENT-003",
    entityName: "Global Charity Foundation",
  },
  {
    id: "ALT-004",
    name: "Sanctions List Match",
    type: "Compliance",
    status: "Closed",
    priority: "High",
    assignee: "Bob Johnson",
    createdAt: "2024-08-30 13:00:00",
    entityId: "ENT-004",
    entityName: "Jane Smith",
  },
  {
    id: "ALT-005",
    name: "Unusual Account Activity",
    type: "Fraud Detection",
    status: "Open",
    priority: "Medium",
    assignee: "Alice Brown",
    createdAt: "2024-08-30 14:15:00",
    entityId: "ENT-005",
    entityName: "Tech Innovators LLC",
  },
]

export default function AlertManagement() {
  const router = useRouter()
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex items-center h-14 gap-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold">Alert Management</h1>
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
            <h2 className="text-2xl font-semibold tracking-tight">Alerts</h2>
            <p className="text-sm text-muted-foreground">View and manage all alerts</p>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search alerts..." className="pl-10" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Status</DropdownMenuItem>
              <DropdownMenuItem>Priority</DropdownMenuItem>
              <DropdownMenuItem>Type</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button variant="ghost" className="flex items-center gap-1 p-0">
                    ID
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Assignee</TableHead>
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
                      variant={
                        alert.status === "Open" ? "default" : alert.status === "In Progress" ? "secondary" : "outline"
                      }
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
                  <TableCell>{alert.assignee}</TableCell>
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
        </div>
      </main>
    </div>
  )
}

