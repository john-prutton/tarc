"use server"

import { revalidatePath } from "next/cache"

import { Project } from "@repo/domain/entities"
import { AsyncTaskResult, TaskResult } from "@repo/domain/types"
import { createProject, deleteProject } from "@repo/domain/use-cases/project"

import { databaseAdapter } from "@/lib/adapters"
import { withAuthedUser } from "@/lib/auth/utils"

export async function tryCreateProject(
  state: TaskResult<Project.Entity> | undefined,
  formData: FormData
): AsyncTaskResult<Project.Entity> {
  return withAuthedUser(async (user) => {
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
  })
}

export async function getAllProjects() {
  return await databaseAdapter.project.getAll()
}

export async function tryDeleteProject(projectId: Project.Entity["id"]) {
  return withAuthedUser(async (user) => {
    // try
    const result = await deleteProject(
      { projectId, userId: user.id },
      databaseAdapter
    )

    if (result.success) revalidatePath("/")

    return result
  })
}
