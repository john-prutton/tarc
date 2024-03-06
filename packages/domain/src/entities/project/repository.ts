import { Project, User } from ".."
import { AsyncTaskResult } from "../../types"

export type Repository = {
  create: (newProject: Project.NewEntity) => AsyncTaskResult<Project.Entity>
  getById: (projectId: Project.Entity["id"]) => AsyncTaskResult<Project.Entity>
  getAll: () => AsyncTaskResult<Project.Entity[]>
  delete: (projectId: Project.Entity["id"]) => AsyncTaskResult<undefined>
  createUserRole: (
    projectId: Project.Entity["id"],
    userId: User.Entity["id"],
    role: "Owner" | "Leader" | "Member"
  ) => AsyncTaskResult<void>
}
