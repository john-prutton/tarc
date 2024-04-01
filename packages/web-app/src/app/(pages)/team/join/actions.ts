"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { getInvitation, joinTeamByCode } from "@repo/domain/use-cases/team"

import { databaseAdapter } from "@/lib/adapters"
import { withAuthedUser } from "@/lib/auth/utils"

export async function tryGetInvitation(code: string) {
  return getInvitation({ code }, { db: databaseAdapter })
}

export async function tryJoinTeam(formData: FormData) {
  const code = formData.get("code")
  if (typeof code !== "string")
    return {
      success: false,
      error: { code: "NOT_ALLOWED", message: "Invalid team code" }
    }

  const result = await withAuthedUser(async (user) => {
    return await joinTeamByCode(
      { code, userId: user.id },
      { db: databaseAdapter }
    )
  })

  if (result.success) {
    revalidatePath("/dashboard")
    redirect(`/team/${result.data.id}`)
  }

  return result
}
