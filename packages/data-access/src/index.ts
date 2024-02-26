import type { Project } from "@repo/domain/entities"

let projects: Project.Entity[] = []

export const InMemoryProjectStorage: Project.Repository = {
  async create(newProject) {
    const project: Project.Entity = {
      ...newProject,
      id: projects.length + newProject.name.replaceAll(" ", "_")
    }

    projects.push(project)

    return {
      success: true,
      data: project
    }
  },

  async getAll() {
    return {
      success: true,
      data: projects
    }
  },

  async getById(projectId) {
    const result = projects.find((project) => project.id === projectId)

    if (!result)
      return {
        success: false,
        error: {
          code: "NOT_FOUND",
          message: "No project found with id '" + projectId + "'"
        }
      }

    return {
      success: true,
      data: result
    }
  },

  async delete(projectId) {
    const index = projects.findIndex((p) => p.id === projectId)
    if (index === -1)
      return {
        success: false,
        error: {
          code: "NOT_FOUND",
          message: "No projects found with that ID."
        }
      }

    projects.splice(index, 1)

    return {
      success: true,
      data: undefined
    }
  },

  async transact(txfn) {
    const _projects = projects
    projects = Array.from(projects)

    const result = await txfn(InMemoryProjectStorage)

    if (result.success === false) {
      projects = _projects
    }

    return result
  }
}
