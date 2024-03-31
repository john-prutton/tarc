import { Team } from "@repo/domain/entities"

import { SubmitButton } from "@/components/functional/submit-button"

import { tryDeleteTeam } from "../actions"

export function DeleteTeamForm({ teamId }: { teamId: Team.Entity["id"] }) {
  return (
    <form action={tryDeleteTeam}>
      <input type="hidden" name="teamId" value={teamId} />
      <SubmitButton
        variant={"destructive"}
        text="Delete Team"
        pendingText="Deleting team..."
      />
    </form>
  )
}
