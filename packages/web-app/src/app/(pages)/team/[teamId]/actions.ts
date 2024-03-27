"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { deleteMyTeam, getTeam } from "@repo/domain/use-cases/team"

import { databaseAdapter } from "@/lib/adapters"
import { withAuthedUser } from "@/lib/auth/utils"

export const tryGetTeam = async (teamId: number) =>
  withAuthedUser(async (user) => {
    const team = await getTeam(
      { teamId, userId: user.id },
      { db: databaseAdapter }
    )

    return team
  })

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
