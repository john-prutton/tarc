"use server"

import { revalidatePath } from "next/cache"

import { Project } from "@repo/domain/entities"
import { AsyncTaskResult } from "@repo/domain/types"
import { createProject, deleteProject } from "@repo/domain/use-cases/project"

import { tryGetAuthedUser } from "@/components/auth/actions"
import { databaseRepo } from "@/lib/adapters/database"

export async function tryCreateProject(
  formData: FormData
): AsyncTaskResult<Project.Entity> {
  // auth check for user
  const user = await tryGetAuthedUser()
  if (!user)
    return {
      success: false,
      error: {
        code: "NOT_ALLOWED",
        message: "You must be signed in to do this."
      }
    }

  // get data from form
  const newProject: Project.NewEntity = {
    name: formData.get("name") as string
  }

  // try create project
  const result = await createProject(
    { newProject, userId: user.id },
    databaseRepo
  )
  if (result.success) revalidatePath("/")

  return result
}

export async function getAllProjects() {
  return await databaseRepo.project.getAll()
}

export async function tryDeleteProject(projectId: Project.Entity["id"]) {
  const result = await deleteProject(projectId, databaseRepo)
  if (result.success) revalidatePath("/")

  return result
}
