import { Project } from "@repo/domain/entities"
import { TaskResult } from "@repo/domain/types"

import { clearAllTables, describeDatabaseTest } from "../../helpers"

describeDatabaseTest("projects", (db, repository) => {
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
