import { and, eq } from "drizzle-orm"

import { describeDatabaseTest } from "../../helpers"
import {
  teamInvitesTable,
  teamsTable,
  usersTable,
  userTeamRolesTable
} from "../../schema"

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

  it("should get a user's role in a team", async () => {
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
    const [createdRole] = await db
      .insert(userTeamRolesTable)
      .values({
        userId: createdUser!.id,
        teamId: createdTeam!.id,
        role: "owner"
      })
      .returning()

    // create another user,team, and role for inference
    const [createdTeam2] = await db
      .insert(teamsTable)
      .values({ name: "Test Team 2" })
      .returning()

    const [createdUser2] = await db
      .insert(usersTable)
      .values({
        username: "test2",
        hashedPassword: "test2",
        credits: 100,
        id: "2"
      })
      .returning()

    const [createdRole2] = await db
      .insert(userTeamRolesTable)
      .values({
        userId: createdUser2!.id,
        teamId: createdTeam2!.id,
        role: "member"
      })
      .returning()

    // try to get the user's role in the team
    const result = await repository.team.getUserRoleInTeam(
      createdUser!.id,
      createdTeam!.id
    )
    expect(result).toEqual({ success: true, data: "owner" })

    // change the user's role in the team
    await db
      .update(userTeamRolesTable)
      .set({ role: "member" })
      .where(
        and(
          eq(userTeamRolesTable.userId, createdUser!.id),
          eq(userTeamRolesTable.teamId, createdTeam!.id)
        )
      )

    // try to get the user's role in the team
    const result2 = await repository.team.getUserRoleInTeam(
      createdUser!.id,
      createdTeam!.id
    )
    expect(result2).toEqual({ success: true, data: "member" })
  })

  it("should get a team by id", async () => {
    // assign
    const [createdTeam] = await db
      .insert(teamsTable)
      .values({ name: "Test Team" })
      .returning()

    // act
    const result = await repository.team.getTeamById(createdTeam!.id)

    // assert
    expect(result).toEqual({
      success: true,
      data: { id: createdTeam!.id, name: "Test Team" }
    })
  })

  describe("createTeamInvite", () => {
    const fakeDate = new Date(2021, 1, 1)
    jest.useFakeTimers({ now: fakeDate })

    it("should fail if team does not exist", async () => {
      // act
      const result = await repository.team.createTeamInvite({ teamId: 1 })

      // assert
      expect(result).toEqual({
        success: false,
        error: {
          code: "SERVER_ERROR",
          message: "Database error: Error: FOREIGN KEY constraint failed"
        }
      })
    })

    it("should create a team invite", async () => {
      // assign
      const [createdTeam] = await db
        .insert(teamsTable)
        .values({ name: "Test Team" })
        .returning()

      // act
      const result = await repository.team.createTeamInvite({
        teamId: createdTeam!.id
      })

      // assert
      expect(result).toEqual({
        success: true,
        data: fakeDate.getTime().toString(16).split("").reverse().join("")
      })
    })
  })

  describe("getTeamByInvite", () => {
    it("should fail if invite does not exist", async () => {
      // act
      const result = await repository.team.getTeamByInviteCode("fakeInvite")

      // assert
      expect(result).toEqual({
        success: false,
        error: {
          code: "NOT_FOUND",
          message: "Invitation not found"
        }
      })
    })

    it("should get team by invite", async () => {
      // assign
      const [createdTeam] = await db
        .insert(teamsTable)
        .values({ name: "Test Team" })
        .returning()

      const [createdInvite] = await db
        .insert(teamInvitesTable)
        .values({ teamId: createdTeam!.id, code: "fakeInvite" })
        .returning()

      // act
      const result = await repository.team.getTeamByInviteCode("fakeInvite")

      // assert
      expect(result).toEqual({
        success: true,
        data: { id: createdTeam!.id, name: "Test Team" }
      })
    })
  })

  it("should delete a team invite", async () => {
    // assign
    const [createdTeam] = await db
      .insert(teamsTable)
      .values({ name: "Test Team" })
      .returning()

    const [createdInvite] = await db
      .insert(teamInvitesTable)
      .values({ teamId: createdTeam!.id, code: "fakeInvite" })
      .returning()

    // act
    const result = await repository.team.deleteInvitation(createdInvite!.code)

    // assert
    expect(result).toEqual({ success: true, data: undefined })
    expect(await db.select().from(teamInvitesTable)).toEqual([])
  })

  it("should delete members role", async () => {
    // assign
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

    const [createdRole] = await db
      .insert(userTeamRolesTable)
      .values({
        userId: createdUser!.id,
        teamId: createdTeam!.id,
        role: "member"
      })
      .returning()

    // act
    const result = await repository.team.removeMemberFromTeam({
      userId: createdUser!.id,
      teamId: createdTeam!.id
    })

    // assert
    expect(result).toEqual({ success: true, data: undefined })
    expect(await db.select().from(userTeamRolesTable)).toEqual([])
  })

  it("should get team members", async () => {
    // assign
    const [createdTeam] = await db
      .insert(teamsTable)
      .values({ name: "Test Team" })
      .returning()

    const [createdUser1, createdUser2] = await db
      .insert(usersTable)
      .values([
        {
          username: "test",
          hashedPassword: "test",
          credits: 100,
          id: "1"
        },
        {
          username: "test2",
          hashedPassword: "test2",
          credits: 100,
          id: "2"
        }
      ])
      .returning()

    const createdRoles = await db
      .insert(userTeamRolesTable)
      .values([
        {
          userId: createdUser1!.id,
          teamId: createdTeam!.id,
          role: "member"
        },
        {
          userId: createdUser2!.id,
          teamId: createdTeam!.id,
          role: "member"
        }
      ])
      .returning()

    // act
    const result = await repository.team.getTeamMembers({
      teamId: createdTeam!.id
    })

    // assert
    expect(result).toEqual({
      success: true,
      data: [createdUser1, createdUser2]
    })
  })
})
