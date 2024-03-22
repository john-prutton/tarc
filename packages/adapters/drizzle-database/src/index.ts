import type { Database } from "@repo/domain/adapters"

import { createDb, DatabaseRepository } from "./db"
import * as RepositoryFactories from "./repositories"

export { createDb }

export function createRepository(db: DatabaseRepository) {
  const dbRepository: Database.Repository = {
    transaction: RepositoryFactories.createTransactionRepository(db),
    user: RepositoryFactories.createUserRepository(db),
    project: RepositoryFactories.createProjectRepository(db),
    auth: RepositoryFactories.createAuthRepository(db),
    order: RepositoryFactories.createOrderRepository(db),
    team: RepositoryFactories.createTeamRepository(db)
  }

  return dbRepository
}
