import { NEW_TEAM_COST } from ".."
import { mockDatabaseRepository } from "../../../__mocks__"
import { Database } from "../../../adapters"
import { Team, User } from "../../../entities"
import { deleteMyTeam } from "./index"

describe("deleteMyTeam", () => {
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

  it("should delete the team if the user's role is owner", async () => {
    jest.spyOn(mockDb.team, "getUserRoleInTeam").mockResolvedValueOnce({
      success: true,
      data: "owner"
    })
    jest
      .spyOn(mockDb.user, "getById")
      .mockResolvedValueOnce({ success: true, data: mockUser })
    jest
      .spyOn(mockDb.user, "setCredits")
      .mockResolvedValueOnce({ success: true, data: undefined })
    jest
      .spyOn(mockDb.team, "deleteTeam")
      .mockResolvedValueOnce({ success: true, data: undefined })

    const inputs = { userId: mockUser.id, teamId: mockTeam.id }
    const dependencies = { db: mockDb }
    const result = await deleteMyTeam(inputs, dependencies)

    expect(result).toEqual({ success: true, data: undefined })
    expect(mockDb.user.setCredits).toHaveBeenLastCalledWith<[string, number]>(
      mockUser.id,
      mockUser.credits + NEW_TEAM_COST
    )
    expect(mockDb.team.deleteTeam).toHaveBeenLastCalledWith<[number]>(
      mockTeam.id
    )
  })

  it("should fail if the user is not the owner", async () => {
    jest.spyOn(mockDb.team, "getUserRoleInTeam").mockResolvedValueOnce({
      success: true,
      data: "member"
    })

    const inputs = { userId: mockUser.id, teamId: mockTeam.id }
    const dependencies = { db: mockDb }
    const result = await deleteMyTeam(inputs, dependencies)

    expect(result).toEqual({
      success: false,
      error: {
        code: "NOT_ALLOWED",
        message: "You can't delete a team you don't own"
      }
    })
    expect(mockDb.user.setCredits).not.toHaveBeenCalled()
    expect(mockDb.team.deleteTeam).not.toHaveBeenCalled()
  })
})
