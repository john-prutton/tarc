import "server-only"

import { AsyncTaskResult } from "@repo/domain/types"

import { tryGetAuthedUser } from "./actions"

type SafeUser = NonNullable<Awaited<ReturnType<typeof tryGetAuthedUser>>>

export async function withAuthedUser<T>(
  fn: (user: SafeUser) => AsyncTaskResult<T>
): AsyncTaskResult<T> {
  const user = await tryGetAuthedUser()
  if (!user)
    return {
      success: false,
      error: {
        code: "NOT_ALLOWED",
        message: "You must be signed in to do this"
      }
    }
  return fn(user)
}
