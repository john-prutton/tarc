"use client"

import { useState } from "react"

import { useFormState } from "react-dom"

import { Team } from "@repo/domain/entities"

import { SubmitButton } from "@/components/functional/submit-button"
import { Button } from "@/components/ui/button"

import { tryCreateTeamInvite } from "../actions"

export function CreateInviteForm({ teamId }: { teamId: Team.Entity["id"] }) {
  const [copied, setCopied] = useState(false)

  const [formState, formAction] = useFormState(
    async (state: any, formData: FormData) => {
      const result = await tryCreateTeamInvite(state, formData)
      if (result.success) {
        navigator.clipboard.writeText(
          `${window.location.origin}/team/join?code=${result.data}`
        )
        setCopied(true)
        setTimeout(() => setCopied(false), 3000)
      }
      return result
    },
    {
      success: true,
      data: ""
    }
  )

  return (
    <form action={formAction}>
      <input type="hidden" name="teamId" value={teamId} />
      {!formState.success && (
        <p className="text-destructive">{formState.error.message}</p>
      )}

      {!copied ? (
        <SubmitButton text="Create Invite" pendingText="Creating link..." />
      ) : (
        <Button variant={"secondary"} disabled type="reset">
          Copied link
        </Button>
      )}
    </form>
  )
}
