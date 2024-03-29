import { Database } from "../../../adapters"
import { Team } from "../../../entities"
import { AsyncTaskResult } from "../../../types"

type Inputs = { code: string }
type Dependencies = { db: Database.Repository }
type Output = AsyncTaskResult<{ teamName: Team.Entity["name"] }>

export async function getInvitation(
  { code }: Inputs,
  { db }: Dependencies
): Output {
  const teamResult = await db.team.getTeamByInviteCode(code)
  if (!teamResult.success) return teamResult
  return { success: true, data: { teamName: teamResult.data.name } }
}
