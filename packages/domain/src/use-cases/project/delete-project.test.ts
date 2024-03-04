import { mockDatabaseRepository } from "../../__mocks__"
import { deleteProject } from "./delete-project"

const mockedDatabaseRepository = mockDatabaseRepository()

describe("delete project", () => {
  it("fails if it cant find the project", async () => {
    jest
      .spyOn(mockedDatabaseRepository.project, "delete")
      .mockResolvedValueOnce({
        success: false,
        error: { code: "NOT_FOUND", message: "test-error" }
      })

    const result = await deleteProject("test-id", mockedDatabaseRepository)

    console.log(result)

    expect(result.success).toBeFalsy()
    if (result.success) return

    expect(result.error.code).toBe("NOT_FOUND")
  })
})
