import { Auth } from "../../adapters"
import { Session, User } from "../../entities"
import { AsyncTaskResult } from "../../types"

/**
 * # Sign-up a new user
 *
 * Used to register a new user from User.NewEntity data.
 *
 * @param newUser as object implementing the User.NewEntity type
 * @param userRepository an object implementing the User.Repository type
 * @param authAdapter an object implementing the Auth.Adapter adapter type
 *
 * @returns AsyncTaskResult with a Session.Cookie as data
 */
export async function signUp(
  newUser: User.NewEntity,
  userRepository: User.Repository,
  authAdapter: Auth.Adapter
): AsyncTaskResult<Session.Cookie> {
  /* Check user does not exist */
  const prevUserResult = await userRepository.getByUsername(newUser.username)

  // Error if the username exists
  if (prevUserResult.success)
    return {
      success: false,
      error: {
        code: "NOT_ALLOWED",
        message: "This username is taken."
      }
    }

  // Error if an unhandled error occurred
  if (prevUserResult.error.code !== "NOT_FOUND") return prevUserResult

  /* Generate User.Entity from User.NewEntity */
  const hashedPassword = await authAdapter.hashPassword(newUser.plainPassword)
  const userId = authAdapter.generateId()

  /* Create user in the database */
  const createUserResult = await userRepository.create({
    id: userId,
    username: newUser.username,
    hashedPassword
  })

  // Error if an unhandled error occurred
  if (!createUserResult.success) return createUserResult

  /* Create session in the database */
  const sessionResult = await authAdapter.createSession(userId)

  // Error if an unhandled error occurred
  if (!sessionResult.success) return sessionResult

  /* Create session cookie from session */
  const sessionCookie = authAdapter.createSessionCookie(sessionResult.data.id)

  /* Successfully return session cookie */
  return { success: true, data: sessionCookie }
}
