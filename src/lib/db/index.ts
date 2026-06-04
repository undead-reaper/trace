import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"
import { serverEnv } from "@/lib/env/server"
import { expenses } from "./schemas/expenses"

const caCert = serverEnv.DATABASE_CA_CERT.replace(/\\n/g, "\n")

const client = postgres({
  ssl: {
    ca: caCert,
    rejectUnauthorized: true,
  },
  host: serverEnv.DATABASE_HOST,
  port: parseInt(serverEnv.DATABASE_PORT),
  user: serverEnv.DATABASE_USER,
  password: serverEnv.DATABASE_PASSWORD,
  database: serverEnv.DATABASE_NAME,
})
export const db = drizzle(client, {
  schema: { expenses },
})
