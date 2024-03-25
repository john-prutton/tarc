import { Database } from "../../../adapters"
import { User } from "../../../entities"

type Inputs = { userId: User.Entity["id"] }
type Dependencies = { db: Database.Repository }

export async function getMyTeams({ userId }: Inputs, { db }: Dependencies) {
  return await db.team.getAllTeamsByUser(userId)
}
