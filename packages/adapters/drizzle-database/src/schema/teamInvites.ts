import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

import { teamsTable } from "."

export const teamInvitesTable = sqliteTable("team_invites", {
  code: text("code")
    .primaryKey()
    .$default(() => Date.now().toString(16).split("").reverse().join("")),
  teamId: integer("team_id")
    .notNull()
    .references(() => teamsTable.id, { onDelete: "cascade" })
})
