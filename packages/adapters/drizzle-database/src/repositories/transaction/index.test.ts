import { Project } from "@repo/domain/entities"
import { TaskResult } from "@repo/domain/types"

import { describeDatabaseTest } from "../../helpers"

describeDatabaseTest("transaction", (db, repository) => {
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
