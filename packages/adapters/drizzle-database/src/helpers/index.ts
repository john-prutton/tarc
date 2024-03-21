import { Database } from "@repo/domain/adapters"

import { createRepository } from ".."
import { createDb, DatabaseRepository } from "../db"
import {
  ordersTable,
  projectsTable,
  sessionsTable,
  userProjectRolesTable,
  usersTable
} from "../schema"

export async function clearAllTables(db: DatabaseRepository) {
  for (const table of [
    ordersTable,
    projectsTable,
    sessionsTable,
    userProjectRolesTable,
    usersTable
  ]) {
    await db.delete(table)
  }
}

export function describeDatabaseTest(
  name: string,
  suit: (db: DatabaseRepository, repository: Database.Repository) => void
) {
  const db = createDb({ url: process.env["DATABASE_URL"]! })
  const repository = createRepository(db)

  describe(name, () => {
    beforeEach(async () => await clearAllTables(db))
    suit(db, repository)
  })
}
