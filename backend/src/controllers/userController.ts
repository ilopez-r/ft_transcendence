import type { FastifyReply, FastifyRequest } from "fastify"
import { isStrongerPassword, isValidDisplayName, isValidEmail } from "../utils/validators"
import bcrypt from "bcrypt"
import { runQuery, getQuery } from "../db/utils"
import crypto from "crypto"
import { sendEmail } from "../utils/nodemailer"
import xss from "xss"
import { generateCode } from "../2fa/utils"

export interface User {
  user_id: number
  email: string
  password_hash: string
  display_name: string
  twofa_enabled: boolean
  twofa_verified: boolean
  twofa_code: string
  twofa_expires_at: number
}

interface Message {
  id: number
  sender_id: number
  receiver_id: number
  message_: string
  sent_at: string
}

// TERMINAR DE VER POR QUE NO FUNCIONA
export const toggle2FA = async (request: FastifyRequest, reply: FastifyReply) => {
  const user_id = (request.user as any).user_id

  try {
    console.log("🔄 Toggle 2FA request for user_id:", user_id)

    const user = await getQuery<User>("SELECT * FROM users WHERE user_id = ?", [user_id])
    console.log("👤 User found:", user?.display_name)

    if (!user) {
      console.log("❌ User not found for user_id:", user_id)
      return reply.status(404).send({ error: "User not found" })
    }

    const newStatus = !user.twofa_enabled
    console.log("🔄 Changing 2FA from", user.twofa_enabled, "to", newStatus)

    await runQuery("UPDATE users SET twofa_enabled = ?, twofa_verified = false, twofa_code = NULL WHERE user_id = ?", [newStatus, user_id])

    console.log("✅", user.display_name, "changed 2FA to:", newStatus)

    return reply.send({
      message: `2FA ${newStatus ? "enabled" : "disabled"}`,
      twofa_enabled: newStatus,
    })
  } catch (err) {
    console.error("❌ Toggle 2FA error:", err)
    request.log.error(err)
    return reply.status(500).send({ error: "Internal server error" })
  }
}

// CAMBIO: Logout con reseteo de cookies
export const logoutUser = async (request: FastifyRequest, reply: FastifyReply) => {
  console.log("🔄 Logout request received")
  console.log("🍪 All cookies:", request.cookies)
  console.log("📤 Headers:", Object.keys(request.headers))
  console.log("📦 Body:", request.body)

  // ✅ DEBUGGING: Mostrar cada cookie individualmente
  const token = request.cookies.token
  const csrfToken = request.cookies.csrf_token
  const sessionId = request.cookies.session_id

  console.log("🔍 Token cookie:", token ? "EXISTS" : "MISSING")
  console.log("🔍 CSRF cookie:", csrfToken ? "EXISTS" : "MISSING")
  console.log("🔍 Session cookie:", sessionId ? "EXISTS" : "MISSING")

  // ✅ LIMPIAR TODAS LAS COOKIES POSIBLES sin importar si existen
  console.log("🧹 Clearing all possible auth cookies...")

  const cookieOptions = {
    path: "/",
    httpOnly: true,
    secure: false, // Cambiar a true en producción con HTTPS
    sameSite: "strict" as const,
  }

  const csrfCookieOptions = {
    path: "/",
    httpOnly: false, // CSRF token debe ser accesible desde JS
    secure: false,
    sameSite: "strict" as const,
  }

  // ✅ Limpiar múltiples variaciones de cookies
  reply
    .clearCookie("token", cookieOptions)
    .clearCookie("csrf_token", csrfCookieOptions)
    .clearCookie("session_id", cookieOptions)
    // ✅ También limpiar sin opciones (por si acaso)
    .clearCookie("token")
    .clearCookie("csrf_token")
    .clearCookie("session_id")

  console.log("✅ All cookies cleared successfully")

  return reply.status(200).send({
    message: "Logout successful",
    debug: {
      had_token: !!token,
      had_csrf: !!csrfToken,
      had_session: !!sessionId,
      cookies_before: Object.keys(request.cookies),
    },
  })
}

export const loginUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const { email, password } = request.body as any

  console.log("🔄 Login attempt for email:", email)

  if (!email || !password) {
    console.log("❌ Missing required fields - email:", !!email, "password:", !!password)
    return reply.status(400).send({
      error: "Missing required fields login",
    })
  }

  try {
    const getUserQuery = "SELECT * FROM users WHERE email = ?"
    const user = await getQuery<User>(getUserQuery, [email])

    if (!user) {
      console.log("❌ User not found for email:", email)
      return reply.status(401).send({ error: "Invalid email" })
    }

    console.log("👤 User found:", user.display_name, "- 2FA enabled:", user.twofa_enabled)

    const passwordMatch = await bcrypt.compare(password, user.password_hash)
    if (!passwordMatch) {
      console.log("❌ Invalid password for user:", user.display_name)
      return reply.status(401).send({ error: "Invalid password" })
    }

    console.log("✅ Password valid for user:", user.display_name)

    if (user.twofa_enabled == true) {
      console.log("🔐 2FA is enabled for user:", user.display_name, "- Verified:", user.twofa_verified)

      if (!user.twofa_verified) {
        const code = generateCode()
        console.log("📧 Generated 2FA code for", user.display_name, ":", code)

        const update2FACodeQuery = "UPDATE users SET twofa_code = ? WHERE user_id = ?"
        await runQuery(update2FACodeQuery, [code, user.user_id])

        console.log("📤 Sending 2FA email to:", user.email)
        await sendEmail(user.email, "Your code 2FA", `Your code is: ${code}`)

        console.log("✅ 2FA code sent successfully to:", user.email)
        return reply.status(200).send({
          message: "2FA code sent to your email",
          twofa_required: true,
        })
      } else {
        console.log("🔓 2FA already verified, resetting verification status")
        await runQuery(`UPDATE users SET twofa_verified = false WHERE user_id = ?`, [user.user_id])
      }
    }

    console.log("🎫 Creating JWT token for user:", user.display_name)
    const token = await reply.jwtSign(
      {
        user_id: user.user_id,
        display_name: user.display_name,
      },
      {
        expiresIn: "1h",
      },
    )

    const csrfToken = crypto.randomBytes(32).toString("hex")
    console.log("🍪 Setting cookies for user:", user.display_name)
    console.log("🔍 JWT Token length:", token.length)
    console.log("🔍 CSRF Token length:", csrfToken.length)

    // CAMBIO: Usar las mismas cookies que en logout
     const cookieOptions = {
      httpOnly: true,
      secure: false, // cambiar cuando tengamos HTTPS
      sameSite: "strict" as const,
      path: "/",
      maxAge: 3600, // 1 hora
    }

    const csrfCookieOptions = {
      httpOnly: false, // Para que sea accesible desde JS
      secure: false, // cambiar cuando tengamos HTTPS
      sameSite: "strict" as const,
      path: "/",
      maxAge: 3600, // 1 hora
    }

    console.log("✅ Login successful for user:", user.display_name)
    return reply
      .setCookie("token", token, cookieOptions)
      .setCookie("csrf_token", csrfToken, csrfCookieOptions)
      .send({
        message: "Login successful",
        debug: {
          token_set: true,
          csrf_set: true,
          user_id: user.user_id,
        },
      })
    /*
    return reply
      .setCookie("token", token, {
        httpOnly: true,
        secure: false, // cambiar cuando tengamos HTTPS
        sameSite: "strict",
        path: "/",
        maxAge: 3600,
      })
      .setCookie("csrf_token", csrfToken, {
        httpOnly: false, // Para que sea accesible desde JS
        secure: false, // cambiar cuando tengamos HTTPS
        sameSite: "strict",
        path: "/",
      })
      .send({ message: "Login successful" })
    */
  } catch (err) {
    console.error("❌ Login error:", err)
    request.log.error(err)
    return reply.status(500).send({ error: "Internal server error " })
  }
}

export const registerUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const { email, password, display_name } = request.body as any

  console.log("🔄 Registration attempt for email:", email, "display_name:", display_name)

  if (!email || !password || !display_name) {
    console.log("❌ Missing required fields - email:", !!email, "password:", !!password, "display_name:", !!display_name)
    return reply.status(400).send({
      error: "Missing required fields",
    })
  }

  if (!isValidEmail(email)) {
    console.log("❌ Invalid email format:", email)
    return reply.status(400).send({
      error: "Invalid email format",
    })
  }

  if (!isStrongerPassword(password)) {
    console.log("❌ Weak password for email:", email)
    return reply.status(400).send({
      error: "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, and a number",
    })
  }

  if (!isValidDisplayName(display_name)) {
    console.log("❌ Invalid display name:", display_name)
    return reply.status(400).send({
      error: "Display name must contain only letters, numbers or underscores, and be at least 3 characters long",
    })
  }

  try {
    console.log("🔐 Hashing password for user:", display_name)
    const hash = await bcrypt.hash(password, 10)
    const safeDisplayName = xss(display_name)

    console.log("💾 Inserting user into database:", safeDisplayName)
    const sql = "INSERT INTO users (email, password_hash, display_name) VALUES (?, ?, ?)"
    const userId = await runQuery(sql, [email, hash, safeDisplayName])

    console.log("✅ User registered successfully:", safeDisplayName, "with ID:", userId)
    return reply.status(201).send({ message: "User registered", user_id: userId })
  } catch (err: any) {
    if (err.message.includes("UNIQUE constraint failed")) {
      console.log("❌ Duplicate user - email or display_name already exists:", email, display_name)
      return reply.status(400).send({ error: "Email o display_name already exists" })
    }
    console.error("❌ Registration error:", err)
    request.log.error(err)
    return reply.status(500).send({ error: "Internal server error" })
  }
}
