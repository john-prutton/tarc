import { SubmitButton } from "@/components/functional/submit-button"

import { tryGetInvitation, tryJoinTeam } from "./actions"

export default async function JoinTeamPage({
  searchParams: { code }
}: {
  searchParams: { code?: string }
}) {
  if (!code) return <div>Invalid team code</div>
  const invitationResult = await tryGetInvitation(code)
  if (!invitationResult.success) return <div>Invalid team code</div>
  const invitation = invitationResult.data

  return (
    <div>
      <h1>Join Team</h1>
      <p className="text-xl font-bold">{invitation.teamName}</p>
      <form action={tryJoinTeam}>
        <input type="hidden" name="code" value={code} />
        <SubmitButton text={"Join Team"} pendingText={"Joining team..."} />
      </form>
    </div>
  )
}
