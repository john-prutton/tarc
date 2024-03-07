import { primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core"

import { projectsTable, usersTable } from "."

export const userProjectRolesTable = sqliteTable(
  "user_project_roles",
  {
    projectId: text("project_id")
      .notNull()
      .references(() => projectsTable.id),
    userId: text("user_id")
      .notNull()
      .references(() => usersTable.id),
    role: text("role", { enum: ["Owner", "Leader", "Member"] })
  },
  (table) => ({
    pk: primaryKey({ columns: [table.projectId, table.userId] })
  })
)
