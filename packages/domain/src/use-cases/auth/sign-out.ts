import type { Auth } from "../../adapters"
import type { Session, User } from "../../entities"
import type { AsyncTaskResult } from "../../types"

/**
 * Sign out
 */
export async function signOut(
  sessionId: Session.Entity["id"],
  authAdapter: Auth.Adapter
): AsyncTaskResult<Session.Cookie> {
  // invalidate the session
  const invalidationResult = await authAdapter.invalidateSession(sessionId)
  if (!invalidationResult.success) return invalidationResult

  // set a blank session
  const sessionCookie = authAdapter.createBlankSessionCookie()
  return {
    success: true,
    data: sessionCookie
  }
}
