import { sqliteTable, text } from "drizzle-orm/sqlite-core"

export const usersTable = sqliteTable("users", {
  id: text("id").primaryKey().notNull(),
  username: text("username").notNull().unique(),
  hashedPassword: text("hashedPassword").notNull()
})
