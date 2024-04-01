import { tryGetTeamData } from "./actions"
import { CreateInviteForm, DeleteTeamForm, MembersList } from "./components"

export default async function TeamPage({
  params: { teamId: _teamId }
}: {
  params: { teamId: string }
}) {
  const teamId = Number(_teamId)
  if (isNaN(teamId)) return <div>Invalid team ID</div>

  const teamDataResult = await tryGetTeamData(teamId)
  if (!teamDataResult.success) return <div>Team not found</div>
  const { members, team } = teamDataResult.data

  return (
    <div>
      {team.name}
      <MembersList teamId={teamId} members={members} />
      <DeleteTeamForm teamId={teamId} />
      <CreateInviteForm teamId={teamId} />
    </div>
  )
}
