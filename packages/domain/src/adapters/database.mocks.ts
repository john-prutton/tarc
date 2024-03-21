import { Database } from "."
import { mockAuthRepository, mockProjectRepository } from "../__mocks__"
import { mockOrderRepository } from "../entities/order/__mocks__"
import { mockUserRepository } from "../entities/user/__mocks__"

export const mockDatabaseRepository = (): Database.Repository => {
  const mock: Database.Repository = {
    transaction: jest.fn().mockImplementation(async (fn) => fn(mock)),
    auth: mockAuthRepository(),
    project: mockProjectRepository(),
    user: mockUserRepository(),
    order: mockOrderRepository()
  }

  return mock
}
