"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { AsyncTaskResult } from "@repo/domain/types"
import {
  createTeamInvite,
  deleteMyTeam,
  getTeamData,
  removeUserFromTeam
} from "@repo/domain/use-cases/team"

import { databaseAdapter } from "@/lib/adapters"
import { withAuthedUser } from "@/lib/auth/utils"

export const tryGetTeamData = async (teamId: number) =>
  withAuthedUser(async (user) =>
    getTeamData({ teamId, userId: user.id }, { db: databaseAdapter })
  )

export const tryDeleteTeam = async (formData: FormData) => {
  const teamId = Number(formData.get("teamId"))
  if (isNaN(teamId))
    return {
      success: false,
      error: { code: "NOT_ALLOWED", message: "A team ID is required" }
    }

  const result = await withAuthedUser(async (user) => {
    const result = await deleteMyTeam(
      { teamId, userId: user.id },
      { db: databaseAdapter }
    )

    return result
  })

  if (result.success) {
    revalidatePath("/dashboard")
    redirect("/dashboard")
  } else console.log(result.error)

  return result
}

export const tryCreateTeamInvite = async (
  state: any,
  formData: FormData
): AsyncTaskResult<string> => {
  const teamId = Number(formData.get("teamId"))
  if (isNaN(teamId))
    return {
      success: false,
      error: { code: "NOT_ALLOWED", message: "A team ID is required" }
    }

  return await withAuthedUser(async (user) =>
    createTeamInvite({ teamId, userId: user.id }, { db: databaseAdapter })
  )
}

export const tryRemoveTeamMember = async (formData: FormData) => {
  const teamId = Number(formData.get("teamId"))
  if (isNaN(teamId))
    return {
      success: false,
      error: { code: "NOT_ALLOWED", message: "A team ID is required" }
    }

  const teamMemberToRemoveId = formData.get("teamMemberToRemoveId")
  if (typeof teamMemberToRemoveId !== "string")
    return {
      success: false,
      error: { code: "NOT_ALLOWED", message: "A user ID is required" }
    }

  const result = await withAuthedUser(async (user) =>
    removeUserFromTeam(
      { teamId, userId: user.id, teamMemberToRemoveId: teamMemberToRemoveId },
      { db: databaseAdapter }
    )
  )

  if (result.success) revalidatePath(`/team/${teamId}`)
  return result
}
