import { mockDatabaseRepository } from "../../__mocks__"
import { Project } from "../../entities"
import { mockProjectRepository } from "../../entities/project/__mocks__"
import { createProject } from "./create-project"

const mockedDatabaseRepository = mockDatabaseRepository()

describe("create-new-project", () => {
  it("fails if it cant get existing projects", async () => {
    const newProject: Project.NewEntity = { name: "test" }

    jest
      .spyOn(mockedDatabaseRepository.project, "getAll")
      .mockResolvedValueOnce({
        success: false,
        error: { code: "SERVER_ERROR", message: "test-error" }
      })

    jest
      .spyOn(mockedDatabaseRepository, "transaction")
      .mockImplementationOnce(async (txFn) => {
        return txFn(mockedDatabaseRepository)
      })

    const result = await createProject(newProject, mockedDatabaseRepository)

    expect(result.success).toBeFalsy()
    if (result.success) return

    expect(result.error.code).toBe("SERVER_ERROR")
  })

  it("fails if there are too many projects", async () => {
    const newProject: Project.NewEntity = { name: "test" }

    jest
      .spyOn(mockedDatabaseRepository.project, "getAll")
      .mockResolvedValueOnce({
        success: true,
        data: new Array(3)
      })

    jest
      .spyOn(mockedDatabaseRepository, "transaction")
      .mockImplementationOnce(async (txFn) => {
        return txFn(mockedDatabaseRepository)
      })

    const result = await createProject(newProject, mockedDatabaseRepository)

    expect(result.success).toBeFalsy()
    if (result.success) return

    expect(result.error.code).toBe("NOT_ALLOWED")
  })

  it("passes if there are not too many projects", async () => {
    const newProject: Project.NewEntity = { name: "test-name" }

    jest
      .spyOn(mockedDatabaseRepository.project, "getAll")
      .mockResolvedValueOnce({
        success: true,
        data: new Array(0)
      })

    jest
      .spyOn(mockedDatabaseRepository.project, "create")
      .mockResolvedValueOnce({
        success: true,
        data: { id: "test-id", name: "test-name" }
      })

    jest
      .spyOn(mockedDatabaseRepository, "transaction")
      .mockImplementationOnce(async (txFn) => {
        return txFn(mockedDatabaseRepository)
      })

    const result = await createProject(newProject, mockedDatabaseRepository)

    expect(result.success).toBeTruthy()
    if (!result.success) return

    expect(result.data.name).toBe("test-name")
  })
})
