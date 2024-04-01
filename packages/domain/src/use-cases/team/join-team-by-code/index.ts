import { Database } from "../../../adapters"
import { Team, User } from "../../../entities"
import { AsyncTaskResult } from "../../../types"

type JoinTeamUseCase = (
  inputs: { code: string; userId: User.Entity["id"] },
  dependencies: { db: Database.Repository }
) => AsyncTaskResult<{ id: Team.Entity["id"] }>

export const joinTeamByCode: JoinTeamUseCase = async (
  { code, userId },
  { db }
) => {
  return await db.transaction(async (db) => {
    // try get team
    const teamResult = await db.team.getTeamByInviteCode(code)
    if (!teamResult.success) return teamResult
    const team = teamResult.data

    // try get user
    const userResult = await db.user.getById(userId)
    if (!userResult.success) return userResult
    const user = userResult.data

    // try get user role in team
    const roleResult = await db.team.getUserRoleInTeam(user.id, team.id)
    if (roleResult.success || roleResult.error.code !== "NOT_FOUND")
      return {
        success: false,
        error: { code: "NOT_ALLOWED", message: "User is already in team" }
      }

    // try join team
    const joinResult = await db.team.setUserRoleInTeam(
      team.id,
      user.id,
      "member"
    )
    if (!joinResult.success) return joinResult

    // try delete invite
    const deleteInvitationResult = await db.team.deleteInvitation(code)
    if (!deleteInvitationResult.success) return deleteInvitationResult

    return { success: true, data: { id: team.id } }
  })
}
