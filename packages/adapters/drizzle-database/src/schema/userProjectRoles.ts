import { primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core"

import { PROJECT_ROLES } from "@repo/domain/entities/project"

import { projectsTable, usersTable } from "."

export const userProjectRolesTable = sqliteTable(
  "user_project_roles",
  {
    projectId: text("project_id")
      .notNull()
      .references(() => projectsTable.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    role: text("role", { enum: PROJECT_ROLES }).notNull()
  },
  (table) => ({
    pk: primaryKey({ columns: [table.projectId, table.userId] })
  })
)
