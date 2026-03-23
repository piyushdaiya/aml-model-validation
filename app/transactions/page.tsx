"use client"

import { useState } from "react"
import {
  ArrowLeft,
  HelpCircle,
  Bell,
  Search,
  Filter,
  MoreVertical,
  ChevronDown,
  ArrowUpDown,
  ExternalLink,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ThemeToggle } from "../components/theme-toggle"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

type Transaction = {
  id: string
  amount: string
  currency: string
  type: string
  status: "Completed" | "Pending" | "Failed"
  date: string
  from: string
  to: string
}

const transactions: Transaction[] = [
  {
    id: "TRX-001",
    amount: "1,234.56",
    currency: "USD",
    type: "Transfer",
    status: "Completed",
    date: "2024-08-29 10:30:00",
    from: "John Doe",
    to: "Jane Smith",
  },
  {
    id: "TRX-002",
    amount: "500.00",
    currency: "EUR",
    type: "Deposit",
    status: "Pending",
    date: "2024-08-29 11:15:00",
    from: "Alice Johnson",
    to: "Bank Account",
  },
  {
    id: "TRX-003",
    amount: "750.25",
    currency: "GBP",
    type: "Withdrawal",
    status: "Completed",
    date: "2024-08-29 12:00:00",
    from: "Bank Account",
    to: "Bob Williams",
  },
  {
    id: "TRX-004",
    amount: "2,000.00",
    currency: "USD",
    type: "Transfer",
    status: "Failed",
    date: "2024-08-29 13:45:00",
    from: "Charlie Brown",
    to: "Lucy van Pelt",
  },
  {
    id: "TRX-005",
    amount: "100.50",
    currency: "EUR",
    type: "Deposit",
    status: "Completed",
    date: "2024-08-29 14:30:00",
    from: "Linus Torvalds",
    to: "Bank Account",
  },
]

export default function Transactions() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  return (
    <div className="min-h-screen bg-background">
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <header className="border-b bg-card" role="banner">
        <div className="container flex items-center h-14 gap-4">
          <Button variant="ghost" size="icon" aria-label="Go back">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold">Transactions</h1>
          <span className="text-muted-foreground">Max K.</span>
          <div className="ml-auto flex items-center gap-4">
            <ThemeToggle />
            <Button variant="ghost" size="icon" aria-label="Help">
              <HelpCircle className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Notifications">
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

      <main id="main-content" className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Transactions</h2>
            <p className="text-sm text-muted-foreground">View and manage all transactions</p>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input placeholder="Search transactions..." className="pl-10" aria-label="Search transactions" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" aria-hidden="true" />
                Filter
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Status</DropdownMenuItem>
              <DropdownMenuItem>Type</DropdownMenuItem>
              <DropdownMenuItem>Date Range</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" aria-label="More options">
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
                    <ArrowUpDown className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.id}</TableCell>
                  <TableCell>
                    {transaction.amount} {transaction.currency}
                  </TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        transaction.status === "Completed"
                          ? "success"
                          : transaction.status === "Pending"
                            ? "warning"
                            : "destructive"
                      }
                    >
                      {transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.from}</TableCell>
                  <TableCell>{transaction.to}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/transactions/${transaction.id}`}>
                        <ExternalLink className="h-4 w-4 mr-2" aria-hidden="true" />
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

