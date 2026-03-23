"use client"

import { useState } from "react"
import { ArrowLeft, HelpCircle, Bell, Search, Filter, MoreVertical, ChevronDown, ArrowUpDown, Plus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ThemeToggle } from "../components/theme-toggle"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

type MLModel = {
  id: string
  name: string
  description: string
  version: string
  type: "Classification" | "Regression" | "Clustering"
  format: "TensorFlow" | "PyTorch" | "Scikit-learn"
  lastUpdated: string
}

const mlModels: MLModel[] = [
  {
    id: "ML-001",
    name: "Transaction Fraud Detector",
    description: "Detects potentially fraudulent transactions using historical data",
    version: "1.2.0",
    type: "Classification",
    format: "TensorFlow",
    lastUpdated: "2024-08-30 10:15:00",
  },
  {
    id: "ML-002",
    name: "Customer Risk Scorer",
    description: "Assigns risk scores to customers based on their profile and activity",
    version: "2.0.1",
    type: "Regression",
    format: "Scikit-learn",
    lastUpdated: "2024-08-29 14:30:00",
  },
  {
    id: "ML-003",
    name: "AML Pattern Recognizer",
    description: "Identifies patterns in transaction data that may indicate money laundering",
    version: "0.9.5",
    type: "Clustering",
    format: "PyTorch",
    lastUpdated: "2024-08-28 09:45:00",
  },
]

export default function MLModelManagement() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex items-center h-14 gap-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold">ML Model Management</h1>
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
            <h2 className="text-2xl font-semibold tracking-tight">Machine Learning Models</h2>
            <p className="text-sm text-muted-foreground">Manage and monitor your ML models</p>
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
              <DropdownMenuItem>Format</DropdownMenuItem>
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
                <TableHead>Format</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mlModels.map((model) => (
                <TableRow key={model.id}>
                  <TableCell className="font-medium">{model.name}</TableCell>
                  <TableCell>{model.type}</TableCell>
                  <TableCell>{model.format}</TableCell>
                  <TableCell>{model.version}</TableCell>
                  <TableCell>{model.lastUpdated}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/ml-model-management/${model.id}`}>View Details</Link>
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

