import { SubmitButton } from "@/components/functional/submit-button"
import { Input } from "@/components/ui/input"

import { tryCreateTeam } from "../actions"

export function CreateTeamForm() {
  return (
    <form action={tryCreateTeam} className="flex flex-row gap-4">
      <Input name="name" />
      <SubmitButton text="Create team" pendingText="Creating team..." />
    </form>
  )
}
