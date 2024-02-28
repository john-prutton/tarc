import { User } from ".."
import { AsyncTaskResult } from "../../types"

export type Repository = {
  create: (user: User.Entity) => AsyncTaskResult<undefined>
  getByUsername: (
    username: User.Entity["username"]
  ) => AsyncTaskResult<User.Entity>
}
