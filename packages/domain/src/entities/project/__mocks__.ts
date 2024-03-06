import { Project } from ".."

export const mockProjectRepository = (): Project.Repository => {
  const mock: Project.Repository = {
    create: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn(),
    delete: jest.fn(),
    createUserRole: jest.fn()
  }

  return mock
}
