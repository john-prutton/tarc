"use server"

import { revalidatePath } from "next/cache"

import { createTeam, getMyTeams } from "@repo/domain/use-cases/team"

import { databaseAdapter } from "@/lib/adapters"
import { withAuthedUser } from "@/lib/auth/utils"

export const tryGetMyTeams = async () =>
  withAuthedUser(async (user) => {
    return getMyTeams({ userId: user.id }, { db: databaseAdapter })
  })

export async function tryCreateTeam(formData: FormData) {
  const name = formData.get("name")
  if (typeof name !== "string")
    return {
      success: false,
      error: { code: "NOT_ALLOWED", message: "Name is required" }
    }

  const result = await withAuthedUser(async (user) =>
    createTeam({ newTeam: { name }, userId: user.id }, { db: databaseAdapter })
  )

  if (result.success) revalidatePath("/dashboard")

  return result
}
