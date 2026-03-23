"use client"

import { Checkbox } from "@/components/ui/checkbox"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  HelpCircle,
  Bell,
  Copy,
  AlertTriangle,
  FileText,
  Image,
  Database,
  ExternalLink,
  History,
  ChevronDown,
  Plus,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "../../components/theme-toggle"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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

function DonutChart() {
  const circumference = 2 * Math.PI * 40
  const getOffset = (percentages: number[]) => {
    const sum = percentages.reduce((a, b) => a + b, 0)
    return -((sum * circumference) / 100)
  }

  return (
    <div className="relative w-32 h-32">
      <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
        <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="20" />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#10b981"
          strokeWidth="20"
          strokeDasharray={`${(77.4 * circumference) / 100} ${circumference}`}
          strokeDashoffset="0"
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#ef4444"
          strokeWidth="20"
          strokeDasharray={`${(12.6 * circumference) / 100} ${circumference}`}
          strokeDashoffset={getOffset([77.4])}
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="20"
          strokeDasharray={`${(5 * circumference) / 100} ${circumference}`}
          strokeDashoffset={getOffset([77.4, 12.6])}
        />
        {[
          { color: "#f97316", percentage: 1.4 },
          { color: "#f59e0b", percentage: 1.3 },
          { color: "#10b981", percentage: 1.1 },
          { color: "#10b981", percentage: 0.6 },
          { color: "#ef4444", percentage: 0.3 },
          { color: "#10b981", percentage: 0.1 },
        ].map((segment, index) => (
          <circle
            key={index}
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={segment.color}
            strokeWidth="20"
            strokeDasharray={`${(segment.percentage * circumference) / 100} ${circumference}`}
            strokeDashoffset={getOffset([
              77.4,
              12.6,
              5,
              ...Array(index)
                .fill(0)
                .map((_, i) => [1.4, 1.3, 1.1, 0.6, 0.3, 0.1][i]),
            ])}
          />
        ))}
      </svg>
    </div>
  )
}

type ConnectionType = {
  name: string
  percentage: number
  color?: string
  active?: boolean
}

function ConnectionsList({ connections }: { connections: ConnectionType[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm">
      {connections.map((connection, index) => (
        <div key={index} className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${connection.active ? connection.color : "bg-slate-200"}`} />
          <span className={connection.active ? "" : "text-muted-foreground"}>{connection.name}</span>
          <span
            className={`ml-2 ${
              connection.active && connection.color?.includes("emerald")
                ? "text-emerald-600"
                : connection.active && connection.color?.includes("red")
                  ? "text-red-600"
                  : connection.active && connection.color?.includes("amber")
                    ? "text-amber-600"
                    : connection.active && connection.color?.includes("orange")
                      ? "text-orange-600"
                      : ""
            }`}
          >
            {connection.percentage}%
          </span>
        </div>
      ))}
    </div>
  )
}

type Rule = {
  type: "Pre-scoring" | "Put on hold" | "Reject"
  name: string
  badges: string[]
  tags?: string[]
}

const rules: Rule[] = [
  {
    type: "Pre-scoring",
    name: "Crypto Monitoring (Chainalysis): New screening (rev.1)",
    badges: ["Only score", "Test mode"],
  },
  {
    type: "Pre-scoring",
    name: "Crypto Monitoring (Crystal): New screening (rev.1)",
    badges: ["Only score"],
  },
  {
    type: "Put on hold",
    name: "Different Remitter Device - Last 30 days (rev.1)",
    badges: ["Put on hold", "Test mode"],
  },
  {
    type: "Reject",
    name: "High risk score via 3rd party provider (rev.1)",
    badges: ["Reject"],
    tags: ["CryptoTxn", "DemoCryptoTxn", "High risk"],
  },
]

export default function TransactionDetails() {
  const params = useParams()
  const router = useRouter()
  const [transaction, setTransaction] = useState<Transaction | null>(null)

  useEffect(() => {
    const foundTransaction = transactions.find((t) => t.id === params.id)
    if (foundTransaction) {
      setTransaction(foundTransaction)
    }
  }, [params.id])

  if (!transaction) {
    return <div>Transaction not found</div>
  }

  const connections: ConnectionType[] = [
    { name: "Licensed exchange", percentage: 77.4, color: "bg-emerald-500", active: true },
    { name: "Mixing Service", percentage: 0 },
    { name: "Sanctions", percentage: 12.6, color: "bg-red-500", active: true },
    { name: "Mined Coins", percentage: 0 },
    { name: "Unlicensed exchange", percentage: 5, color: "bg-amber-500", active: true },
    { name: "Illegal Service", percentage: 0 },
    { name: "Other", percentage: 1.4, color: "bg-orange-500", active: true },
    { name: "Gambling", percentage: 0 },
    { name: "Unlicensed P2P exchange", percentage: 1.3, color: "bg-amber-500", active: true },
    { name: "Fraudulent Exchange", percentage: 0 },
    { name: "Online Wallet", percentage: 1.1, color: "bg-emerald-500", active: true },
    { name: "Licensed P2P exchange", percentage: 0 },
    { name: "Liquidity pools", percentage: 0.6, color: "bg-emerald-500", active: true },
    { name: "Darknet Service", percentage: 0 },
    { name: "Enforcement action", percentage: 0.3, color: "bg-red-500", active: true },
    { name: "Child exploitation", percentage: 0 },
    { name: "Marketplace", percentage: 0.1, color: "bg-emerald-500", active: true },
    { name: "Darknet Marketplace", percentage: 0 },
    { name: "Seized assets", percentage: 0 },
    { name: "ATM", percentage: 0 },
    { name: "Terrorism financing", percentage: 0 },
    { name: "Stolen Coins", percentage: 0 },
    { name: "Scam", percentage: 0 },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex items-center h-14 gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold">Transaction Details</h1>
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
          <h2 className="text-2xl font-semibold tracking-tight">Transaction {transaction.id}</h2>
          <p className="text-sm text-muted-foreground">Detailed information about the transaction</p>
        </div>

        <Tabs defaultValue="details" className="space-y-4">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="risk-assessment">Risk Assessment</TabsTrigger>
            <TabsTrigger value="matched-rules">Matched Rules</TabsTrigger>
            <TabsTrigger value="travel-rule">Travel Rule</TabsTrigger>
            <TabsTrigger value="aml-info">AML Information</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Transaction Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">ID</dt>
                      <dd className="text-sm font-semibold">{transaction.id}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Amount</dt>
                      <dd className="text-sm font-semibold">
                        {transaction.amount} {transaction.currency}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Type</dt>
                      <dd className="text-sm font-semibold">{transaction.type}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Status</dt>
                      <dd>
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
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Date</dt>
                      <dd className="text-sm font-semibold">{transaction.date}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Parties Involved</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">From</dt>
                      <dd className="text-sm font-semibold">{transaction.from}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">To</dt>
                      <dd className="text-sm font-semibold">{transaction.to}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="risk-assessment">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Transfer Details</h3>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">Address:</span>
                      <span className="font-mono">0x5cc17d0fa620fe99daeaa87365c63b453bc47664</span>
                      <Button variant="ghost" size="icon" className="h-4 w-4">
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Risk level:</span>
                      <span className="font-medium text-red-600">high</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Risk score:</span>
                      <span className="font-medium">0.609</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium">Destination address connections (%)/risk assessment</h3>
                      <p className="text-sm text-muted-foreground">
                        The source of funds used to finance a particular transaction.
                      </p>
                    </div>
                    <div className="flex gap-8">
                      <DonutChart />
                      <ConnectionsList connections={connections} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="matched-rules">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Matched Rules
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Score</span>
                      <Badge variant="secondary" className="bg-amber-50 text-amber-600 hover:bg-amber-50">
                        100
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Matched rules</span>
                      <Badge variant="secondary" className="bg-amber-50 text-amber-600 hover:bg-amber-50">
                        1
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Test score</span>
                      <Badge variant="secondary" className="bg-amber-50 text-amber-600 hover:bg-amber-50">
                        0
                      </Badge>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-4 w-4">
                              <HelpCircle className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Score calculated during test mode</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Test rules</span>
                      <Badge variant="secondary" className="bg-amber-50 text-amber-600 hover:bg-amber-50">
                        1
                      </Badge>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-4 w-4">
                              <HelpCircle className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Number of rules in test mode</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Considered rules</span>
                      <Badge variant="secondary" className="bg-amber-50 text-amber-600 hover:bg-amber-50">
                        20
                      </Badge>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-4 w-4">
                              <HelpCircle className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Total number of rules evaluated</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    {rules.map((rule, index) => (
                      <div key={index} className="p-4 bg-slate-50 rounded-lg space-y-3">
                        <div className="flex items-start gap-2">
                          <Badge
                            variant={
                              rule.type === "Pre-scoring"
                                ? "secondary"
                                : rule.type === "Put on hold"
                                  ? "outline"
                                  : "destructive"
                            }
                            className="mt-0.5"
                          >
                            {rule.type}
                          </Badge>
                          {rule.badges.map((badge, i) => (
                            <Badge
                              key={i}
                              variant="secondary"
                              className={
                                badge === "Only score"
                                  ? "bg-blue-50 text-blue-600"
                                  : badge === "Test mode"
                                    ? "bg-amber-50 text-amber-600"
                                    : badge === "Put on hold"
                                      ? "bg-purple-50 text-purple-600"
                                      : badge === "Reject"
                                        ? "bg-red-50 text-red-600"
                                        : ""
                              }
                            >
                              {badge}
                            </Badge>
                          ))}
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm">{rule.name}</p>
                          {rule.tags && (
                            <div className="flex gap-1">
                              {rule.tags.map((tag, i) => (
                                <Badge key={i} variant="secondary" className="bg-slate-100">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="h-8">
                            Open
                            <ExternalLink className="ml-2 h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8">
                            <History className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="travel-rule">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="h-5 w-5" />
                  Travel Rule Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <span>Transaction ID</span>
                      <span className="font-mono">{transaction.id}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Last updated</span>
                      <span>{transaction.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Score</span>
                      <Badge variant="secondary" className="bg-amber-50 text-amber-600">
                        47
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Applicant</span>
                      <span className="text-blue-600">{transaction.from}</span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {rules.map((rule, index) => (
                      <Card key={index}>
                        <CardContent className="p-4 space-y-3">
                          <div className="flex items-start gap-2">
                            <Badge
                              variant={
                                rule.type === "Pre-scoring"
                                  ? "secondary"
                                  : rule.type === "Put on hold"
                                    ? "outline"
                                    : "destructive"
                              }
                              className="mt-0.5"
                            >
                              {rule.type}
                            </Badge>
                            {rule.badges.map((badge, i) => (
                              <Badge
                                key={i}
                                variant="secondary"
                                className={
                                  badge === "Only score"
                                    ? "bg-blue-50 text-blue-600"
                                    : badge === "Test mode"
                                      ? "bg-amber-50 text-amber-600"
                                      : badge === "Put on hold"
                                        ? "bg-purple-50 text-purple-600"
                                        : badge === "Reject"
                                          ? "bg-red-50 text-red-600"
                                          : ""
                                }
                              >
                                {badge}
                              </Badge>
                            ))}
                          </div>

                          <p className="text-sm">{rule.name}</p>

                          {rule.tags && (
                            <div className="flex flex-wrap gap-1">
                              {rule.tags.map((tag, i) => (
                                <Badge key={i} variant="secondary" className="bg-blue-50 text-blue-600">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}

                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="h-8">
                              Open
                              <ExternalLink className="ml-2 h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8">
                              <History className="h-3 w-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="aml-info">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  AML Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Full name</div>
                      <div>{transaction.from}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Review answer</div>
                      <Badge variant="secondary" className="bg-purple-50 text-purple-600">
                        Requires action (6 hours)
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Created at</div>
                      <div>{transaction.date}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Target entity</div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono">{transaction.id}</span>
                        <Button variant="ghost" size="icon" className="h-4 w-4">
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Ongoing monitoring</div>
                      <div>Off</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Case type</div>
                      <div>Comply Advantage</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Case origin</div>
                      <div>New case</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Assignee</div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="p-0 font-normal">
                            Unassigned
                            <ChevronDown className="ml-2 h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>Assign to me</DropdownMenuItem>
                          <DropdownMenuItem>Assign to team</DropdownMenuItem>
                          <DropdownMenuItem>Unassign</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-[1fr,300px] gap-6">
                    <div>
                      <Tabs defaultValue="hits">
                        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
                          <TabsTrigger
                            value="hits"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                          >
                            Hits
                          </TabsTrigger>
                          <TabsTrigger
                            value="transactions"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                          >
                            Transactions
                          </TabsTrigger>
                          <TabsTrigger
                            value="events"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                          >
                            Events
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="hits" className="mt-6">
                          <div className="rounded-lg border">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="w-12">
                                    <Checkbox />
                                  </TableHead>
                                  <TableHead>Name</TableHead>
                                  <TableHead>Matches</TableHead>
                                  <TableHead>Relevance</TableHead>
                                  <TableHead>Countries</TableHead>
                                  <TableHead>Whitelisted</TableHead>
                                  <TableHead>Match status</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell>
                                    <Checkbox />
                                  </TableCell>
                                  <TableCell>{transaction.from}</TableCell>
                                  <TableCell>
                                    <div className="flex flex-col gap-1">
                                      <Badge variant="secondary" className="bg-blue-50 text-blue-600 w-fit">
                                        Pep
                                      </Badge>
                                      <Badge variant="secondary" className="bg-blue-50 text-blue-600 w-fit">
                                        Adverse Media Terrorism
                                      </Badge>
                                      <Badge variant="secondary" className="bg-blue-50 text-blue-600 w-fit">
                                        Adverse Media Violence NON AML/CFT
                                      </Badge>
                                    </div>
                                  </TableCell>
                                  <TableCell>Exact name match</TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-1">
                                      <span className="truncate">Azerbaijan, Belarus, France, Kazakhstan</span>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <Button variant="ghost" className="p-0">
                                      <ChevronDown className="h-4 w-4" />
                                    </Button>
                                  </TableCell>
                                  <TableCell>
                                    <Button variant="ghost" className="p-0">
                                      -
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                        </TabsContent>
                        <TabsContent value="transactions">
                          <div className="rounded-lg border p-6">
                            <div className="text-sm text-muted-foreground">No transactions yet</div>
                          </div>
                        </TabsContent>
                        <TabsContent value="events">
                          <div className="rounded-lg border p-6">
                            <div className="text-sm text-muted-foreground">No events yet</div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">Notes</h3>
                        <Button variant="outline" size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add note
                        </Button>
                      </div>
                      <div className="rounded-lg border p-6">
                        <div className="text-sm text-muted-foreground">No notes yet</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <Button variant="outline" onClick={() => router.push("/transactions")}>
            Back to Transactions
          </Button>
        </div>
      </main>
    </div>
  )
}

