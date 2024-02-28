import { revalidatePath } from "next/cache"

import { db } from "@repo/database"
import { Project } from "@repo/domain/entities"
import { createProject, deleteProject } from "@repo/domain/use-cases/project"

import { ProjectCard } from "@/components/project-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default async function ProjectPage() {
  async function tryCreateProject(formData: FormData) {
    "use server"

    const newProject: Project.NewEntity = {
      name: formData.get("name") as string
    }

    const result = await createProject(newProject, db.project)
    if (result.success) revalidatePath("/")

    return result
  }

  async function getAllProjects() {
    "use server"
    return await db.project.getAll()
  }

  async function tryDeleteProject(projectId: Project.Entity["id"]) {
    "use server"
    const result = await deleteProject(projectId, db.project)
    if (result.success) revalidatePath("/")

    return result
  }

  const allProjects = await getAllProjects()
  if (!allProjects.success) return "error"

  return (
    <div className="mx-auto flex min-h-svh w-fit flex-col items-center justify-center drop-shadow">
      <form action={tryCreateProject} className="mb-8 flex flex-row gap-2">
        <Input type="text" name="name" />
        <Button>Create</Button>
      </form>

      {allProjects.data.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          deleteAction={tryDeleteProject}
        />
      ))}
    </div>
  )
}
