import { Prisma } from "@prisma/client"
import { hash } from "bcryptjs"
import { NextResponse } from "next/server"

import { verifyPasswordResetToken } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const token = body?.token
    const password = body?.password

    if (!token || !password) {
      return NextResponse.json({ error: "Token and password are required" }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters long" }, { status: 400 })
    }

    const payload = await verifyPasswordResetToken(token)

    if (!payload?.sub || !payload.email) {
      return NextResponse.json({ error: "This reset link is invalid or has expired" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        email: true,
      },
    })

    if (!user || user.email !== payload.email) {
      return NextResponse.json({ error: "This reset link is invalid or has expired" }, { status: 400 })
    }

    const hashedPassword = await hash(password, 12)

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
      },
    })

    return NextResponse.json({ message: "Password updated successfully" })
  } catch (error) {
    console.error("Reset password error:", error)

    if (error instanceof Prisma.PrismaClientInitializationError) {
      return NextResponse.json(
        {
          error: "Database unavailable",
          details: "Start PostgreSQL and confirm DATABASE_URL points to the running database.",
        },
        { status: 503 }
      )
    }

    return NextResponse.json({ error: "Unable to reset password" }, { status: 500 })
  }
}
