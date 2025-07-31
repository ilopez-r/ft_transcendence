import type { FastifyReply, FastifyRequest } from "fastify"
import { getQuery, runQuery } from "../db/utils"
import type { User } from "../controllers/userController"

export function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export const verify2FA = async (request: FastifyRequest, reply: FastifyReply) => {
  const { email, code } = request.body as { email: string; code: string }

  if (!email || !code) {
    return reply.status(400).send({ error: "Missing email or 2FA code" })
  }

  try {
    const user = await getQuery<User>("SELECT * FROM users WHERE email = ?", [email])

    if (!user || !user.twofa_enabled || !user.twofa_code) {
      return reply.status(401).send({ error: "2FA not enabled or invalid user" })
    }

    if (user.twofa_code !== code) {
      return reply.status(401).send({ error: "Invalid 2FA code" })
    }

    await runQuery("UPDATE users SET twofa_verified = true, twofa_code = NULL WHERE user_id = ?", [user.user_id])

    console.log("✅ 2FA verificado para:", user.display_name)

    return reply.status(200).send({ message: "2FA verified, please proceed with login " })
  } catch (err) {
    request.log.error(err)
    return reply.status(500).send({ error: "Internal server error" })
  }
}

export async function verifyUser2FACode(email: string, code: string): Promise<boolean> {
  const user = await getQuery("SELECT * FROM users WHERE email = ?", [email])

  if (!user || !user.twofa_enabled || !user.twofa_code) {
    return false
  }

  if (user.twofa_code !== code) {
    return false
  }

  await runQuery("UPDATE users SET twofa_code = NULL WHERE user_id = ?", [user.user_id])
  return true
}
