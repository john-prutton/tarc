import type { Auth } from "../../adapters"
import type { Session, User } from "../../entities"
import type { AsyncTaskResult } from "../../types"

/**
 * # Authenticate an existing user
 *
 * @param newUser as object implementing the User.NewEntity type
 * @param userRepository an object implementing the User.Repository type
 * @param authAdapter an object implementing the Auth.Adapter adapter type
 *
 * @returns AsyncTaskResult with a Session.Cookie as data
 */
export async function signIn(
  loginDetails: User.NewEntity,
  userRepository: User.Repository,
  authAdapter: Auth.Adapter
): AsyncTaskResult<Session.Cookie> {
  /* Check user exists */
  const userResult = await userRepository.getByUsername(loginDetails.username)

  // Error if the username doesn't exists or if something went wrong
  if (!userResult.success) return userResult

  const user = userResult.data

  /* Verify password */
  const isValidPassword = await authAdapter.verifyPassword(
    loginDetails.plainPassword,
    userResult.data.hashedPassword
  )
  if (!isValidPassword)
    return {
      success: false,
      error: {
        code: "NOT_ALLOWED",
        message: "Invalid password"
      }
    }

  /* Create session in the database */
  const sessionResult = await authAdapter.createSession(user.id)

  // Error if an unhandled error occurred
  if (!sessionResult.success) return sessionResult

  /* Create session cookie from session */
  const sessionCookie = authAdapter.createSessionCookie(sessionResult.data.id)

  /* Successfully return session cookie */
  return { success: true, data: sessionCookie }
}
