//src/main.ts

import Fastify from "fastify"
import fastifyJwt from "@fastify/jwt"
import fastifyCookie from "@fastify/cookie"
import { userRoutes } from "./routes/userRoutes"
import { initializeDatabase } from "./db/init"
import cors from "@fastify/cors"
import { setupSocketIO } from "./socket"
import type { Server } from "http"

// Levantar el servidor
const start = async () => {
  const app = Fastify({ logger: true })

  await app.register(fastifyCookie)

  // Registrar JWT
  app.register(fastifyJwt, {
    secret: "supersecret", // Usar .env en producción
    cookie: {
      cookieName: "token",
      signed: false,
    },
  })

  // CAMBIO: Añadido dirección correcta de frontend
  await app.register(cors, {
    origin: ["http://localhost:8080", "http://127.0.0.1:8080"],
    /*origin: 'http://localhost:5500',*/
    credentials: true,
  })

  app.register(userRoutes)

  // Ruta publica simple
  app.get("/", async (request, reply) => {
    return { message: "Server is running!" }
  })

 // CAMBIO: Añadido Health Check para comprobar que el backend corre
  app.get("/health", async (request, reply) => {
    return { status: "ok", timestamp: new Date().toISOString() }
  })

  await initializeDatabase()

  const address = await app.listen({ port: 3000, host: "0.0.0.0" })
  console.log(`Server running on ${address}`)

  const server = app.server as Server
  setupSocketIO(app, server)
}

start().catch((err) => {
  console.error("Error al iniciar el servidor:", err)
  process.exit(1)
})
