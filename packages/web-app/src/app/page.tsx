import { revalidatePath } from "next/cache"

import { InMemoryProjectStorage as projectStorage } from "@repo/data-access"
import { Project } from "@repo/domain/entities"
import { createNewProject } from "@repo/domain/use-cases/create-new-project"

import { ProjectCard } from "@/components/project-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default async function Home() {
  async function createProject(formData: FormData) {
    "use server"

    const newProject: Project.NewEntity = {
      name: formData.get("name") as string
    }

    const result = await createNewProject(newProject, projectStorage)
    if (result.success) revalidatePath("/")

    return result
  }

  async function getAllProjects() {
    "use server"
    return await projectStorage.getAll()
  }

  async function deleteProject(projectId: Project.Entity["id"]) {
    "use server"
    const result = await projectStorage.delete(projectId)
    if (result.success) revalidatePath("/")

    return result
  }

  const allProjects = await getAllProjects()
  if (!allProjects.success) return "error"

  return (
    <div className="mx-auto flex min-h-svh w-fit flex-col items-center justify-center drop-shadow">
      <form action={createProject} className="mb-8 flex flex-row gap-2">
        <Input type="text" name="name" />
        <Button>Create</Button>
      </form>

      {allProjects.data.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          deleteAction={deleteProject}
        />
      ))}
    </div>
  )
}
