import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

import { usersTable } from "."

export const sessionsTable = sqliteTable("sessions", {
  id: text("id").primaryKey().notNull(),
  userId: text("userId")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull()
})
