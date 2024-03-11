"use server"

import { revalidatePath } from "next/cache"

import { Project } from "@repo/domain/entities"
import { AsyncTaskResult, TaskResult } from "@repo/domain/types"
import { createProject, deleteProject } from "@repo/domain/use-cases/project"

import { databaseAdapter } from "@/lib/adapters"
import { tryGetAuthedUser } from "@/lib/auth/util"

export async function tryCreateProject(
  state: TaskResult<Project.Entity> | undefined,
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
    databaseAdapter
  )

  if (result.success) revalidatePath("/")

  return result
}

export async function getAllProjects() {
  return await databaseAdapter.project.getAll()
}

export async function tryDeleteProject(projectId: Project.Entity["id"]) {
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

  // try
  const result = await deleteProject(
    { projectId, userId: user.id },
    databaseAdapter
  )

  if (result.success) revalidatePath("/")

  return result
}
