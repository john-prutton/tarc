"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

import { createLucia } from "@repo/auth"
import { db } from "@repo/database"
import { Session, User } from "@repo/domain/entities"
import { AsyncTaskResult, TaskResult } from "@repo/domain/types"
import { signIn, signOut, signUp } from "@repo/domain/use-cases/auth"

const authAdapter = createLucia(db.auth)

export async function trySignUp(
  state: TaskResult<void>,
  formData: FormData
): AsyncTaskResult<void> {
  const data = Object.fromEntries(formData.entries())

  if (typeof data.username !== "string" || typeof data.password !== "string")
    return {
      success: false,
      error: {
        code: "NOT_ALLOWED",
        message: "Incorrect data passed"
      }
    }

  const newUser: User.NewEntity = {
    username: data.username,
    plainPassword: data.password
  }
  const result = await signUp(newUser, db.user, authAdapter)

  revalidatePath("/")
  if (result.success) {
    cookies().set(result.data)
    return {
      success: true,
      data: undefined
    }
  } else return result
}

export async function trySignIn(
  state: TaskResult<void>,
  formData: FormData
): AsyncTaskResult<void> {
  const data = Object.fromEntries(formData.entries())

  if (typeof data.username !== "string" || typeof data.password !== "string")
    return {
      success: false,
      error: {
        code: "NOT_ALLOWED",
        message: "Incorrect data passed"
      }
    }

  const newUser: User.NewEntity = {
    username: data.username,
    plainPassword: data.password
  }

  const result = await signIn(newUser, db.user, authAdapter)

  revalidatePath("/")
  if (result.success) {
    cookies().set(result.data)
    return {
      success: true,
      data: undefined
    }
  } else return result
}

export async function trySignOut(): AsyncTaskResult<void> {
  const sessionId = cookies().get(Session.COOKIE_NAME)?.value
  if (!sessionId)
    return {
      success: false,
      error: { code: "NOT_ALLOWED", message: "No session found" }
    }
  const result = await signOut(sessionId, authAdapter)
  if (!result.success) return result

  cookies().set(result.data)
  revalidatePath("/")
  return { success: true, data: undefined }
}

export async function tryGetAuthedUser() {
  const sessionId = cookies().get(Session.COOKIE_NAME)?.value
  if (!sessionId) return null

  const [_, user] = await db.auth.getSessionAndUser(sessionId)

  return user
}
