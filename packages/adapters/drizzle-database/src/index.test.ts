import { Project, Session, User } from "@repo/domain/entities"
import { TaskResult } from "@repo/domain/types"

import { createRepository } from "."
import { createDb } from "./db"
import { projectsTable, sessionsTable, usersTable } from "./schema"
import { userProjectRolesTable } from "./schema/userProjectRoles"

describe("database repository", () => {
  const db = createDb({ url: process.env["DATABASE_URL"]! })
  const repository = createRepository(db)

  // clear all data from the previous test
  afterEach(async () => {
    await db.delete(userProjectRolesTable)
    await db.delete(sessionsTable)
    await db.delete(usersTable)
    await db.delete(projectsTable)
  })

  describe("projects repo", () => {
    test("successful crud", async () => {
      // create two dummy projects
      const _createRes = await repository.project.create({ name: "test" })
      const _create2Res = await repository.project.create({ name: "test2" })

      const getAllRes = await repository.project.getAll()

      expect(getAllRes).toEqual<TaskResult<Project.Entity[]>>({
        success: true,
        data: [
          {
            id: "test",
            name: "test"
          },
          {
            id: "test2",
            name: "test2"
          }
        ]
      })

      // try create a project with a naming collision
      const create3Res = await repository.project.create({ name: "test" })
      expect(create3Res).toEqual<TaskResult<Project.Entity>>({
        success: false,
        error: {
          code: "SERVER_ERROR",
          message: "DB error as Error: UNIQUE constraint failed: projects.id"
        }
      })

      // try delete project by id
      const deleteRes = await repository.project.delete("test")
      expect(deleteRes).toEqual<TaskResult<undefined>>({
        success: true,
        data: undefined
      })

      // try get project by id
      const getRes = await repository.project.getById("test2")
      expect(getRes).toEqual<TaskResult<Project.Entity>>({
        success: true,
        data: {
          id: "test2",
          name: "test2"
        }
      })
    })

    test("unsuccessful crud", async () => {
      // try get non-existent project by id
      const getIdRes = await repository.project.getById("not-found")
      expect(getIdRes).toEqual<TaskResult<Project.Entity>>({
        success: false,
        error: {
          code: "NOT_FOUND",
          message: "No project found with id 'not-found'"
        }
      })

      // try delete non-existent project by id
      const deleteIdRes = await repository.project.delete("not-found")
      expect(deleteIdRes).toEqual<TaskResult<Project.Entity>>({
        success: false,
        error: {
          code: "NOT_FOUND",
          message: "No projects found with that ID."
        }
      })
    })

    describe("roles", () => {
      test("create role fails if user doesn't exist", async () => {
        // insert project
        const createProjectRes = await repository.project.create({
          name: "test-project"
        })
        expect(createProjectRes.success).toEqual(true)
        if (!createProjectRes.success) return
        const project = createProjectRes.data

        // try create role
        const res = await repository.project.createRole(
          project.id,
          "non-existent-user-id",
          "Owner"
        )

        // checks
        expect(res).toEqual({
          error: {
            code: "SERVER_ERROR",
            message:
              "DB error of: LibsqlError: SQLITE_CONSTRAINT_FOREIGNKEY: FOREIGN KEY constraint failed"
          },
          success: false
        })

        expect(
          await repository.project.getRole({
            projectId: project.id,
            userId: "non-existent-user-id"
          })
        ).toEqual({
          success: true,
          data: "None"
        })
      })

      test("create role fails if project doesn't exist", async () => {
        // insert user
        const user = {
          id: "test-user-id",
          username: "test-username",
          hashedPassword: "test-hashed-password",
          credits: 100
        }
        const createUserRes = await repository.user.create(user)
        expect(createUserRes.success).toEqual(true)
        if (!createUserRes.success) return

        // try
        const res = await repository.project.createRole(
          "non-existent-project-id",
          user.id,
          "Owner"
        )

        // checks
        expect(res).toEqual({
          error: {
            code: "SERVER_ERROR",
            message:
              "DB error of: LibsqlError: SQLITE_CONSTRAINT_FOREIGNKEY: FOREIGN KEY constraint failed"
          },
          success: false
        })

        expect(
          await repository.project.getRole({
            projectId: "non-existent-project-id",
            userId: user.id
          })
        ).toEqual({ success: true, data: "None" })
      })

      test("succeeds if user & project exist", async () => {
        // insert user
        const user = {
          id: "test-user-id",
          username: "test-username",
          hashedPassword: "test-hashed-password",
          credits: 100
        }
        const createUserRes = await repository.user.create(user)
        expect(createUserRes.success).toEqual(true)
        if (!createUserRes.success) return

        // insert project
        const createProjectRes = await repository.project.create({
          name: "test-project"
        })
        expect(createProjectRes.success).toEqual(true)
        if (!createProjectRes.success) return
        const project = createProjectRes.data

        // try create role
        const res = await repository.project.createRole(
          project.id,
          user.id,
          "Owner"
        )

        expect(res).toEqual({ success: true, data: undefined })

        expect(
          await repository.project.getRole({
            projectId: project.id,
            userId: user.id
          })
        ).toEqual({ success: true, data: "Owner" })
      })
    })
  })

  describe("user repo", () => {
    const fakeUser = {
      id: "test-id",
      username: "test-username",
      hashedPassword: "test-hashed-password",
      credits: 100
    }

    describe("setCredits", () => {
      test("fails when user doesn't exist", async () => {
        const res = await repository.user.setCredits("non-existent", 0)

        expect(res).toEqual({
          error: {
            code: "SERVER_ERROR",
            message: "Something went wrong updating user's credits"
          },
          success: false
        })
      })
    })

    test("successful crud", async () => {
      // create user
      const createRes = await repository.user.create(fakeUser)

      expect(createRes).toEqual<TaskResult<undefined>>({
        success: true,
        data: undefined
      })

      // get user by username
      const getUsernameRes =
        await repository.user.getByUsername("test-username")
      expect(getUsernameRes).toEqual<TaskResult<User.Entity>>({
        success: true,
        data: fakeUser
      })

      // set credits
      const setCreditsRes = await repository.user.setCredits(fakeUser.id, 999)
      expect(setCreditsRes).toEqual({ success: true, data: undefined })

      // get user by id
      const getIdRes = await repository.user.getById(fakeUser.id)
      expect(getIdRes).toEqual<TaskResult<User.Entity>>({
        success: true,
        data: {
          ...fakeUser,
          credits: 999
        }
      })
    })

    test("unsuccessful crud", async () => {
      const create1Res = await repository.user.create(fakeUser)

      // try create users with same id
      const create2Res = await repository.user.create({
        ...fakeUser,
        username: "test-username-2"
      })

      expect(create2Res).toEqual<TaskResult<User.Entity>>({
        success: false,
        error: {
          code: "SERVER_ERROR",
          message:
            "DB error of: LibsqlError: SQLITE_CONSTRAINT_PRIMARYKEY: UNIQUE constraint failed: users.id"
        }
      })

      // try create users with same username
      const create3Res = await repository.user.create({
        ...fakeUser,
        id: "test-id-2",
        username: "test-username"
      })

      expect(create3Res).toEqual<TaskResult<User.Entity>>({
        success: false,
        error: {
          code: "SERVER_ERROR",
          message:
            "DB error of: LibsqlError: SQLITE_CONSTRAINT_UNIQUE: UNIQUE constraint failed: users.username"
        }
      })

      // try get non-existent username
      const getRes = await repository.user.getByUsername("non-existent")
      expect(getRes).toEqual<TaskResult<User.Entity>>({
        success: false,
        error: {
          code: "NOT_FOUND",
          message: "User not found"
        }
      })
    })
  })

  describe("auth repo", () => {
    const user: User.Entity = {
      id: "test-user-id",
      username: "test-username",
      hashedPassword: "test-hashed-password",
      credits: 100
    }
    const session: Session.Entity = {
      id: "test-session-id",
      userId: user.id,
      expiresAt: new Date(1000)
    }

    beforeEach(async () => {
      // create user
      await repository.user.create(user)
      // create session
      await repository.auth.setSession(session)
    })

    test("invalid create session", async () => {
      // try create the same session again
      try {
        await repository.auth.setSession(session)
      } catch (error) {
        expect(error).toBeDefined
      }
    })

    test("get*", async () => {
      // get session and user
      const getRes = await repository.auth.getSessionAndUser("test-session-id")
      expect(getRes).toEqual([session, user])

      // get user sessions
      const getUserSessions = await repository.auth.getUserSessions(user.id)
      expect(getUserSessions).toEqual([session])
    })

    test("update*", async () => {
      // update session expiration
      await repository.auth.updateSessionExpiration(session.id, new Date(2000))

      // check updated session
      const getSessionAndUser = await repository.auth.getSessionAndUser(
        session.id
      )
      expect(getSessionAndUser).toEqual([
        {
          ...session,
          expiresAt: new Date(2000)
        },
        user
      ])
    })

    test("deleteSession", async () => {
      // delete session by id
      expect(await repository.auth.deleteSession(session.id)).toBeUndefined()

      // check that theres no session
      expect(await repository.auth.getUserSessions(user.id)).toEqual([])
    })

    test("delete user sessions", async () => {
      // delete session by id
      expect(await repository.auth.deleteUserSessions(user.id)).toBeUndefined()

      // check that theres no session
      expect(await repository.auth.getUserSessions(user.id)).toEqual([])
    })

    test("delete expired sessions", async () => {
      // delete session by id
      expect(
        await repository.auth.deleteExpiredSessions(
          // pick a future date
          new Date(session.expiresAt.getTime() + 100)
        )
      ).toBeUndefined()

      // check that theres no session
      expect(await repository.auth.getUserSessions(user.id)).toEqual([])
    })
  })

  describe("transaction functionality", () => {
    test("returns unsuccessful transaction result", async () => {
      const txRes = await repository.transaction(async (txRepo) => {
        return {
          success: false,
          error: {
            code: "SERVER_ERROR",
            message: "testing rollback"
          }
        }
      })

      expect(txRes).toEqual<TaskResult<undefined>>({
        success: false,
        error: {
          code: "ROLLBACK",
          message: "Rollback occurred: SERVER_ERROR: testing rollback"
        }
      })
    })

    test("rolls back correctly after unsuccessful transaction", async () => {
      const _txRes = await repository.transaction(async (txRepo) => {
        await txRepo.project.create({ name: "shouldnt be here" })

        return {
          success: false,
          error: {
            code: "SERVER_ERROR",
            message: "testing rollback"
          }
        }
      })

      const res = await repository.project.getAll()

      expect(res).toEqual<TaskResult<never[]>>({
        success: true,
        data: []
      })
    })

    test("applies correct result after successful transaction", async () => {
      const txRes = await repository.transaction(async (txRepo) => {
        return await txRepo.project.create({ name: "should be here" })
      })

      expect(txRes).toEqual<TaskResult<Project.Entity>>({
        success: true,
        data: {
          id: "should_be_here",
          name: "should be here"
        }
      })

      const res = await repository.project.getAll()

      expect(res).toEqual<TaskResult<Project.Entity[]>>({
        success: true,
        data: [{ id: "should_be_here", name: "should be here" }]
      })
    })
  })
})
