"use server"

import { revalidatePath } from "next/cache"

import { Project } from "@repo/domain/entities"
import { createProject, deleteProject } from "@repo/domain/use-cases/project"

import { databaseRepo } from "@/lib/adapters/database"

export async function tryCreateProject(formData: FormData) {
  const newProject: Project.NewEntity = {
    name: formData.get("name") as string
  }

  const result = await createProject(newProject, databaseRepo)
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
