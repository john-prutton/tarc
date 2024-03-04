import type { Auth } from "@repo/domain/adapters"
import type { User } from "@repo/domain/entities"
import { generateId, Lucia, Scrypt, type Adapter } from "lucia"

declare module "lucia" {
  interface Register {
    // Lucia: typeof Lucia<Session.Entity, User.Entity>
    DatabaseUserAttributes: Omit<User.Entity, "id">
  }
}

export function createLucia(databaseRepository: Auth.Repository): Auth.Adapter {
  const dbAdapter: Adapter = {
    deleteExpiredSessions: () =>
      databaseRepository.deleteExpiredSessions(new Date()),
    deleteSession: databaseRepository.deleteSession,
    deleteUserSessions: databaseRepository.deleteUserSessions,
    updateSessionExpiration: databaseRepository.updateSessionExpiration,
    setSession: databaseRepository.setSession,

    async getSessionAndUser(sessionId) {
      const res = await databaseRepository.getSessionAndUser(sessionId)

      if (!res[0] || !res[1]) return [null, null]

      return [
        {
          ...res[0],
          attributes: {}
        },
        {
          id: res[1].id,
          attributes: {
            hashedPassword: res[1].hashedPassword,
            username: res[1].username
          }
        }
      ]
    },

    async getUserSessions(userId) {
      const sessions = await databaseRepository.getUserSessions(userId)

      return sessions.map((session) => ({ ...session, attributes: {} }))
    }
  }

  const lucia = new Lucia(dbAdapter, {
    getUserAttributes(databaseUserAttributes) {
      return databaseUserAttributes
    }
  })

  return {
    async createSession(userId) {
      const session = await lucia.createSession(userId, {})
      return {
        success: true,
        data: session
      }
    },

    createSessionCookie(sessionId) {
      const sessionCookie = lucia.createSessionCookie(sessionId)

      return {
        name: "authCookie",
        value: sessionCookie.value
      }
    },

    createBlankSessionCookie() {
      const blankSessionCookie = lucia.createBlankSessionCookie()

      return {
        name: "authCookie",
        value: blankSessionCookie.value
      }
    },

    async invalidateSession(sessionId) {
      await lucia.invalidateSession(sessionId)
      return {
        success: true,
        data: undefined
      }
    },

    generateId: () => generateId(15),

    async hashPassword(plainPassword) {
      return await new Scrypt().hash(plainPassword)
    },

    async verifyPassword(attempt, hashedPassword) {
      return await new Scrypt().verify(hashedPassword, attempt)
    }
  }
}
