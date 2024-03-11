import { Auth } from "."

export const mockAuthAdapter = (): Auth.Adapter => {
  const mock: Auth.Adapter = {
    createBlankSessionCookie: jest.fn(),
    createSession: jest.fn(),
    createSessionCookie: jest.fn(),
    generateId: jest.fn(),
    hashPassword: jest.fn(),
    invalidateSession: jest.fn(),
    verifyPassword: jest.fn()
  }

  return mock
}

export const mockAuthRepository = (): Auth.Repository => {
  const mock: Auth.Repository = {
    deleteExpiredSessions: jest.fn(),
    deleteSession: jest.fn(),
    deleteUserSessions: jest.fn(),
    getSessionAndUser: jest.fn(),
    getUserSessions: jest.fn(),
    setSession: jest.fn(),
    updateSessionExpiration: jest.fn()
  }

  return mock
}
