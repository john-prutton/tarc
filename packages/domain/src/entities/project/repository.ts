import { Project, User } from ".."
import { AsyncTaskResult } from "../../types"

export type Repository = {
  create: (newProject: Project.NewEntity) => AsyncTaskResult<Project.Entity>
  getById: (projectId: Project.Entity["id"]) => AsyncTaskResult<Project.Entity>
  getAll: () => AsyncTaskResult<Project.Entity[]>
  delete: (projectId: Project.Entity["id"]) => AsyncTaskResult<undefined>
  createRole: (
    projectId: Project.Entity["id"],
    userId: User.Entity["id"],
    role: Project.ProjectRole
  ) => AsyncTaskResult<void>
  getRole: ({
    projectId,
    userId
  }: {
    projectId: Project.Entity["id"]
    userId: User.Entity["id"]
  }) => AsyncTaskResult<Project.ProjectRole | "None">
}
