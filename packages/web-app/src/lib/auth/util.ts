"use server"

import { cookies } from "next/headers"

import { Session } from "@repo/domain/entities"

import { databaseAdapter } from "../db/adapter"

export async function tryGetAuthedUser() {
  const sessionId = cookies().get(Session.COOKIE_NAME)?.value
  if (!sessionId) return null

  const [_, user] = await databaseAdapter.auth.getSessionAndUser(sessionId)

  if (!user) return null

  return { ...user, hashedPassword: undefined }
}
