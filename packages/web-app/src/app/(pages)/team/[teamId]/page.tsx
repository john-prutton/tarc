import { tryGetTeam } from "./actions"
import { CreateInviteForm, DeleteTeamForm } from "./components"

export default async function TeamPage({
  params: { teamId: _teamId }
}: {
  params: { teamId: string }
}) {
  const teamId = Number(_teamId)
  if (isNaN(teamId)) return <div>Invalid team ID</div>

  const teamResult = await tryGetTeam(teamId)
  if (!teamResult.success) return <div>Team not found</div>
  const team = teamResult.data

  return (
    <div>
      {team.name}

      <DeleteTeamForm teamId={teamId} />
      <CreateInviteForm teamId={teamId} />
    </div>
  )
}
