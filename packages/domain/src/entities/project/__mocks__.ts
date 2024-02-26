import { Project } from ".."

export const mockProjectRepository = (): Project.Repository => {
  const mock: Project.Repository = {
    create: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn(),
    delete: jest.fn(),
    transact: jest.fn().mockImplementation(async (tx) => await tx(mock))
  }

  return mock
}
