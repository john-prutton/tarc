import { describeDatabaseTest } from "../../helpers"
import { teamsTable, usersTable, userTeamRolesTable } from "../../schema"

describeDatabaseTest("Team Repository", (db, repository) => {
  it("should create a new team", async () => {
    const team = { name: "Test Team" }
    const createdTeam = await repository.team.createTeam(team)

    expect(createdTeam).toEqual({
      success: true,
      data: { id: 1, name: "Test Team" }
    })

    expect(await db.select().from(teamsTable)).toEqual([
      { id: 1, name: "Test Team" }
    ])
  })

  it("should get all teams by a user", async () => {
    const fakeUser = {
      id: "fakeUserId",
      hashedPassword: "fakeHashedPassword",
      username: "fakeUsername",
      credits: 100
    }
    const fakeTeam = { id: 1, name: "Test Team" }

    await db.insert(usersTable).values(fakeUser)
    await db.insert(teamsTable).values(fakeTeam)
    await db.insert(userTeamRolesTable).values({
      userId: fakeUser.id,
      teamId: fakeTeam.id,
      role: "member"
    })

    const fakeUser2 = {
      id: "fakeUserId2",
      hashedPassword: "fakeHashedPassword2",
      username: "fakeUsername2",
      credits: 100
    }
    const fakeTeam2 = { id: 2, name: "Test Team 2" }

    await db.insert(usersTable).values(fakeUser2)
    await db.insert(teamsTable).values(fakeTeam2)
    await db.insert(userTeamRolesTable).values({
      userId: fakeUser2.id,
      teamId: fakeTeam2.id,
      role: "member"
    })

    expect(await repository.team.getAllTeamsByUser(fakeUser.id)).toEqual({
      success: true,
      data: [fakeTeam]
    })
  })

  it("should delete a team", async () => {
    // create a team and a user
    const [createdTeam] = await db
      .insert(teamsTable)
      .values({ name: "Test Team" })
      .returning()
    const [createdTeam2] = await db
      .insert(teamsTable)
      .values({ name: "Test Team 2" })
      .returning()
    const [createdUser] = await db
      .insert(usersTable)
      .values({
        username: "test",
        hashedPassword: "test",
        credits: 100,
        id: "1"
      })
      .returning()
    const [createdRole] = await db
      .insert(userTeamRolesTable)
      .values({
        userId: createdUser!.id,
        teamId: createdTeam!.id,
        role: "owner"
      })
      .returning()

    // try to delete the team
    const result = await repository.team.deleteTeam(createdTeam!.id)
    expect(result).toEqual({ success: true, data: undefined })

    // check that the team is deleted
    expect(await db.select().from(teamsTable)).toEqual([
      { id: createdTeam2!.id, name: "Test Team 2" }
    ])
    expect(await db.select().from(userTeamRolesTable)).toEqual([])
  })

  it("should set a user's role in a team", async () => {
    // create a team and a user
    const [createdTeam] = await db
      .insert(teamsTable)
      .values({ name: "Test Team" })
      .returning()
    const [createdUser] = await db
      .insert(usersTable)
      .values({
        username: "test",
        hashedPassword: "test",
        credits: 100,
        id: "1"
      })
      .returning()

    // try to set the user's role in the team
    const result = await repository.team.setUserRoleInTeam(
      createdTeam!.id,
      createdUser!.id,
      "owner"
    )
    expect(result).toEqual({ success: true, data: undefined })

    // check that the user's role is set
    expect(await db.select().from(userTeamRolesTable)).toEqual([
      { teamId: createdTeam!.id, userId: createdUser!.id, role: "owner" }
    ])

    // change the user's role in the team
    const result2 = await repository.team.setUserRoleInTeam(
      createdTeam!.id,
      createdUser!.id,
      "member"
    )

    // check that the user's role is changed
    expect(await db.select().from(userTeamRolesTable)).toEqual([
      { teamId: createdTeam!.id, userId: createdUser!.id, role: "member" }
    ])
  })
})
