import { SubmitButton } from "@/components/functional/submit-button"

import { tryDeleteTeam, tryGetTeam } from "./actions"

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

      <form action={tryDeleteTeam}>
        <input type="hidden" name="teamId" value={teamId} />
        <SubmitButton
          text="Delete this team"
          pendingText="Deleting..."
          variant={"destructive"}
        />
      </form>
    </div>
  )
}
