import { Database } from "../../adapters"
import { Project, User } from "../../entities"
import { PROJECT_COST } from "../../entities/project"
import { AsyncTaskResult } from "../../types"

export async function deleteProject(
  {
    projectId,
    userId
  }: {
    projectId: Project.Entity["id"]
    userId: User.Entity["id"]
  },
  databaseRepository: Database.Repository
): AsyncTaskResult<undefined> {
  return await databaseRepository.transaction(async (databaseRepository) => {
    // check if user owns this project
    const roleResult = await databaseRepository.project.getRole({
      projectId,
      userId
    })
    if (!roleResult.success) return roleResult

    const role = roleResult.data
    if (role !== "Owner")
      return {
        success: false,
        error: {
          code: "NOT_ALLOWED",
          message: "You are not the owner of this project"
        }
      }

    // refund user
    const getUserResult = await databaseRepository.user.getById(userId)
    if (!getUserResult.success)
      return {
        success: false,
        error: { code: "SERVER_ERROR", message: "No user found" }
      }

    const user = getUserResult.data
    const refundCreditsResult = await databaseRepository.user.setCredits(
      userId,
      user.credits + PROJECT_COST
    )
    if (!refundCreditsResult.success) return refundCreditsResult

    // delete project
    const deleteProjectResult =
      await databaseRepository.project.delete(projectId)
    return deleteProjectResult
  })
}
