import { integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core"

import { Team } from "@repo/domain/entities"

import { usersTable } from "."
import { teamsTable } from "./teams"

export const userTeamRolesTable = sqliteTable(
  "user_team_roles",
  {
    teamId: integer("team_id")
      .notNull()
      .references(() => teamsTable.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    role: text("role", { enum: Team.TEAM_ROLES }).notNull()
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.teamId] })
  })
)
