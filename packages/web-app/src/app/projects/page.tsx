import { ProjectCard } from "@/components/project-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { getAllProjects, tryCreateProject, tryDeleteProject } from "./actions"

export default async function ProjectPage() {
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
