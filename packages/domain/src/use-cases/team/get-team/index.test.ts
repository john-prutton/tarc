import { mockDatabaseRepository } from "../../../__mocks__"
import { Database } from "../../../adapters"
import { Team, User } from "../../../entities"
import { getTeam } from "./index"

describe("getTeam", () => {
  const mockUser: User.Entity = {
    id: "mockUserId",
    credits: 100,
    hashedPassword: "hashedPassword",
    username: "username"
  }
  const mockTeam: Team.Entity = { id: 1, name: "mockTeamName" }

  let mockDb: Database.Repository

  beforeEach(() => {
    mockDb = mockDatabaseRepository()
  })

  it("should return the team when it exists and the user is a member", async () => {
    jest.spyOn(mockDb.team, "getUserRoleInTeam").mockResolvedValueOnce({
      success: true,
      data: "owner"
    })

    jest
      .spyOn(mockDb.team, "getTeamById")
      .mockResolvedValueOnce({ success: true, data: mockTeam })

    const inputs = { userId: mockUser.id, teamId: mockTeam.id }
    const dependencies = { db: mockDb }
    const result = await getTeam(inputs, dependencies)

    expect(result).toEqual({ success: true, data: mockTeam })
    expect(mockDb.team.getUserRoleInTeam).toHaveBeenCalledWith(
      mockUser.id,
      mockTeam.id
    )
    expect(mockDb.team.getTeamById).toHaveBeenCalledWith(mockTeam.id)
  })

  it("should return an error when the user is not part of the team", async () => {
    jest.spyOn(mockDb.team, "getUserRoleInTeam").mockResolvedValueOnce({
      success: false,
      error: { code: "NOT_FOUND", message: "User not found in team" }
    })

    const inputs = { teamId: 9999999, userId: mockUser.id }
    const dependencies = { db: mockDb }
    const result = await getTeam(inputs, dependencies)

    expect(result).toEqual({
      success: false,
      error: { code: "NOT_FOUND", message: "User not found in team" }
    })
    expect(mockDb.team.getUserRoleInTeam).toHaveBeenCalledWith(
      mockUser.id,
      9999999
    )
    expect(mockDb.team.getTeamById).not.toHaveBeenCalled()
  })
})
