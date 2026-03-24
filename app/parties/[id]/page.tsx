import { Suspense } from "react"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  HelpCircle,
  Bell,
  FileText,
  AlertTriangle,
  BarChart,
  MapPin,
  Map as MapIcon,
  CreditCard,
  Users,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "../../components/theme-toggle"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { RelationshipGraph } from "./components/relationship-graph"
import ErrorBoundary from "@/components/error-boundary"
import Loading from "@/components/loading"
import { getPartyById } from "@/lib/actions"
import type { PartyDetailsView } from "@/lib/actions"

type Alert = {
  id: string
  type: string
  status: "Open" | "In Progress" | "Closed"
  priority: "Low" | "Medium" | "High"
  createdAt: string
  description: string
}

type SAR = {
  id: string
  status: "Filed" | "In Progress" | "Under Review"
  filingDate: string
  amount: number
  currency: string
  description: string
}

type AccountRelationship = {
  accountId: string
  accountType: string
  relationship: "Primary Owner" | "Secondary Owner" | "Beneficiary" | "Trustee" | "Executor"
  status: "Active" | "Inactive"
}

type Address = {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

// Add Case type
type Case = {
  id: string
  type: string
  status: "Open" | "In Progress" | "Closed"
  priority: "Low" | "Medium" | "High"
  createdAt: string
  description: string
}

// Add PartyRelationship type
type PartyRelationship = {
  partyId: string
  partyName: string
  type: "Parent Company" | "Subsidiary" | "Affiliate" | "Ultimate Beneficial Owner" | "Director" | "Shareholder"
  description: string
  ownershipPercentage?: number
  startDate: string
  status: "Active" | "Inactive"
}

// Update the Party type to include new fields
type Party = PartyDetailsView

// Add this type definition with the existing types
type NetworkData = {
  nodes: {
    id: string
    name: string
    type: "party" | "account"
    subType?: string
    status: string
  }[]
  links: {
    source: string
    target: string
    type: string
    description?: string
  }[]
}

function AddressDisplay({ address }: { address: Address }) {
  return (
    <div className="space-y-1">
      <p className="text-sm">{address.street}</p>
      <p className="text-sm">
        {address.city}, {address.state} {address.zipCode}
      </p>
      <p className="text-sm">{address.country}</p>
    </div>
  )
}

async function PartyDetails({ id }: { id: string }) {
  const { data: party, error } = await getPartyById(id)

  if (error) {
    throw new Error(error)
  }

  if (!party) {
    notFound()
  }

  const getNetworkData = (party: Party): NetworkData => {
    const nodes = new Map<string, NetworkData["nodes"][number]>()
    const links = new Map<string, NetworkData["links"][number]>()

    // Add the current party as a node
    nodes.set(party.id, {
      id: party.id,
      name: party.name,
      type: "party",
      subType: party.type,
      status: party.status,
    })

    // Add party relationships
    if (party.relationships) {
      party.relationships.forEach((rel) => {
        nodes.set(rel.partyId, {
          id: rel.partyId,
          name: rel.partyName,
          type: "party",
          status: rel.status,
        })
        links.set(`${party.id}:${rel.partyId}:${rel.type}`, {
          source: party.id,
          target: rel.partyId,
          type: rel.type,
          description: rel.description,
        })
      })
    }

    // Add account relationships
    if (party.relatedAccounts) {
      party.relatedAccounts.forEach((acc) => {
        nodes.set(acc.accountId, {
          id: acc.accountId,
          name: acc.accountId,
          type: "account",
          subType: acc.accountType,
          status: acc.status,
        })
        links.set(`${party.id}:${acc.accountId}:${acc.relationship}`, {
          source: party.id,
          target: acc.accountId,
          type: acc.relationship,
        })
      })
    }

    return {
      nodes: Array.from(nodes.values()),
      links: Array.from(links.values()),
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex items-center h-14 gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/parties">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-lg font-semibold">Party Details</h1>
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
          <h2 className="text-2xl font-semibold tracking-tight">Party {party.id}</h2>
          <p className="text-sm text-muted-foreground">Detailed information about the party</p>
        </div>

        <Tabs defaultValue="details" className="space-y-4">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
            <TabsTrigger value="related-alerts">Related Alerts</TabsTrigger>
            <TabsTrigger value="sars">SARs</TabsTrigger>
            <TabsTrigger value="related-accounts">Related Accounts</TabsTrigger>
            <TabsTrigger value="cases">Cases</TabsTrigger>
            <TabsTrigger value="risk-assessment">Risk Assessment</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="relationships">Party Relationships</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Party Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">ID</dt>
                      <dd className="text-sm font-semibold">{party.id}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Name</dt>
                      <dd className="text-sm font-semibold">{party.name}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Type</dt>
                      <dd className="text-sm font-semibold">{party.type}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Status</dt>
                      <dd>
                        <Badge
                          variant={
                            party.status === "Active"
                              ? "default"
                              : party.status === "Inactive"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {party.status}
                        </Badge>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Risk Level</dt>
                      <dd>
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
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Created At</dt>
                      <dd className="text-sm font-semibold">{party.createdAt}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Risk Score</dt>
                      <dd className="text-sm font-semibold">
                        <div className="flex items-center gap-2">
                          <span>{party.riskScore}</span>
                          <Badge
                            variant={
                              party.riskScore >= 75 ? "destructive" : party.riskScore >= 50 ? "warning" : "default"
                            }
                          >
                            {party.riskScore >= 75 ? "High Risk" : party.riskScore >= 50 ? "Medium Risk" : "Low Risk"}
                          </Badge>
                        </div>
                      </dd>
                    </div>

                    {/* Individual-specific fields */}
                    {party.type === "Individual" && (
                      <>
                        <div>
                          <dt className="text-sm font-medium text-muted-foreground">Date of Birth</dt>
                          <dd className="text-sm font-semibold">{party.dateOfBirth}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-muted-foreground">Country of Citizenship</dt>
                          <dd className="text-sm font-semibold">{party.countryOfCitizenship}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-muted-foreground">Employment Status</dt>
                          <dd className="text-sm font-semibold">{party.employmentStatus}</dd>
                        </div>
                        {party.employerDetails && (
                          <div className="col-span-2">
                            <dt className="text-sm font-medium text-muted-foreground mb-2">Employer Details</dt>
                            <dd className="grid grid-cols-2 gap-4 pl-4 border-l-2 border-muted">
                              <div>
                                <span className="text-sm text-muted-foreground">Company:</span>
                                <span className="text-sm font-semibold ml-2">{party.employerDetails.name}</span>
                              </div>
                              <div>
                                <span className="text-sm text-muted-foreground">Industry:</span>
                                <span className="text-sm font-semibold ml-2">{party.employerDetails.industry}</span>
                              </div>
                              <div>
                                <span className="text-sm text-muted-foreground">Position:</span>
                                <span className="text-sm font-semibold ml-2">{party.employerDetails.position}</span>
                              </div>
                              <div>
                                <span className="text-sm text-muted-foreground">Years Employed:</span>
                                <span className="text-sm font-semibold ml-2">
                                  {party.employerDetails.yearsEmployed}
                                </span>
                              </div>
                            </dd>
                          </div>
                        )}
                        {party.type === "Individual" && party.employerAddress && (
                          <div className="col-span-2">
                            <dt className="text-sm font-medium text-muted-foreground mb-2">Employer Address</dt>
                            <dd className="pl-4 border-l-2 border-muted">
                              <AddressDisplay address={party.employerAddress} />
                            </dd>
                          </div>
                        )}
                      </>
                    )}

                    {/* Business-specific fields */}
                    {party.type === "Business" && (
                      <>
                        <div>
                          <dt className="text-sm font-medium text-muted-foreground">Date of Incorporation</dt>
                          <dd className="text-sm font-semibold">{party.dateOfIncorporation}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-muted-foreground">Place of Incorporation</dt>
                          <dd className="text-sm font-semibold">{party.placeOfIncorporation}</dd>
                        </div>
                      </>
                    )}
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{party.description}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="addresses">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Primary Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AddressDisplay address={party.primaryAddress} />
                </CardContent>
              </Card>

              {party.secondaryAddresses && party.secondaryAddresses.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapIcon className="h-5 w-5" />
                      Secondary Addresses
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {party.secondaryAddresses.map((address, index) => (
                        <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                          <div className="mb-2">
                            <Badge variant="outline">Address {index + 1}</Badge>
                          </div>
                          <AddressDisplay address={address} />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="related-alerts">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Related Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                {party.alerts && party.alerts.length > 0 ? (
                  <div className="space-y-4">
                    {party.alerts.map((alert) => (
                      <div key={alert.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium">{alert.id}</span>
                            <Badge
                              variant={
                                alert.priority === "High"
                                  ? "destructive"
                                  : alert.priority === "Medium"
                                    ? "warning"
                                    : "default"
                              }
                            >
                              {alert.priority}
                            </Badge>
                            <Badge
                              variant={
                                alert.status === "Open"
                                  ? "default"
                                  : alert.status === "In Progress"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {alert.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                          <p className="text-sm text-muted-foreground">Created: {alert.createdAt}</p>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/alerts/${alert.id}`}>View Details</Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No alerts found for this party.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sars">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Suspicious Activity Reports (SARs)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {party.sars && party.sars.length > 0 ? (
                  <div className="space-y-4">
                    {party.sars.map((sar) => (
                      <div key={sar.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium">{sar.id}</span>
                            <Badge
                              variant={
                                sar.status === "Filed"
                                  ? "default"
                                  : sar.status === "In Progress"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {sar.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Amount: {sar.amount.toLocaleString()} {sar.currency}
                          </p>
                          <p className="text-sm text-muted-foreground mb-2">{sar.description}</p>
                          <p className="text-sm text-muted-foreground">Filed: {sar.filingDate}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          View Report
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No SARs found for this party.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="related-accounts">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Related Accounts
                </CardTitle>
              </CardHeader>
              <CardContent>
                {party.relatedAccounts && party.relatedAccounts.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Account ID</TableHead>
                        <TableHead>Account Type</TableHead>
                        <TableHead>Relationship</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {party.relatedAccounts.map((account) => (
                        <TableRow key={account.accountId}>
                          <TableCell className="font-medium">{account.accountId}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{account.accountType}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{account.relationship}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={account.status === "Active" ? "default" : "secondary"}>
                              {account.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/account-management/${account.accountId}`}>View Details</Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-muted-foreground">No related accounts found for this party.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cases">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Related Cases
                </CardTitle>
              </CardHeader>
              <CardContent>
                {party.cases && party.cases.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Case ID</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {party.cases.map((case_) => (
                        <TableRow key={case_.id}>
                          <TableCell className="font-medium">{case_.id}</TableCell>
                          <TableCell>{case_.type}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                case_.status === "Open"
                                  ? "default"
                                  : case_.status === "In Progress"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {case_.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                case_.priority === "High"
                                  ? "destructive"
                                  : case_.priority === "Medium"
                                    ? "warning"
                                    : "default"
                              }
                            >
                              {case_.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>{case_.createdAt}</TableCell>
                          <TableCell>{case_.description}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/cases/${case_.id}`}>View Details</Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-muted-foreground">No cases found for this party.</p>
                )}
              </CardContent>
            </Card>
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
                <p>Detailed risk assessment for this party will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5" />
                  Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Transaction history for this party will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="relationships">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Party Relationships
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RelationshipGraph data={getNetworkData(party)} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <Button variant="outline" asChild>
            <Link href="/parties">Back to Party Management</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}

export default async function PartyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <Suspense fallback={<Loading message="Loading party details..." />}>
      <PartyDetails id={id} />
    </Suspense>
  )
}
