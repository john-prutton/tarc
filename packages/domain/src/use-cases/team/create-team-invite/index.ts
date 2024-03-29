import { Database } from "../../../adapters"
import { Team, User } from "../../../entities"
import { AsyncTaskResult } from "../../../types"

type Inputs = {
  userId: User.Entity["id"]
  teamId: Team.Entity["id"]
}
type Dependencies = { db: Database.Repository }

export async function createTeamInvite(
  { teamId, userId }: Inputs,
  { db }: Dependencies
): AsyncTaskResult<string> {
  // check user's role
  const userRoleResult = await db.team.getUserRoleInTeam(userId, teamId)
  if (!userRoleResult.success) return userRoleResult
  const userRole = userRoleResult.data
  if (userRole !== "leader" && userRole !== "owner")
    return {
      success: false,
      error: {
        code: "NOT_ALLOWED",
        message: "You are not allowed to create team invites for this team"
      }
    }

  // create invite for member and team combination
  const inviteResult = await db.team.createTeamInvite({ teamId })
  return inviteResult
}
