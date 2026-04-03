import { jwtVerify, SignJWT, type JWTPayload } from "jose"
import { cookies } from "next/headers"
import type { NextRequest } from "next/server"

function getJwtSecret() {
  const jwtSecret = process.env.JWT_SECRET

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not configured")
  }

  return new TextEncoder().encode(jwtSecret)
}

export interface SessionTokenPayload extends JWTPayload {
  id: string
  name: string
  role: string
}

export interface PasswordResetTokenPayload extends JWTPayload {
  purpose: "password-reset"
  sub: string
  email: string
}

export async function verifyAuth(req: NextRequest) {
  const token = req.cookies.get("token")?.value

  if (!token) {
    return null
  }

  try {
    const verified = await jwtVerify<SessionTokenPayload>(token, getJwtSecret())
    return verified.payload
  } catch (err) {
    return null
  }
}

export async function getSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  if (!token) {
    return null
  }

  try {
    const verified = await jwtVerify<SessionTokenPayload>(token, getJwtSecret())
    return verified.payload
  } catch (err) {
    return null
  }
}

export async function createToken(payload: SessionTokenPayload) {
  return await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setExpirationTime("24h").sign(getJwtSecret())
}

export async function createPasswordResetToken(payload: Pick<PasswordResetTokenPayload, "sub" | "email">) {
  return await new SignJWT({ ...payload, purpose: "password-reset" as const })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("30m")
    .sign(getJwtSecret())
}

export async function verifyPasswordResetToken(token: string) {
  try {
    const verified = await jwtVerify<PasswordResetTokenPayload>(token, getJwtSecret())

    if (verified.payload.purpose !== "password-reset") {
      return null
    }

    return verified.payload
  } catch (error) {
    return null
  }
}
