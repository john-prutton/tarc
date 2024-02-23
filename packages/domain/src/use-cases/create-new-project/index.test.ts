import { createNewProject } from "."
import { Project } from "../../entities"

const mockedProjectRepository: Project.Repository = {
  create: jest.fn(),
  getAll: jest.fn(),
  getById: jest.fn(),
  transact: jest
    .fn()
    .mockImplementation(async (tx) => await tx(mockedProjectRepository))
}

describe("create-new-project", () => {
  it("fails if it cant get existing projects", async () => {
    const newProject: Project.NewEntity = { name: "test" }

    jest.spyOn(mockedProjectRepository, "getAll").mockResolvedValueOnce({
      success: false,
      error: { code: "SERVER_ERROR", message: "test-error" }
    })

    const result = await createNewProject(newProject, mockedProjectRepository)

    expect(result.success).toBeFalsy()
    if (result.success) return

    expect(result.error.code).toBe("SERVER_ERROR")
  })

  it("fails if there are too many projects", async () => {
    const newProject: Project.NewEntity = { name: "test" }

    jest.spyOn(mockedProjectRepository, "getAll").mockResolvedValueOnce({
      success: true,
      data: new Array(3)
    })

    const result = await createNewProject(newProject, mockedProjectRepository)

    expect(result.success).toBeFalsy()
    if (result.success) return

    expect(result.error.code).toBe("NOT_ALLOWED")
  })

  it("passes if there are not too many projects", async () => {
    const newProject: Project.NewEntity = { name: "test-name" }

    jest.spyOn(mockedProjectRepository, "getAll").mockResolvedValueOnce({
      success: true,
      data: new Array(0)
    })

    jest.spyOn(mockedProjectRepository, "create").mockResolvedValueOnce({
      success: true,
      data: { id: "test-id", name: "test-name" }
    })

    const result = await createNewProject(newProject, mockedProjectRepository)

    expect(result.success).toBeTruthy()
    if (!result.success) return

    expect(result.data.name).toBe("test-name")
  })
})
