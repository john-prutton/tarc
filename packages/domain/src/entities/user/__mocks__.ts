import { User } from ".."

export const mockUserRepository = (): User.Repository => {
  const mock: User.Repository = {
    create: jest.fn(),
    getByUsername: jest.fn(),
    getById: jest.fn(),
    setCredits: jest.fn()
  }

  return mock
}
