import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const teamsTable = sqliteTable("teams", {
  id: integer("id").primaryKey().notNull(),
  name: text("name").notNull()
})
