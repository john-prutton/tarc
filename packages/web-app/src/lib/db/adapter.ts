import { createDb, createRepository } from "@repo/drizzle-database"

export const databaseAdapter = createRepository(
  createDb({
    url: process.env["DATABASE_URL"]!,
    authToken: process.env["DATABASE_AUTH_TOKEN"]!
  })
)
