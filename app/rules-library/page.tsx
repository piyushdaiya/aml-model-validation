"use client"

import { useState } from "react"
import {
  ArrowLeft,
  HelpCircle,
  Bell,
  Download,
  Info,
  Search,
  Filter,
  MoreVertical,
  ChevronDown,
  Plus,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "../components/theme-toggle"

type Rule = {
  id: string
  name: string
  description: string
  type: "Pre-scoring" | "Reject" | "Put on hold"
  category: "Transaction Monitoring" | "Customer Risk" | "Sanction Screening"
  bundle: string
  score: number
  tags?: string[]
}

const rules: Rule[] = [
  {
    id: "1",
    name: "Multiple transactions with the same amount for the last 1 day",
    description: "Put the transaction on hold and notify the assigned expert after the first rule was matched.",
    type: "Put on hold",
    category: "Transaction Monitoring",
    bundle: "AML",
    score: 1,
    tags: ["AML"],
  },
  {
    id: "2",
    name: "High-risk country customer onboarding",
    description: "Reject customer onboarding if the customer is from a high-risk country.",
    type: "Reject",
    category: "Customer Risk",
    bundle: "KYC",
    score: 2,
    tags: ["KYC", "High Risk"],
  },
  {
    id: "3",
    name: "Sanction list match",
    description: "Reject transaction if the counterparty matches a sanction list entry.",
    type: "Reject",
    category: "Sanction Screening",
    bundle: "Sanctions",
    score: 3,
    tags: ["Sanctions"],
  },
  {
    id: "4",
    name: "Suspicious payment details detected",
    description: "Put the transaction on hold and notify the assigned expert after the first rule was matched.",
    type: "Put on hold",
    category: "Transaction Monitoring",
    bundle: "AML",
    score: 1,
    tags: ["Suspicious payment"],
  },
  {
    id: "5",
    name: "Rapid account activity increase",
    description: "Pre-score the customer if there's a sudden increase in account activity.",
    type: "Pre-scoring",
    category: "Customer Risk",
    bundle: "KYC",
    score: 1,
    tags: ["KYC", "Activity Monitoring"],
  },
]

export default function RulesLibrary() {
  const [selectedRules, setSelectedRules] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)

  const toggleRule = (ruleId: string) => {
    setSelectedRules((prev) => (prev.includes(ruleId) ? prev.filter((id) => id !== ruleId) : [...prev, ruleId]))
  }

  const filteredRules = rules.filter(
    (rule) =>
      rule.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!categoryFilter || rule.category === categoryFilter),
  )

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex items-center h-14 gap-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold">Rules Library</h1>
            <div className="flex items-center gap-2">
              <Button variant="link" className="h-auto p-0 text-primary">
                All Rules
              </Button>
              <span className="text-muted-foreground">Max K.</span>
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
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-02%20at%2011.11.16%E2%80%AFAM-mERYgczDueccMM9AlVOBIrIIptFTik.png"
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
            <h2 className="text-2xl font-semibold tracking-tight">Rules</h2>
            <p className="text-sm text-muted-foreground">Manage and monitor your AML rules</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create New Rule
          </Button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search rules..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                {categoryFilter || "All Categories"}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => setCategoryFilter(null)}>All Categories</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setCategoryFilter("Transaction Monitoring")}>
                Transaction Monitoring
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setCategoryFilter("Customer Risk")}>Customer Risk</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setCategoryFilter("Sanction Screening")}>
                Sanction Screening
              </DropdownMenuItem>
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
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedRules.length === filteredRules.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedRules(filteredRules.map((rule) => rule.id))
                      } else {
                        setSelectedRules([])
                      }
                    }}
                  />
                </TableHead>
                <TableHead>Rule</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Add score</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell>
                    <Checkbox checked={selectedRules.includes(rule.id)} onCheckedChange={() => toggleRule(rule.id)} />
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{rule.name}</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{rule.description}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="text-sm text-muted-foreground">Bundle: {rule.bundle}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        rule.type === "Pre-scoring"
                          ? "bg-blue-50 text-blue-600"
                          : rule.type === "Reject"
                            ? "bg-red-50 text-red-600"
                            : "bg-purple-50 text-purple-600"
                      }
                    >
                      {rule.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{rule.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>Add score: {rule.score}</span>
                      {rule.tags && (
                        <div className="flex gap-1">
                          {rule.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-600">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
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

