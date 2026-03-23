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

type AccountType = "Savings" | "Checking" | "Investment" | "Estate" | "Trust"
type SubAccountType = "Individual" | "Joint" | "Other"

type Account = {
  id: string
  accountType: AccountType
  subAccountType: SubAccountType
  primaryOwner: string
  secondaryOwner?: string
  balance: number
  currency: string
  status: "Active" | "Inactive" | "Frozen" | "Closed"
}

const accounts: Account[] = [
  {
    id: "ACC-001",
    accountType: "Savings",
    subAccountType: "Individual",
    primaryOwner: "John Doe",
    balance: 5000,
    currency: "USD",
    status: "Active",
  },
  {
    id: "ACC-002",
    accountType: "Checking",
    subAccountType: "Joint",
    primaryOwner: "Jane Smith",
    secondaryOwner: "Bob Smith",
    balance: 2500,
    currency: "USD",
    status: "Active",
  },
  {
    id: "ACC-003",
    accountType: "Investment",
    subAccountType: "Individual",
    primaryOwner: "Alice Johnson",
    balance: 10000,
    currency: "USD",
    status: "Active",
  },
  {
    id: "ACC-004",
    accountType: "Estate",
    subAccountType: "Other",
    primaryOwner: "Smith Estate",
    secondaryOwner: "James Smith (Executor)",
    balance: 150000,
    currency: "USD",
    status: "Active",
  },
  {
    id: "ACC-005",
    accountType: "Trust",
    subAccountType: "Other",
    primaryOwner: "Johnson Family Trust",
    secondaryOwner: "Sarah Johnson (Trustee)",
    balance: 75000,
    currency: "USD",
    status: "Active",
  },
]

export default function AccountManagement() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex items-center h-14 gap-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold">Account Management</h1>
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
            <h2 className="text-2xl font-semibold tracking-tight">Accounts</h2>
            <p className="text-sm text-muted-foreground">Manage and monitor customer accounts</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add New Account
          </Button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search accounts..." className="pl-10" />
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
              <DropdownMenuItem>Account Type</DropdownMenuItem>
              <DropdownMenuItem>Sub Account Type</DropdownMenuItem>
              <DropdownMenuItem>Status</DropdownMenuItem>
              <DropdownMenuItem>Balance Range</DropdownMenuItem>
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
                    Account ID
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Account Type</TableHead>
                <TableHead>Sub Type</TableHead>
                <TableHead>Primary Owner</TableHead>
                <TableHead>Secondary Owner</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell className="font-medium">{account.id}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{account.accountType}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{account.subAccountType}</Badge>
                  </TableCell>
                  <TableCell>{account.primaryOwner}</TableCell>
                  <TableCell>{account.secondaryOwner || "-"}</TableCell>
                  <TableCell>{`${account.balance.toLocaleString()} ${account.currency}`}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        account.status === "Active"
                          ? "default"
                          : account.status === "Inactive"
                            ? "secondary"
                            : account.status === "Frozen"
                              ? "destructive"
                              : "outline"
                      }
                    >
                      {account.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/account-management/${account.id}`}>View Details</Link>
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

