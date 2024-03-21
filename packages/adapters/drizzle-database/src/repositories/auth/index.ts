import { eq, lte } from "drizzle-orm"

import "@repo/domain/entities"

import type { Auth } from "@repo/domain/adapters"

import { DatabaseRepository } from "../../db"
import { sessionsTable, usersTable } from "../../schema"

export function createAuthRepository(db: DatabaseRepository): Auth.Repository {
  return {
    async deleteExpiredSessions(timestamp) {
      const res = await db
        .delete(sessionsTable)
        .where(lte(sessionsTable.expiresAt, timestamp))
    },

    async deleteSession(sessionId) {
      // sessions = sessions.filter((session) => session.id !== sessionId)
      const res = await db
        .delete(sessionsTable)
        .where(eq(sessionsTable.id, sessionId))
    },

    async deleteUserSessions(userId) {
      // sessions = sessions.filter((sessions) => sessions.userId !== userId)
      const res = await db
        .delete(sessionsTable)
        .where(eq(sessionsTable.userId, userId))
    },

    async getSessionAndUser(sessionId) {
      // const session = sessions.find((session) => session.id === sessionId)
      const [session] = await db
        .select()
        .from(sessionsTable)
        .where(eq(sessionsTable.id, sessionId))
        .limit(1)
      if (!session) return [null, null]

      // const user = users.find((user) => user.id === session.userId)
      const [user] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, session.userId))
      if (!user) return [null, null]

      return [session, user]
    },

    async getUserSessions(userId) {
      // return sessions.filter((session) => session.userId === userId)
      const sessions = await db
        .select()
        .from(sessionsTable)
        .where(eq(sessionsTable.userId, userId))
      return sessions
    },

    async setSession(session) {
      // sessions.push(session)
      const res = await db.insert(sessionsTable).values(session)
    },

    async updateSessionExpiration(sessionId, expiresAt) {
      // const session = sessions.find((session) => session.id === sessionId)
      const res = await db
        .update(sessionsTable)
        .set({ expiresAt })
        .where(eq(sessionsTable.id, sessionId))
    }
  }
}
