import { Session, User } from "@repo/domain/entities"

import { describeDatabaseTest } from "../../helpers"

describeDatabaseTest("auth", (db, repository) => {
  const user: User.Entity = {
    id: "test-user-id",
    username: "test-username",
    hashedPassword: "test-hashed-password",
    credits: 100
  }
  const session: Session.Entity = {
    id: "test-session-id",
    userId: user.id,
    expiresAt: new Date(1000)
  }

  beforeEach(async () => {
    // create user
    await repository.user.create(user)
    // create session
    await repository.auth.setSession(session)
  })

  test("invalid create session", async () => {
    // try create the same session again
    try {
      await repository.auth.setSession(session)
    } catch (error) {
      expect(error).toBeDefined
    }
  })

  test("get*", async () => {
    // get session and user
    const getRes = await repository.auth.getSessionAndUser("test-session-id")
    expect(getRes).toEqual([session, user])

    // get user sessions
    const getUserSessions = await repository.auth.getUserSessions(user.id)
    expect(getUserSessions).toEqual([session])
  })

  test("update*", async () => {
    // update session expiration
    await repository.auth.updateSessionExpiration(session.id, new Date(2000))

    // check updated session
    const getSessionAndUser = await repository.auth.getSessionAndUser(
      session.id
    )
    expect(getSessionAndUser).toEqual([
      {
        ...session,
        expiresAt: new Date(2000)
      },
      user
    ])
  })

  test("deleteSession", async () => {
    // delete session by id
    expect(await repository.auth.deleteSession(session.id)).toBeUndefined()

    // check that theres no session
    expect(await repository.auth.getUserSessions(user.id)).toEqual([])
  })

  test("delete user sessions", async () => {
    // delete session by id
    expect(await repository.auth.deleteUserSessions(user.id)).toBeUndefined()

    // check that theres no session
    expect(await repository.auth.getUserSessions(user.id)).toEqual([])
  })

  test("delete expired sessions", async () => {
    // delete session by id
    expect(
      await repository.auth.deleteExpiredSessions(
        // pick a future date
        new Date(session.expiresAt.getTime() + 100)
      )
    ).toBeUndefined()

    // check that theres no session
    expect(await repository.auth.getUserSessions(user.id)).toEqual([])
  })
})
