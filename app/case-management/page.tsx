"use client"

import { useState } from "react"
import {
  ArrowUpDown,
  ChevronDown,
  Copy,
  Search,
  HelpCircle,
  Bell,
  MoreVertical,
  RefreshCcw,
  Filter,
  ArrowLeft,
  ExternalLink,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ThemeToggle } from "../components/theme-toggle"
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

const filters = [
  { label: "Active cases", active: true },
  { label: "With hits", active: false },
  { label: "Created", active: false },
  { label: "Entity", active: false },
  { label: "Residence country", active: false },
  { label: "Match status", active: false },
  { label: "Status", active: false },
]

export default function CaseManagement() {
  const [selectedFilters, setSelectedFilters] = useState(filters)

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex items-center h-14 gap-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-md">
              <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20 6H16V4C16 2.89 15.11 2 14 2H10C8.89 2 8 2.89 8 4V6H4C2.89 6 2.01 6.89 2.01 8L2 19C2 20.11 2.89 21 4 21H20C21.11 21 22 20.11 22 19V8C22 6.89 21.11 6 20 6ZM10 4H14V6H10V4Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-semibold">Case management</h1>
              <div className="flex items-center gap-2">
                <Button variant="link" className="h-auto p-0 text-primary">
                  All AML cases
                </Button>
                <span className="text-muted-foreground">Max K.</span>
              </div>
            </div>
          </div>
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
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search by case ID, entity name or entity ID" className="pl-10" />
          </div>
          <Button variant="ghost" size="icon">
            <RefreshCcw className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          {selectedFilters.map((filter, index) => (
            <Button
              key={index}
              variant={filter.active ? "secondary" : "ghost"}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              {filter.label}
              <ChevronDown className="h-4 w-4" />
            </Button>
          ))}
          <Button variant="outline" className="flex items-center gap-2 whitespace-nowrap">
            <Filter className="h-4 w-4" />
            Add filter
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox />
                </TableHead>
                <TableHead>
                  <Button variant="ghost" className="flex items-center gap-2 p-0 font-semibold">
                    Entity
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>AML risk labels</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Case origin</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cases.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{item.entity.name}</div>
                      <div className="text-sm text-muted-foreground">{item.entity.type}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-mono">{item.id}</span>
                      <Button variant="ghost" size="icon" className="h-4 w-4">
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Badge
                        variant="secondary"
                        className={
                          item.status.type === "approved"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-purple-50 text-purple-600"
                        }
                      >
                        {item.status.label}... {item.status.timeAgo}
                      </Badge>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="h-2 w-2 rounded-full bg-amber-400" />
                        <span className="text-muted-foreground">Active — {item.monitoring.status}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {item.riskLabels.map((label, index) => (
                        <Badge key={index} variant="secondary" className="bg-amber-50 text-amber-600">
                          {label}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center gap-2">
                          {item.assignee}
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Assign to me</DropdownMenuItem>
                        <DropdownMenuItem>Assign to team</DropdownMenuItem>
                        <DropdownMenuItem>Unassign</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-slate-100">
                      {item.origin}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{item.created}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/cases/${item.id}`}>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View
                      </Link>
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

