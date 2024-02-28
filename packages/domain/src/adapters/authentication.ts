import { Session, User } from "../entities"
import { AsyncTaskResult } from "../types"

type SessionId = Session.Entity["id"]
type UserId = User.Entity["id"]

export type Repository = {
  deleteExpiredSessions(): Promise<void>
  deleteSession(sessionId: SessionId): Promise<void>
  deleteUserSessions(userId: UserId): Promise<void>
  getSessionAndUser(
    sessionId: SessionId
  ): Promise<
    [session: Session.Entity, user: User.Entity] | [session: null, user: null]
  >
  getUserSessions(userId: UserId): Promise<Session.Entity[]>
  setSession(session: Session.Entity): Promise<void>
  updateSessionExpiration(sessionId: SessionId, expiresAt: Date): Promise<void>
}

export type Adapter = {
  createSession(userId: User.Entity["id"]): AsyncTaskResult<Session.Entity>
  createSessionCookie(sessionId: Session.Entity["id"]): Session.Cookie
  createBlankSessionCookie(): Session.Cookie
  invalidateSession(sessionId: Session.Entity["id"]): AsyncTaskResult<void>
  generateId(): string
  verifyPassword(
    attempt: User.Entity["hashedPassword"],
    hashedPassword: User.Entity["hashedPassword"]
  ): Promise<boolean>
  hashPassword(
    plainPassword: User.NewEntity["plainPassword"]
  ): Promise<User.Entity["hashedPassword"]>
}
