"use server"

import { Database } from "../../../adapters"
import { Team, User } from "../../../entities"

type Inputs = { teamId: Team.Entity["id"]; userId: User.Entity["id"] }
type Dependencies = { db: Database.Repository }

export async function getTeam(
  { teamId, userId }: Inputs,
  { db }: Dependencies
) {
  // check if team exists and user has role in team
  const userRoleResult = await db.team.getUserRoleInTeam(userId, teamId)
  if (!userRoleResult.success) return userRoleResult

  // get team
  const teamResult = await db.team.getTeamById(teamId)
  return teamResult
}
