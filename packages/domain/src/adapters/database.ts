import type { Auth } from "."
import type { Order, Project, Session, User } from "../entities"
import { AsyncTaskResult } from "../types"

export type Repository = {
  auth: Auth.Repository
  project: Project.Repository
  user: User.Repository
  order: Order.Repository
  transaction: <T>(
    txFn: (txRepository: Repository) => AsyncTaskResult<T>
  ) => AsyncTaskResult<T>
}
