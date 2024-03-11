import { sqliteTable, text } from "drizzle-orm/sqlite-core"

export const projectsTable = sqliteTable("projects", {
  id: text("id").primaryKey().notNull(),
  name: text("name").notNull()
})
