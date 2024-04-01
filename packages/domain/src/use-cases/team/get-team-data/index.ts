"use server"

import { Database } from "../../../adapters"
import { Team, User } from "../../../entities"
import { AsyncTaskResult } from "../../../types"

type Inputs = { teamId: Team.Entity["id"]; userId: User.Entity["id"] }
type Dependencies = { db: Database.Repository }
type Output = {
  team: Team.Entity
  members: { id: User.Entity["id"]; username: User.Entity["username"] }[]
}
type Fn = (i: Inputs, d: Dependencies) => AsyncTaskResult<Output>

export const getTeamData: Fn = async ({ teamId, userId }, { db }) => {
  // check if team exists and user has role in team
  const userRoleResult = await db.team.getUserRoleInTeam(userId, teamId)
  if (!userRoleResult.success) return userRoleResult

  // get team
  const teamResult = await db.team.getTeamById(teamId)
  if (!teamResult.success) return teamResult
  const team = teamResult.data

  // get team members
  const membersResult = await db.team.getTeamMembers({ teamId })
  if (!membersResult.success) return membersResult

  return {
    success: true,
    data: {
      team,
      members: membersResult.data
    }
  }
}
