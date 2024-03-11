import { User } from ".."
import { AsyncTaskResult } from "../../types"

export type Repository = {
  create: (user: User.Entity) => AsyncTaskResult<undefined>
  getByUsername: (
    username: User.Entity["username"]
  ) => AsyncTaskResult<User.Entity>
  getById: (id: User.Entity["id"]) => AsyncTaskResult<User.Entity>
  setCredits: (
    userId: User.Entity["id"],
    credits: User.Entity["credits"]
  ) => AsyncTaskResult<void>
}
