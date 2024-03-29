import { createTeamInvite } from "."
import { mockDatabaseRepository } from "../../../__mocks__"
import { Database } from "../../../adapters"

describe("createTeamInvite", () => {
  let mockedDb: Database.Repository

  beforeEach(() => {
    mockedDb = mockDatabaseRepository()
  })

  it("should fail if user is not team leader or admin", async () => {
    jest.spyOn(mockedDb.team, "getUserRoleInTeam").mockResolvedValueOnce({
      success: true,
      data: "member"
    })

    const result = await createTeamInvite(
      { userId: "user-id", teamId: 1 },
      { db: mockedDb }
    )

    expect(result).toEqual({
      success: false,
      error: {
        code: "NOT_ALLOWED",
        message: "You are not allowed to create team invites for this team"
      }
    })
    expect(mockedDb.team.createTeamInvite).not.toHaveBeenCalled()
  })

  it("should succeed if user is team leader", async () => {
    jest.spyOn(mockedDb.team, "getUserRoleInTeam").mockResolvedValueOnce({
      success: true,
      data: "leader"
    })
    jest.spyOn(mockedDb.team, "createTeamInvite").mockResolvedValueOnce({
      success: true,
      data: "invite-id"
    })

    const result = await createTeamInvite(
      { userId: "user-id", teamId: 1 },
      { db: mockedDb }
    )

    expect(result).toEqual({ success: true, data: "invite-id" })

    expect(mockedDb.team.createTeamInvite).toHaveBeenCalledWith({
      teamId: 1
    })
  })
})
