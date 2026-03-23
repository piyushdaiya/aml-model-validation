"use server"

import type { Account, Address, Alert, Case, Party, Transaction } from "@prisma/client"
import { prisma } from "@/lib/db"
import { logError } from "@/lib/logger"
import { revalidatePath } from "next/cache"

type PartyAlertView = {
  id: string
  type: string
  status: "Open" | "In Progress" | "Closed"
  priority: "Low" | "Medium" | "High"
  createdAt: string
  description: string
}

type PartyCaseView = {
  id: string
  type: string
  status: "Open" | "In Progress" | "Closed"
  priority: "Low" | "Medium" | "High"
  createdAt: string
  description: string
}

type PartySarView = {
  id: string
  status: "Filed" | "In Progress" | "Under Review"
  filingDate: string
  amount: number
  currency: string
  description: string
}

type PartyAddressView = {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

type PartyAccountRelationshipView = {
  accountId: string
  accountType: string
  relationship: "Primary Owner" | "Secondary Owner" | "Beneficiary" | "Trustee" | "Executor"
  status: "Active" | "Inactive"
}

type PartyRelationshipView = {
  partyId: string
  partyName: string
  type: "Parent Company" | "Subsidiary" | "Affiliate" | "Ultimate Beneficial Owner" | "Director" | "Shareholder"
  description: string
  ownershipPercentage?: number
  startDate: string
  status: "Active" | "Inactive"
}

export type PartyDetailsView = {
  id: string
  name: string
  type: "Individual" | "Business" | "Organization"
  status: "Active" | "Inactive" | "Under Review"
  riskLevel: "Low" | "Medium" | "High"
  createdAt: string
  description: string
  primaryAddress: PartyAddressView
  secondaryAddresses: PartyAddressView[]
  alerts: PartyAlertView[]
  sars: PartySarView[]
  relatedAccounts: PartyAccountRelationshipView[]
  dateOfBirth?: string
  countryOfCitizenship?: string
  employmentStatus?: "Employed" | "Self-Employed" | "Unemployed" | "Retired" | "Student"
  employerDetails?: {
    name: string
    industry: string
    position: string
    yearsEmployed: number
  }
  cases: PartyCaseView[]
  riskScore: number
  employerAddress?: PartyAddressView
  dateOfIncorporation?: string
  placeOfIncorporation?: string
  relationships: PartyRelationshipView[]
  transactions: Transaction[]
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date)
}

function normalizeAlertStatus(status: string): PartyAlertView["status"] {
  if (status === "In Progress" || status === "Closed") return status
  return "Open"
}

function normalizePriority(priority: string): PartyAlertView["priority"] {
  if (priority === "High" || priority === "Medium") return priority
  return "Low"
}

function normalizePartyType(type: string): PartyDetailsView["type"] {
  if (type === "Individual" || type === "Organization") return type
  return "Business"
}

function normalizePartyStatus(status: string): PartyDetailsView["status"] {
  if (status === "Inactive" || status === "Under Review") return status
  return "Active"
}

function normalizeRiskLevel(riskLevel: string): PartyDetailsView["riskLevel"] {
  if (riskLevel === "High" || riskLevel === "Medium") return riskLevel
  return "Low"
}

function mapRiskScore(riskLevel: PartyDetailsView["riskLevel"]) {
  if (riskLevel === "High") return 82
  if (riskLevel === "Medium") return 58
  return 31
}

function mapAddress(address?: Address): PartyAddressView {
  return {
    street: address?.street ?? "Not provided",
    city: address?.city ?? "Unknown",
    state: address?.state ?? "N/A",
    zipCode: address?.zipCode ?? "N/A",
    country: address?.country ?? "Unknown",
  }
}

function mapAlert(alert: Alert): PartyAlertView {
  return {
    id: alert.id,
    type: alert.type,
    status: normalizeAlertStatus(alert.status),
    priority: normalizePriority(alert.priority),
    createdAt: formatDate(alert.createdAt),
    description: alert.description ?? "No description provided.",
  }
}

function mapCase(caseItem: Case): PartyCaseView {
  return {
    id: caseItem.id,
    type: caseItem.title,
    status: normalizeAlertStatus(caseItem.status),
    priority: normalizePriority(caseItem.priority),
    createdAt: formatDate(caseItem.createdAt),
    description: caseItem.description ?? "No case description provided.",
  }
}

function mapRelatedAccount(account: Account): PartyAccountRelationshipView {
  return {
    accountId: account.id,
    accountType: account.type,
    relationship: "Primary Owner",
    status: account.status === "Inactive" ? "Inactive" : "Active",
  }
}

function mapPartyDetails(
  party: Party & {
    alerts: Alert[]
    cases: Case[]
    accounts: Account[]
    address: Address[]
    transactions: Transaction[]
  }
): PartyDetailsView {
  const primaryAddressRecord = party.address.find((address) => address.type === "primary") ?? party.address[0]
  const secondaryAddressRecords = party.address.filter((address) => address.id !== primaryAddressRecord?.id)
  const riskLevel = normalizeRiskLevel(party.riskLevel)

  return {
    id: party.id,
    name: party.name,
    type: normalizePartyType(party.type),
    status: normalizePartyStatus(party.status),
    riskLevel,
    createdAt: formatDate(party.createdAt),
    description: party.description ?? "No description provided.",
    primaryAddress: mapAddress(primaryAddressRecord),
    secondaryAddresses: secondaryAddressRecords.map(mapAddress),
    alerts: party.alerts.map(mapAlert),
    sars: [],
    relatedAccounts: party.accounts.map(mapRelatedAccount),
    cases: party.cases.map(mapCase),
    relationships: [],
    transactions: party.transactions,
    riskScore: mapRiskScore(riskLevel),
    employerAddress: undefined,
    dateOfBirth: undefined,
    countryOfCitizenship: undefined,
    employmentStatus: undefined,
    employerDetails: undefined,
    dateOfIncorporation: undefined,
    placeOfIncorporation: undefined,
  }
}

export async function getParties(query = "") {
  try {
    const parties = await prisma.party.findMany({
      where: {
        OR: [{ name: { contains: query, mode: "insensitive" } }, { id: { contains: query, mode: "insensitive" } }],
      },
      include: {
        cases: true,
        alerts: true,
        accounts: true,
        address: true,
      },
    })
    return { data: parties }
  } catch (error) {
    logError(error, "getParties")
    return { error: "Failed to fetch parties" }
  }
}

export async function getPartyById(id: string) {
  try {
    const party = await prisma.party.findUnique({
      where: { id },
      include: {
        cases: true,
        alerts: true,
        accounts: true,
        address: true,
        transactions: true,
      },
    })

    if (!party) {
      return { error: "Party not found" }
    }

    return { data: mapPartyDetails(party) }
  } catch (error) {
    logError(error, "getPartyById")
    return { error: "Failed to fetch party details" }
  }
}

export async function updateParty(id: string, data: any) {
  try {
    const party = await prisma.party.update({
      where: { id },
      data,
    })

    revalidatePath(`/parties/${id}`)
    return { data: party }
  } catch (error) {
    logError(error, "updateParty")
    return { error: "Failed to update party" }
  }
}
