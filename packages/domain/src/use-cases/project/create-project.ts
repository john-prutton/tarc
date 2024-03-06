import type { Database } from "../../adapters"
import type { Project, User } from "../../entities"
import type { AsyncTaskResult } from "../../types"

export const NEW_PROJECT_COST = 25

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
  input: {
    newProject: Project.NewEntity
    userId: User.Entity["id"]
  },
  databaseRepository: Database.Repository
): AsyncTaskResult<Project.Entity> {
  return databaseRepository.transaction(async (txRepo) => {
    // Get the user that will be "paying" for this project or error
    const getUserResult = await txRepo.user.getById(input.userId)
    if (!getUserResult.success) return getUserResult
    const user = getUserResult.data

    // Ensure user has funds or error
    if (user.credits < NEW_PROJECT_COST)
      return {
        success: false,
        error: {
          code: "NOT_ALLOWED",
          message: "You don't have enough credits to create a new project"
        }
      }

    // Deduct credits from user or error
    const updateCreditsResult = await txRepo.user.setCredits(
      user.id,
      user.credits - NEW_PROJECT_COST
    )
    if (!updateCreditsResult.success) return updateCreditsResult

    // Create project or error
    const createProjectResult = await txRepo.project.create(input.newProject)
    if (!createProjectResult.success) return createProjectResult
    const project = createProjectResult.data

    // Add user as owner
    const createRoleResult = await txRepo.project.createUserRole(
      project.id,
      user.id,
      "Owner"
    )
    if (!createRoleResult.success) return createRoleResult

    // Successfully return
    return createProjectResult
  })
}
