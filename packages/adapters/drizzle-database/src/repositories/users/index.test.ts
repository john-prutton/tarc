import { User } from "@repo/domain/entities"
import { TaskResult } from "@repo/domain/types"

import { describeDatabaseTest } from "../../helpers"

describeDatabaseTest("orders", (db, repository) => {
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
    const getUsernameRes = await repository.user.getByUsername("test-username")
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
