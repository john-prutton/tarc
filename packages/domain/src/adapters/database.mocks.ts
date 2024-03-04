import { Database } from "."
import { mockAuthRepository, mockProjectRepository } from "../__mocks__"
import { mockUserRepository } from "../entities/user/__mocks__"

export const mockDatabaseRepository = (): Database.Repository => {
  const mock: Database.Repository = {
    transaction: jest.fn(),
    auth: mockAuthRepository(),
    project: mockProjectRepository(),
    user: mockUserRepository()
  }

  return mock
}
