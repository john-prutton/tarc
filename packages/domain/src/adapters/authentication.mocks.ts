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
