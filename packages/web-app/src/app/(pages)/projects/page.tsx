import { getAllProjects, tryDeleteProject } from "./actions"
import { CreateProjectForm, ProjectCard } from "./components"

export default async function ProjectPage() {
  const allProjects = await getAllProjects()
  if (!allProjects.success) return "error"

  return (
    <main className="mx-auto flex w-fit flex-col items-center justify-center gap-y-4 drop-shadow">
      <CreateProjectForm />

      {allProjects.data.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          deleteAction={tryDeleteProject}
        />
      ))}
    </main>
  )
}
