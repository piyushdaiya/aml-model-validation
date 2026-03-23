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

type Party = {
  id: string
  name: string
  type: "Individual" | "Business" | "Organization"
  status: "Active" | "Inactive" | "Under Review"
  riskLevel: "Low" | "Medium" | "High"
  createdAt: string
}

const parties: Party[] = [
  {
    id: "PTY-001",
    name: "John Doe",
    type: "Individual",
    status: "Active",
    riskLevel: "Low",
    createdAt: "2024-08-30 09:15:00",
  },
  {
    id: "PTY-002",
    name: "Acme Corporation",
    type: "Business",
    status: "Active",
    riskLevel: "Medium",
    createdAt: "2024-08-30 10:30:00",
  },
  {
    id: "PTY-003",
    name: "Global Charity Foundation",
    type: "Organization",
    status: "Under Review",
    riskLevel: "High",
    createdAt: "2024-08-30 11:45:00",
  },
  {
    id: "PTY-004",
    name: "Jane Smith",
    type: "Individual",
    status: "Inactive",
    riskLevel: "Low",
    createdAt: "2024-08-30 13:00:00",
  },
  {
    id: "PTY-005",
    name: "Tech Innovators LLC",
    type: "Business",
    status: "Active",
    riskLevel: "Medium",
    createdAt: "2024-08-30 14:15:00",
  },
]

export default function PartyManagement() {
  const router = useRouter()
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex items-center h-14 gap-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold">Party Management</h1>
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
            <h2 className="text-2xl font-semibold tracking-tight">Parties</h2>
            <p className="text-sm text-muted-foreground">View and manage all parties</p>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search parties..." className="pl-10" />
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
              <DropdownMenuItem>Type</DropdownMenuItem>
              <DropdownMenuItem>Status</DropdownMenuItem>
              <DropdownMenuItem>Risk Level</DropdownMenuItem>
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
                <TableHead>Risk Level</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {parties.map((party) => (
                <TableRow key={party.id}>
                  <TableCell className="font-medium">{party.id}</TableCell>
                  <TableCell>{party.name}</TableCell>
                  <TableCell>{party.type}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        party.status === "Active" ? "default" : party.status === "Inactive" ? "secondary" : "outline"
                      }
                    >
                      {party.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        party.riskLevel === "High"
                          ? "destructive"
                          : party.riskLevel === "Medium"
                            ? "warning"
                            : "default"
                      }
                    >
                      {party.riskLevel}
                    </Badge>
                  </TableCell>
                  <TableCell>{party.createdAt}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/parties/${party.id}`}>View Details</Link>
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

