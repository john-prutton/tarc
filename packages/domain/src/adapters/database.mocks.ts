import { Database } from "."
import {
  mockAuthRepository,
  mockOrderRepository,
  mockProjectRepository,
  mockTeamRepository,
  mockUserRepository
} from "../__mocks__"

export const mockDatabaseRepository = (): Database.Repository => {
  const mock: Database.Repository = {
    transaction: jest.fn().mockImplementation(async (fn) => fn(mock)),
    auth: mockAuthRepository(),
    order: mockOrderRepository(),
    project: mockProjectRepository(),
    team: mockTeamRepository(),
    user: mockUserRepository()
  }

  return mock
}
