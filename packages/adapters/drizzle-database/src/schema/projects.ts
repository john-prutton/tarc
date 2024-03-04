import { sqliteTable, text } from "drizzle-orm/sqlite-core"

export const projectsTable = sqliteTable("projects", {
  id: text("id").primaryKey(),
  name: text("name").notNull()
})
