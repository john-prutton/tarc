import type { Auth } from "@repo/domain/adapters"
import type { Session, User } from "@repo/domain/entities"
import { signIn, signOut, signUp } from "@repo/domain/use-cases/auth"

import { createLucia } from "."

var sessions: Session.Entity[] = []
var users: User.Entity[] = []

const authRepo: Auth.Repository = {
  async deleteExpiredSessions() {
    sessions = sessions.filter(
      (session) => session.expiresAt.getTime() > Date.now()
    )
  },

  async deleteSession(sessionId) {
    sessions = sessions.filter((session) => session.id !== sessionId)
  },

  async deleteUserSessions(userId) {
    sessions = sessions.filter((sessions) => sessions.userId !== userId)
  },

  async getSessionAndUser(sessionId) {
    const session = sessions.find((session) => session.id === sessionId)
    if (!session) return [null, null]

    const user = users.find((user) => user.id === session.userId)
    if (!user) return [null, null]

    return [session, user]
  },

  async getUserSessions(userId) {
    return sessions.filter((session) => session.userId === userId)
  },

  async setSession(session) {
    sessions.push(session)
  },

  async updateSessionExpiration(sessionId, expiresAt) {
    const session = sessions.find((session) => session.id === sessionId)

    if (session) session.expiresAt = expiresAt
  }
}

const userRepo: User.Repository = {
  async create(user) {
    const prevUser = users.findIndex((user) => user.username)
    if (prevUser !== -1)
      return {
        success: false,
        error: {
          code: "NOT_ALLOWED",
          message: "Username already in use"
        }
      }

    users.push(user)

    return {
      success: true,
      data: undefined
    }
  },

  async getByUsername(username) {
    const user = users.find((user) => user.username === username)
    if (!user)
      return {
        success: false,
        error: {
          code: "NOT_FOUND",
          message: "User not found"
        }
      }

    return {
      success: true,
      data: user
    }
  }
}

export const authAdapter = createLucia(authRepo)
