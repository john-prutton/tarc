import { mockDatabaseRepository } from "../../../__mocks__"
import { Team } from "../../../entities"
import { getInvitation } from "./index"

describe("getInvitation", () => {
  const mockedInviteCode = "ABC123"
  const mockedTeam: Team.Entity = { id: 1, name: "Mocked Team Name" }

  const mockedDb = mockDatabaseRepository()

  it("should return the team name when a valid code is provided", async () => {
    // Mock the database query to return the team name
    jest.spyOn(mockedDb.team, "getTeamByInviteCode").mockResolvedValueOnce({
      success: true,
      data: mockedTeam
    })

    const inputs = { code: mockedInviteCode }
    const dependencies = { db: mockedDb }
    const result = await getInvitation(inputs, dependencies)
    expect(result).toEqual({
      success: true,
      data: { teamName: mockedTeam.name }
    })
  })

  it("should throw an error when an invalid code is provided", async () => {
    // Mock the database query to return null (no team found)
    const error = {
      success: false,
      error: { code: "NOT_FOUND", message: "Team not found" }
    } as const
    jest
      .spyOn(mockedDb.team, "getTeamByInviteCode")
      .mockResolvedValueOnce(error)

    const inputs = { code: "invalidCode" }
    const dependencies = { db: mockedDb }
    expect(await getInvitation(inputs, dependencies)).toEqual(error)
  })
})
