import { NEW_TEAM_COST } from ".."
import { Database } from "../../../adapters"
import { Team, User } from "../../../entities"

type Inputs = { userId: User.Entity["id"]; teamId: Team.Entity["id"] }
type Dependencies = { db: Database.Repository }

export async function deleteMyTeam(
  { userId, teamId }: Inputs,
  { db }: Dependencies
) {
  return await db.transaction(async (db) => {
    // get user role in team or error
    const userRoleResult = await db.team.getUserRoleInTeam(userId, teamId)
    if (!userRoleResult.success && userRoleResult.error.code !== "NOT_FOUND")
      return userRoleResult

    // if user is not owner, return error
    if (
      (!userRoleResult.success && userRoleResult.error.code === "NOT_FOUND") ||
      (userRoleResult.success && userRoleResult.data !== "owner")
    )
      return {
        success: false,
        error: {
          code: "NOT_ALLOWED",
          message: "You can't delete a team you don't own"
        }
      }

    // get user and update credits
    const userResult = await db.user.getById(userId)
    if (!userResult.success) return userResult
    const user = userResult.data

    const updatedCreditsResult = await db.user.setCredits(
      userId,
      user.credits + NEW_TEAM_COST
    )
    if (!updatedCreditsResult.success) return updatedCreditsResult

    // delete team
    return await db.team.deleteTeam(teamId)
  })
}
