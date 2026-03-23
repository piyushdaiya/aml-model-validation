import { prisma } from "@/lib/db"
import { createToken } from "@/lib/auth"
import { compare } from "bcryptjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json()

    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        password: true,
        name: true,
        role: true,
        email: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const isValid = await compare(password, user.password)

    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const token = await createToken({
      id: user.id,
      name: user.name,
      role: user.role,
    })

    cookies().set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400, // 24 hours
    })

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "An error occurred during login" }, { status: 500 })
  }
}

