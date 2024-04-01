import { Database } from "../../../adapters"
import { Team, User } from "../../../entities"
import { AsyncTaskResult } from "../../../types"

type Fn = (
  inputs: {
    userId: User.Entity["id"]
    teamId: Team.Entity["id"]
    teamMemberToRemoveId: User.Entity["id"]
  },
  dependencies: { db: Database.Repository }
) => AsyncTaskResult<void>

export const removeUserFromTeam: Fn = async (
  { userId, teamMemberToRemoveId, teamId },
  { db }
) => {
  return db.transaction(async (db) => {
    // get user role in team
    const userRoleResult = await db.team.getUserRoleInTeam(userId, teamId)
    if (!userRoleResult.success) return userRoleResult

    // if user is removing another team member, and is not owner || leader, return error
    if (userId !== teamMemberToRemoveId && userRoleResult.data === "member")
      return {
        success: false,
        error: {
          code: "NOT_ALLOWED",
          message: "Only team owner or leader can remove members"
        }
      }

    let teamMemberRole: Team.TeamRole

    if (userId === teamMemberToRemoveId) teamMemberRole = userRoleResult.data
    else {
      // get teamMemberToRemove role in team
      const teamMemberRoleResult = await db.team.getUserRoleInTeam(
        teamMemberToRemoveId,
        teamId
      )
      if (!teamMemberRoleResult.success) return teamMemberRoleResult

      teamMemberRole = teamMemberRoleResult.data
    }

    // check if teamMemberRole is owner, and fail
    if (teamMemberRole === "owner")
      return {
        success: false,
        error: {
          code: "NOT_ALLOWED",
          message: "Cannot remove team owner. Transfer ownership first."
        }
      }

    // try to remove member from team
    const removeMemberResult = await db.team.removeMemberFromTeam({
      userId: teamMemberToRemoveId,
      teamId
    })
    if (!removeMemberResult.success) return removeMemberResult

    return {
      success: true,
      data: undefined
    }
  })
}
