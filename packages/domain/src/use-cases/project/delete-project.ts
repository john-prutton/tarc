import { Project } from "../../entities"
import { AsyncTaskResult } from "../../types"

export async function deleteProject(
  projectId: Project.Entity["id"],
  projectRepository: Project.Repository
): AsyncTaskResult<undefined> {
  return await projectRepository.delete(projectId)
}
