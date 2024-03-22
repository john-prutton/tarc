import { Database } from "../../../adapters"
import { Team, User } from "../../../entities"
import { AsyncTaskResult } from "../../../types"

export const NEW_TEAM_COST = 100

type Inputs = {
  newTeam: Team.NewEntity
  userId: User.Entity["id"]
}

type Dependencies = {
  db: Database.Repository
}

export async function createTeam(
  { newTeam, userId }: Inputs,
  { db }: Dependencies
): AsyncTaskResult<Team.Entity> {
  return db.transaction(async (db) => {
    // Get the user that will be creating the team
    const userResult = await db.user.getById(userId)
    if (!userResult.success) return userResult
    const user = userResult.data

    // Check if user has enough credits to create a team
    if (user.credits < NEW_TEAM_COST)
      return {
        success: false,
        error: {
          code: "NOT_ALLOWED",
          message: "You don't have enough credits to create a team"
        }
      }

    // Deduct credits from user
    const updateCreditsResult = await db.user.setCredits(
      user.id,
      user.credits - NEW_TEAM_COST
    )
    if (!updateCreditsResult.success) return updateCreditsResult

    // Create the team
    const createTeamResult = await db.team.createTeam(newTeam)
    if (!createTeamResult.success) return createTeamResult
    const team = createTeamResult.data

    // Add user as owner
    const addUserResult = await db.team.setUserRoleInTeam(
      team.id,
      user.id,
      "owner"
    )
    if (!addUserResult.success) return addUserResult

    // successfully return
    return { success: true, data: team }
  })
}
