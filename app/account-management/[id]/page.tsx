"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, HelpCircle, Bell, User, Users, Wallet, ArrowUpDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "../../components/theme-toggle"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Account = {
  id: string
  accountType: "Savings" | "Checking" | "Investment"
  primaryOwner: string
  secondaryOwner?: string
  balance: number
  currency: string
}

type Transaction = {
  id: string
  date: string
  description: string
  amount: number
  type: "Credit" | "Debit"
}

const accounts: Account[] = [
  {
    id: "ACC-001",
    accountType: "Savings",
    primaryOwner: "John Doe",
    balance: 5000,
    currency: "USD",
  },
  {
    id: "ACC-002",
    accountType: "Checking",
    primaryOwner: "Jane Smith",
    secondaryOwner: "Bob Smith",
    balance: 2500,
    currency: "USD",
  },
  {
    id: "ACC-003",
    accountType: "Investment",
    primaryOwner: "Alice Johnson",
    balance: 10000,
    currency: "USD",
  },
]

const transactions: { [key: string]: Transaction[] } = {
  "ACC-001": [
    { id: "TRX-001", date: "2024-09-01", description: "Deposit", amount: 1000, type: "Credit" },
    { id: "TRX-002", date: "2024-09-05", description: "ATM Withdrawal", amount: 200, type: "Debit" },
  ],
  "ACC-002": [
    { id: "TRX-003", date: "2024-09-02", description: "Salary Deposit", amount: 3000, type: "Credit" },
    { id: "TRX-004", date: "2024-09-06", description: "Online Purchase", amount: 150.5, type: "Debit" },
  ],
  "ACC-003": [
    { id: "TRX-005", date: "2024-09-03", description: "Dividend Payment", amount: 500, type: "Credit" },
    { id: "TRX-006", date: "2024-09-07", description: "Stock Purchase", amount: 1000, type: "Debit" },
  ],
}

export default function AccountDetails() {
  const params = useParams()
  const router = useRouter()
  const [account, setAccount] = useState<Account | null>(null)
  const [accountTransactions, setAccountTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    const foundAccount = accounts.find((a) => a.id === params.id)
    if (foundAccount) {
      setAccount(foundAccount)
      setAccountTransactions(transactions[foundAccount.id] || [])
    }
  }, [params.id])

  if (!account) {
    return <div>Account not found</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex items-center h-14 gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold">Account Details</h1>
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
        <div className="mb-6">
          <h2 className="text-2xl font-semibold tracking-tight">Account {account.id}</h2>
          <p className="text-sm text-muted-foreground">Detailed information about the account</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Account ID</dt>
                  <dd className="text-sm font-semibold">{account.id}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Account Type</dt>
                  <dd className="text-sm font-semibold">{account.accountType}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Primary Owner</dt>
                  <dd className="text-sm font-semibold">{account.primaryOwner}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Secondary Owner</dt>
                  <dd className="text-sm font-semibold">{account.secondaryOwner || "-"}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Balance Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{`${account.balance.toLocaleString()} ${account.currency}`}</div>
              <p className="text-sm text-muted-foreground mt-2">Current Balance</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Transaction History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Button variant="ghost" className="flex items-center gap-1 p-0">
                      Date
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accountTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{`${transaction.amount.toLocaleString()} ${account.currency}`}</TableCell>
                    <TableCell>
                      <Badge variant={transaction.type === "Credit" ? "default" : "secondary"}>
                        {transaction.type}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="mt-6">
          <Button variant="outline" onClick={() => router.push("/account-management")}>
            Back to Account Management
          </Button>
        </div>
      </main>
    </div>
  )
}

