import { mockDatabaseRepository } from "../../__mocks__"
import { PROJECT_COST } from "../../entities/project"
import { deleteProject } from "./delete-project"

const mockedDatabaseRepository = mockDatabaseRepository()

describe("delete project", () => {
  it("fails if not performed by the owner", async () => {
    jest
      .spyOn(mockedDatabaseRepository.project, "getRole")
      .mockResolvedValueOnce({
        success: true,
        data: "None"
      })

    const result = await deleteProject(
      { projectId: "fake-project-id", userId: "fake-user-id" },
      mockedDatabaseRepository
    )

    // check failure
    expect(result.success).toBeFalsy()
    if (result.success) return

    expect(result.error.code).toBe("NOT_ALLOWED")
  })

  it("succeeds if not performed by the owner", async () => {
    // mock role
    jest
      .spyOn(mockedDatabaseRepository.project, "getRole")
      .mockResolvedValueOnce({
        success: true,
        data: "Owner"
      })

    // mock user
    const fakeUser = {
      id: "fake-user-id",
      username: "fake-user-name",
      hashedPassword: "fake-user-password",
      credits: 100
    }
    jest.spyOn(mockedDatabaseRepository.user, "getById").mockResolvedValueOnce({
      success: true,
      data: fakeUser
    })

    // mock refund
    const mockedRefund = jest
      .spyOn(mockedDatabaseRepository.user, "setCredits")
      .mockResolvedValueOnce({
        success: true,
        data: undefined
      })

    // mock delete
    const mockedDelete = jest
      .spyOn(mockedDatabaseRepository.project, "delete")
      .mockResolvedValueOnce({
        success: true,
        data: undefined
      })

    // test
    const fakeProjectId = "fake-project-id"
    const result = await deleteProject(
      { projectId: fakeProjectId, userId: fakeUser.id },
      mockedDatabaseRepository
    )

    // check success
    expect(result).toEqual({ success: true, data: undefined })

    // check refund
    expect(mockedRefund).toHaveBeenLastCalledWith(
      fakeUser.id,
      fakeUser.credits + PROJECT_COST
    )

    // check delete
    expect(mockedDelete).toHaveBeenLastCalledWith(fakeProjectId)
  })
})
