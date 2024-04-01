import { Team, User } from "@repo/domain/entities"

import { SubmitButton } from "@/components/functional/submit-button"

import { tryRemoveTeamMember } from "../actions"

export function MembersList({
  teamId,
  members
}: {
  teamId: Team.Entity["id"]
  members: { id: User.Entity["id"]; username: User.Entity["username"] }[]
}) {
  return (
    <div>
      {members.map((member) => (
        <form key={member.id} action={tryRemoveTeamMember}>
          <input type="hidden" name="teamId" value={teamId} />
          <input type="hidden" name="teamMemberToRemoveId" value={member.id} />
          <SubmitButton
            text={`Remove User: ${member.username}`}
            pendingText="Removing user..."
          />
        </form>
      ))}
    </div>
  )
}
