import { Prisma } from "@prisma/client"
import { prisma } from "@/lib/db"
import { hash } from "bcryptjs"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const email = body?.email?.trim()?.toLowerCase()
    const username = body?.username?.trim()
    const password = body?.password

    if (!email || !username || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailPattern.test(email)) {
      return NextResponse.json(
        { error: "Enter a valid email address" },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 }
      )
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "Username or Email already exists" },
        { status: 400 }
      )
    }

    const hashedPassword = await hash(password, 12)

    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        name: username,
        role: "user",
      },
      select: {
        id: true,
      },
    })

    return NextResponse.json(
      { message: "User created", userId: user.id },
      { status: 201 }
    )
  } catch (error) {
    console.error("CRITICAL REGISTRATION ERROR:", error)

    if (error instanceof Prisma.PrismaClientInitializationError) {
      return NextResponse.json(
        {
          error: "Database unavailable",
          details: "Start PostgreSQL and confirm DATABASE_URL points to the running database.",
        },
        { status: 503 }
      )
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json(
        { error: "Username or Email already exists" },
        { status: 400 }
      )
    }

    const details =
      error instanceof Error ? error.message : "Unknown error"

    return NextResponse.json(
      {
        error: "Internal Server Error",
        details,
      },
      { status: 500 }
    )
  }
}
