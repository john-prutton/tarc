import { mockDatabaseRepository } from "../../../__mocks__"
import { Database } from "../../../adapters"
import { createTeam, NEW_TEAM_COST } from "./index"

describe("createTeam", () => {
  let mockedDb: Database.Repository

  beforeEach(() => {
    mockedDb = mockDatabaseRepository()
  })

  it("should return error if user does not have enough credits", async () => {
    const newTeam = { name: "Test Team" }
    const fakeUser = {
      credits: NEW_TEAM_COST - 1,
      id: "user123",
      hashedPassword: "hashedPassword",
      username: "username"
    }

    jest.spyOn(mockedDb.user, "getById").mockResolvedValue({
      success: true,
      data: fakeUser
    })

    const result = await createTeam(
      { newTeam, userId: fakeUser.id },
      { db: mockedDb }
    )

    expect(result).toEqual({
      success: false,
      error: {
        code: "NOT_ALLOWED",
        message: "You don't have enough credits to create a team"
      }
    })
    expect(mockedDb.user.getById).toHaveBeenCalledWith(fakeUser.id)
    expect(mockedDb.user.setCredits).not.toHaveBeenCalled()
    expect(mockedDb.team.createTeam).not.toHaveBeenCalled()
    expect(mockedDb.team.setUserRoleInTeam).not.toHaveBeenCalled()
  })

  it("should return error if updating user credits fails", async () => {
    const newTeam = { name: "new-team" }
    const fakeUser = {
      credits: NEW_TEAM_COST,
      id: "user123",
      hashedPassword: "hashedPassword",
      username: "username"
    }

    jest.spyOn(mockedDb.user, "getById").mockResolvedValue({
      success: true,
      data: fakeUser
    })

    jest.spyOn(mockedDb.user, "setCredits").mockResolvedValue({
      success: false,
      error: { code: "SERVER_ERROR", message: "Update credits failed" }
    })

    const result = await createTeam(
      { newTeam, userId: fakeUser.id },
      { db: mockedDb }
    )

    expect(result).toEqual({
      success: false,
      error: { code: "SERVER_ERROR", message: "Update credits failed" }
    })
    expect(mockedDb.user.getById).toHaveBeenCalledWith(fakeUser.id)
    expect(mockedDb.user.setCredits).toHaveBeenCalledWith(
      fakeUser.id,
      fakeUser.credits - NEW_TEAM_COST
    )
    expect(mockedDb.team.createTeam).not.toHaveBeenCalled()
    expect(mockedDb.team.setUserRoleInTeam).not.toHaveBeenCalled()
  })

  it("should return error if creating team fails", async () => {
    const newTeam = { name: "new-team" }
    const fakeUser = {
      credits: NEW_TEAM_COST,
      id: "user123",
      hashedPassword: "hashedPassword",
      username: "username"
    }

    jest.spyOn(mockedDb.user, "getById").mockResolvedValue({
      success: true,
      data: fakeUser
    })

    jest.spyOn(mockedDb.user, "setCredits").mockResolvedValue({
      success: true,
      data: undefined
    })

    jest.spyOn(mockedDb.team, "createTeam").mockResolvedValue({
      success: false,
      error: { code: "SERVER_ERROR", message: "Create team failed" }
    })

    const result = await createTeam(
      { newTeam, userId: fakeUser.id },
      { db: mockedDb }
    )

    expect(result).toEqual({
      success: false,
      error: { code: "SERVER_ERROR", message: "Create team failed" }
    })
    expect(mockedDb.user.getById).toHaveBeenCalledWith(fakeUser.id)
    expect(mockedDb.user.setCredits).toHaveBeenCalledWith(
      fakeUser.id,
      fakeUser.credits - NEW_TEAM_COST
    )
    expect(mockedDb.team.createTeam).toHaveBeenCalledWith(newTeam)
    expect(mockedDb.team.setUserRoleInTeam).not.toHaveBeenCalled()
  })

  it("should return error if adding user as owner fails", async () => {
    const newTeam = { name: "new-team" }
    const fakeUser = {
      credits: NEW_TEAM_COST,
      id: "user123",
      hashedPassword: "hashedPassword",
      username: "username"
    }

    jest.spyOn(mockedDb.user, "getById").mockResolvedValue({
      success: true,
      data: fakeUser
    })

    jest.spyOn(mockedDb.user, "setCredits").mockResolvedValue({
      success: true,
      data: undefined
    })

    jest.spyOn(mockedDb.team, "createTeam").mockResolvedValue({
      success: true,
      data: { id: "team-id", ...newTeam }
    })

    jest.spyOn(mockedDb.team, "setUserRoleInTeam").mockResolvedValue({
      success: false,
      error: { code: "SERVER_ERROR", message: "Add user as owner failed" }
    })

    const result = await createTeam(
      { newTeam, userId: fakeUser.id },
      { db: mockedDb }
    )

    expect(result).toEqual({
      success: false,
      error: { code: "SERVER_ERROR", message: "Add user as owner failed" }
    })
    expect(mockedDb.user.getById).toHaveBeenCalledWith(fakeUser.id)
    expect(mockedDb.user.setCredits).toHaveBeenCalledWith(
      fakeUser.id,
      fakeUser.credits - NEW_TEAM_COST
    )
    expect(mockedDb.team.createTeam).toHaveBeenCalledWith(newTeam)
    expect(mockedDb.team.setUserRoleInTeam).toHaveBeenCalledWith(
      "team-id",
      fakeUser.id,
      "owner"
    )
  })

  it("should return success if all operations succeed", async () => {
    const newTeam = { name: "new-team" }
    const fakeUser = {
      credits: NEW_TEAM_COST,
      id: "user123",
      hashedPassword: "hashedPassword",
      username: "username"
    }

    jest.spyOn(mockedDb.user, "getById").mockResolvedValue({
      success: true,
      data: fakeUser
    })

    jest.spyOn(mockedDb.user, "setCredits").mockResolvedValue({
      success: true,
      data: undefined
    })

    jest.spyOn(mockedDb.team, "createTeam").mockResolvedValue({
      success: true,
      data: { id: "team-id", ...newTeam }
    })

    jest.spyOn(mockedDb.team, "setUserRoleInTeam").mockResolvedValue({
      success: true,
      data: undefined
    })

    const result = await createTeam(
      { newTeam, userId: fakeUser.id },
      { db: mockedDb }
    )

    expect(result).toEqual({
      success: true,
      data: { id: "team-id", name: newTeam.name }
    })
    expect(mockedDb.user.getById).toHaveBeenCalledWith(fakeUser.id)
    expect(mockedDb.user.setCredits).toHaveBeenCalledWith(
      fakeUser.id,
      fakeUser.credits - NEW_TEAM_COST
    )
    expect(mockedDb.team.createTeam).toHaveBeenCalledWith(newTeam)
    expect(mockedDb.team.setUserRoleInTeam).toHaveBeenCalledWith(
      "team-id",
      fakeUser.id,
      "owner"
    )
  })
})
