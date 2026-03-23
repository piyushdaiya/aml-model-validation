"use client"

import { useState } from "react"
import { ArrowLeft, HelpCircle, Bell, Search, Filter, MoreVertical, ChevronDown, ArrowUpDown, Plus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ThemeToggle } from "../components/theme-toggle"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

type Model = {
  id: string
  name: string
  type: "Transaction Monitoring" | "Customer Risk" | "Sanctions Screening"
  status: "Active" | "Inactive" | "Draft"
  version: string
  lastUpdated: string
  rulesCount: number
  mlModelsCount: number
}

const models: Model[] = [
  {
    id: "MDL-001",
    name: "Transaction Monitoring Model v1",
    type: "Transaction Monitoring",
    status: "Active",
    version: "1.0",
    lastUpdated: "2024-08-30 10:15:00",
    rulesCount: 15,
    mlModelsCount: 2,
  },
  {
    id: "MDL-002",
    name: "Customer Risk Assessment Model",
    type: "Customer Risk",
    status: "Active",
    version: "2.1",
    lastUpdated: "2024-08-29 14:30:00",
    rulesCount: 10,
    mlModelsCount: 1,
  },
  {
    id: "MDL-003",
    name: "Sanctions Screening Model",
    type: "Sanctions Screening",
    status: "Draft",
    version: "0.9",
    lastUpdated: "2024-08-28 09:45:00",
    rulesCount: 8,
    mlModelsCount: 1,
  },
  {
    id: "MDL-004",
    name: "Enhanced Due Diligence Model",
    type: "Customer Risk",
    status: "Inactive",
    version: "1.2",
    lastUpdated: "2024-08-27 16:20:00",
    rulesCount: 12,
    mlModelsCount: 2,
  },
]

export default function ModelManagement() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex items-center h-14 gap-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold">Model Management</h1>
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
            <h2 className="text-2xl font-semibold tracking-tight">Models</h2>
            <p className="text-sm text-muted-foreground">Manage and monitor your AML models</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create New Model
          </Button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search models..." className="pl-10" />
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
              <DropdownMenuItem>Version</DropdownMenuItem>
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
                    Name
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Rules Count</TableHead>
                <TableHead>ML Models Count</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {models.map((model) => (
                <TableRow key={model.id}>
                  <TableCell className="font-medium">{model.name}</TableCell>
                  <TableCell>{model.type}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        model.status === "Active" ? "default" : model.status === "Inactive" ? "secondary" : "outline"
                      }
                    >
                      {model.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{model.version}</TableCell>
                  <TableCell>{model.lastUpdated}</TableCell>
                  <TableCell>{model.rulesCount}</TableCell>
                  <TableCell>{model.mlModelsCount}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/model-management/${model.id}`}>View Details</Link>
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

