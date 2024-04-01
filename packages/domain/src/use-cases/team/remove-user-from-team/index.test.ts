import { removeUserFromTeam } from "."
import { mockDatabaseRepository } from "../../../__mocks__"
import { Database } from "../../../adapters"

describe("remove-user-from-team", () => {
  let mockedDatabase: Database.Repository

  beforeEach(() => {
    mockedDatabase = mockDatabaseRepository()
  })

  it("should fail if user is a member and is trying to remove another team member", async () => {
    jest.spyOn(mockedDatabase.team, "getUserRoleInTeam").mockResolvedValueOnce({
      success: true,
      data: "member"
    })

    const result = await removeUserFromTeam(
      {
        userId: "user-id",
        teamId: 1,
        teamMemberToRemoveId: "a-different-user-id"
      },
      { db: mockedDatabase }
    )

    expect(result).toEqual({
      success: false,
      error: {
        code: "NOT_ALLOWED",
        message: "Only team owner or leader can remove members"
      }
    })

    expect(mockedDatabase.team.removeMemberFromTeam).not.toHaveBeenCalled()
  })

  it("should succeed if user is a member and is trying to remove themselves", async () => {
    jest.spyOn(mockedDatabase.team, "getUserRoleInTeam").mockResolvedValueOnce({
      success: true,
      data: "member"
    })

    jest
      .spyOn(mockedDatabase.team, "removeMemberFromTeam")
      .mockResolvedValueOnce({
        success: true,
        data: undefined
      })

    const result = await removeUserFromTeam(
      {
        userId: "user-id",
        teamId: 1,
        teamMemberToRemoveId: "user-id"
      },
      { db: mockedDatabase }
    )

    expect(result).toEqual({
      success: true,
      data: undefined
    })

    expect(mockedDatabase.team.removeMemberFromTeam).toHaveBeenCalledWith<
      [{ userId: string; teamId: number }]
    >({
      userId: "user-id",
      teamId: 1
    })
  })

  it("should succeed if user is an owner || leader and is trying to remove another team member", async () => {
    jest.spyOn(mockedDatabase.team, "getUserRoleInTeam").mockResolvedValueOnce({
      success: true,
      data: "leader"
    })

    jest.spyOn(mockedDatabase.team, "getUserRoleInTeam").mockResolvedValueOnce({
      success: true,
      data: "member"
    })

    jest
      .spyOn(mockedDatabase.team, "removeMemberFromTeam")
      .mockResolvedValueOnce({
        success: true,
        data: undefined
      })

    const result = await removeUserFromTeam(
      {
        userId: "user-id",
        teamId: 1,
        teamMemberToRemoveId: "a-different-user-id"
      },
      { db: mockedDatabase }
    )

    expect(result).toEqual({
      success: true,
      data: undefined
    })

    expect(mockedDatabase.team.removeMemberFromTeam).toHaveBeenCalledWith<
      [{ userId: string; teamId: number }]
    >({ teamId: 1, userId: "a-different-user-id" })
  })

  describe("should not let the owner be removed", () => {
    it("when they remove themselves", async () => {
      jest
        .spyOn(mockedDatabase.team, "getUserRoleInTeam")
        .mockResolvedValueOnce({
          success: true,
          data: "owner"
        })

      const result = await removeUserFromTeam(
        {
          userId: "user-id",
          teamId: 1,
          teamMemberToRemoveId: "user-id"
        },
        { db: mockedDatabase }
      )

      expect(result).toEqual({
        success: false,
        error: {
          code: "NOT_ALLOWED",
          message: "Cannot remove team owner. Transfer ownership first."
        }
      })
    })

    it("when they are removed by someone else", async () => {
      jest
        .spyOn(mockedDatabase.team, "getUserRoleInTeam")
        .mockResolvedValueOnce({
          success: true,
          data: "leader"
        })

      jest
        .spyOn(mockedDatabase.team, "getUserRoleInTeam")
        .mockResolvedValueOnce({
          success: true,
          data: "owner"
        })

      const result = await removeUserFromTeam(
        {
          userId: "user-id",
          teamId: 1,
          teamMemberToRemoveId: "another-user-id"
        },
        { db: mockedDatabase }
      )

      expect(result).toEqual({
        success: false,
        error: {
          code: "NOT_ALLOWED",
          message: "Cannot remove team owner. Transfer ownership first."
        }
      })
    })
  })
})
