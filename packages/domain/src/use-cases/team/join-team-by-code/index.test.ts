import { joinTeamByCode } from "."
import { mockDatabaseRepository } from "../../../__mocks__"
import { Database } from "../../../adapters"

describe("createTeamInvite", () => {
  let mockedDb: Database.Repository

  beforeEach(() => {
    mockedDb = mockDatabaseRepository()
  })

  it("should fail if team is not found", async () => {
    jest.spyOn(mockedDb.team, "getTeamByInviteCode").mockResolvedValueOnce({
      success: false,
      error: { code: "NOT_FOUND", message: "Team not found" }
    })

    const result = await joinTeamByCode(
      { code: "123", userId: "123" },
      { db: mockedDb }
    )

    expect(result).toEqual({
      success: false,
      error: { code: "NOT_FOUND", message: "Team not found" }
    })
    expect(mockedDb.team.setUserRoleInTeam).not.toHaveBeenCalled()
  })

  it("should fail if user is not found", async () => {
    const mockTeam = { id: 123, name: "test team" }
    jest.spyOn(mockedDb.team, "getTeamByInviteCode").mockResolvedValueOnce({
      success: true,
      data: mockTeam
    })

    jest.spyOn(mockedDb.user, "getById").mockResolvedValueOnce({
      success: false,
      error: { code: "NOT_FOUND", message: "User not found" }
    })

    const result = await joinTeamByCode(
      { code: "123", userId: "123" },
      { db: mockedDb }
    )

    expect(result).toEqual({
      success: false,
      error: { code: "NOT_FOUND", message: "User not found" }
    })
  })

  it("should fail if user is already in team", async () => {
    const mockTeam = { id: 123, name: "test team" }
    jest.spyOn(mockedDb.team, "getTeamByInviteCode").mockResolvedValueOnce({
      success: true,
      data: mockTeam
    })

    const mockUser = {
      id: "123",
      username: "test user",
      hashedPassword: "123",
      credits: 100
    }
    jest.spyOn(mockedDb.user, "getById").mockResolvedValueOnce({
      success: true,
      data: mockUser
    })

    jest.spyOn(mockedDb.team, "getUserRoleInTeam").mockResolvedValueOnce({
      success: true,
      data: "member"
    })

    const result = await joinTeamByCode(
      { code: "123", userId: "123" },
      { db: mockedDb }
    )

    expect(result).toEqual({
      success: false,
      error: { code: "NOT_ALLOWED", message: "User is already in team" }
    })
  })

  it("should pass otherwise", async () => {
    const mockTeam = { id: 123, name: "test team" }
    jest.spyOn(mockedDb.team, "getTeamByInviteCode").mockResolvedValueOnce({
      success: true,
      data: mockTeam
    })

    const mockUser = {
      id: "123",
      username: "test user",
      hashedPassword: "123",
      credits: 100
    }
    jest.spyOn(mockedDb.user, "getById").mockResolvedValueOnce({
      success: true,
      data: mockUser
    })

    jest.spyOn(mockedDb.team, "getUserRoleInTeam").mockResolvedValueOnce({
      success: false,
      error: { code: "NOT_FOUND", message: "User not found in team" }
    })

    jest.spyOn(mockedDb.team, "setUserRoleInTeam").mockResolvedValueOnce({
      success: true,
      data: undefined
    })

    jest.spyOn(mockedDb.team, "deleteInvitation").mockResolvedValueOnce({
      success: true,
      data: undefined
    })

    const result = await joinTeamByCode(
      { code: "123", userId: "123" },
      { db: mockedDb }
    )

    expect(result).toEqual({
      success: true,
      data: { id: mockTeam.id }
    })
  })
})
