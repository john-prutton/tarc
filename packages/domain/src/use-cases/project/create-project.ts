import type { Database } from "../../adapters"
import type { Project } from "../../entities"
import type { AsyncTaskResult } from "../../types"

/**
 * # Create a new Project
 *
 * Check that there are less than 3 existing projects, and create a new project.
 *
 * @param newProject
 * @param projectRepository
 * @returns result
 */
export async function createProject(
  newProject: Project.NewEntity,
  databaseRepository: Database.Repository
): AsyncTaskResult<Project.Entity> {
  return databaseRepository.transaction(async (txRepo) => {
    const result = await txRepo.project.getAll()

    if (!result.success)
      return {
        success: false,
        error: { code: "SERVER_ERROR", message: "Failed to load projects." }
      }

    if (result.data.length >= 3)
      return {
        success: false,
        error: {
          code: "NOT_ALLOWED",
          message: "There are too many projects. Delete one and try again."
        }
      }

    return await txRepo.project.create({ name: newProject.name })
  })
}
