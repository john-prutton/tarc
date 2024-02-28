import { mockProjectRepository } from "../../entities/project/__mocks__"
import { deleteProject } from "./delete-project"

const mockedProjectRepository = mockProjectRepository()

describe("delete project", () => {
  it("fails if it cant find the project", async () => {
    jest.spyOn(mockedProjectRepository, "delete").mockResolvedValueOnce({
      success: false,
      error: { code: "NOT_FOUND", message: "test-error" }
    })

    const result = await deleteProject("test-id", mockedProjectRepository)

    console.log(result)

    expect(result.success).toBeFalsy()
    if (result.success) return

    expect(result.error.code).toBe("NOT_FOUND")
  })
})
