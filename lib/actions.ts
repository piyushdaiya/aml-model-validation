"use server"

import { prisma } from "@/lib/db"
import { logError } from "@/lib/logger"
import { revalidatePath } from "next/cache"

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

    return { data: party }
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

