import { Prisma } from "@prisma/client"
import { NextResponse } from "next/server"

import { createPasswordResetToken } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const identifier = body?.identifier?.trim()

    if (!identifier) {
      return NextResponse.json({ error: "Email or username is required" }, { status: 400 })
    }

    const normalizedEmail = identifier.toLowerCase()
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: normalizedEmail }, { username: identifier }],
      },
      select: {
        id: true,
        email: true,
      },
    })

    if (!user) {
      return NextResponse.json({
        message: "If an account matches that email or username, a reset link is now available.",
      })
    }

    const token = await createPasswordResetToken({
      sub: user.id,
      email: user.email,
    })

    const origin = new URL(req.url).origin
    const demoResetUrl = `${origin}/reset-password?token=${encodeURIComponent(token)}`

    return NextResponse.json({
      message: "If an account matches that email or username, a reset link is now available.",
      demoResetUrl,
    })
  } catch (error) {
    console.error("Forgot password error:", error)

    if (error instanceof Prisma.PrismaClientInitializationError) {
      return NextResponse.json(
        {
          error: "Database unavailable",
          details: "Start PostgreSQL and confirm DATABASE_URL points to the running database.",
        },
        { status: 503 }
      )
    }

    return NextResponse.json({ error: "Unable to start password reset" }, { status: 500 })
  }
}
