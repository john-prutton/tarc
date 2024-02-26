import { Project } from ".."
import { AsyncTaskResult } from "../../types"

export type Repository = {
  create: (newProject: Project.NewEntity) => AsyncTaskResult<Project.Entity>
  getById: (projectId: Project.Entity["id"]) => AsyncTaskResult<Project.Entity>
  getAll: () => AsyncTaskResult<Project.Entity[]>
  delete: (projectId: Project.Entity["id"]) => AsyncTaskResult<undefined>

  transact: <T>(
    tx: (txProjectRepository: Project.Repository) => AsyncTaskResult<T>
  ) => AsyncTaskResult<T>
}
