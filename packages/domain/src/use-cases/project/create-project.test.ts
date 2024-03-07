import { mockDatabaseRepository } from "../../__mocks__"
import { Project, User } from "../../entities"
import { AsyncTaskResult, TaskResult } from "../../types"
import { createProject, NEW_PROJECT_COST } from "./create-project"

const mockedDatabaseRepository = mockDatabaseRepository()

const newProject: Project.NewEntity = {
  name: "test-project-name"
}

describe("create-new-project", () => {
  it("fails if invalid user id is passed", async () => {
    // mock the user check
    const mockedGetUserResult = {
      success: false,
      error: {
        code: "NOT_FOUND",
        message: "test-message"
      }
    } as const

    jest
      .spyOn(mockedDatabaseRepository.user, "getById")
      .mockResolvedValueOnce(mockedGetUserResult)

    // try
    const result = await createProject(
      { newProject, userId: "non-existent-user" },
      mockedDatabaseRepository
    )

    expect(result).toEqual(mockedGetUserResult)
  })

  it("fails with insufficient credits", async () => {
    // mock the user check
    const mockedGetUserResult: TaskResult<User.Entity> = {
      success: true,
      data: {
        id: "test",
        username: "test-username",
        hashedPassword: "test-hashed-password",
        credits: NEW_PROJECT_COST - 1
      }
    } as const

    jest
      .spyOn(mockedDatabaseRepository.user, "getById")
      .mockResolvedValueOnce(mockedGetUserResult)

    // try
    const result = await createProject(
      { newProject, userId: mockedGetUserResult.data.id },
      mockedDatabaseRepository
    )

    expect(result).toEqual<TaskResult<void>>({
      success: false,
      error: {
        code: "NOT_ALLOWED",
        message: "You don't have enough credits to create a new project"
      }
    })
  })

  it("passes with sufficient credits", async () => {
    // mock the user check
    const mockedGetUserResult: TaskResult<User.Entity> = {
      success: true,
      data: {
        id: "test",
        username: "test-username",
        hashedPassword: "test-hashed-password",
        credits: NEW_PROJECT_COST
      }
    } as const
    jest
      .spyOn(mockedDatabaseRepository.user, "getById")
      .mockResolvedValueOnce(mockedGetUserResult)

    // mock the set credits call
    jest
      .spyOn(mockedDatabaseRepository.user, "setCredits")
      .mockResolvedValueOnce({ success: true, data: undefined })

    // mock the create project call
    const mockedCreateProjectResult: TaskResult<Project.Entity> = {
      success: true,
      data: { ...newProject, id: "test-id" }
    } as const
    jest
      .spyOn(mockedDatabaseRepository.project, "create")
      .mockResolvedValueOnce(mockedCreateProjectResult)

    // mock the create role call
    const mockedCreateRoleResult: TaskResult<void> = {
      success: true,
      data: undefined
    } as const
    const t = jest
      .spyOn(mockedDatabaseRepository.project, "createUserRole")
      .mockResolvedValueOnce(mockedCreateRoleResult)

    // try
    const result = await createProject(
      { newProject, userId: "non-existent-user" },
      mockedDatabaseRepository
    )

    // expect
    expect(result).toEqual(mockedCreateProjectResult)

    expect(mockedDatabaseRepository.user.setCredits).toHaveBeenLastCalledWith(
      mockedGetUserResult.data.id,
      mockedGetUserResult.data.credits - NEW_PROJECT_COST
    )

    expect(
      mockedDatabaseRepository.project.createUserRole
    ).toHaveBeenLastCalledWith(
      mockedCreateProjectResult.data.id,
      mockedGetUserResult.data.id,
      "Owner"
    )
  })
})
