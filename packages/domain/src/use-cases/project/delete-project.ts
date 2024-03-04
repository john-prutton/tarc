import { Database } from "../../adapters"
import { Project } from "../../entities"
import { AsyncTaskResult } from "../../types"

export async function deleteProject(
  projectId: Project.Entity["id"],
  databaseRepository: Database.Repository
): AsyncTaskResult<undefined> {
  return await databaseRepository.project.delete(projectId)
}
