import { and, eq } from "drizzle-orm"

import { Project } from "@repo/domain/entities"

import { DatabaseRepository } from "../../db"
import { projectsTable, userProjectRolesTable } from "../../schema"

export function createProjectRepository(
  db: DatabaseRepository
): Project.Repository {
  return {
    async create(newProject) {
      const newValue = {
        ...newProject,
        id: newProject.name.replaceAll(" ", "_")
      }

      try {
        const [project] = await db
          .insert(projectsTable)
          .values(newValue)
          .returning()

        if (!project)
          return {
            success: false,
            error: {
              code: "SERVER_ERROR",
              message: `DB error while inserting project`
            }
          }

        return {
          success: true,
          data: project
        }
      } catch (error) {
        return {
          success: false,
          error: {
            code: "SERVER_ERROR",
            message: `DB error as ${error}`
          }
        }
      }
    },

    async getAll() {
      const projects = await db.select().from(projectsTable)
      return {
        success: true,
        data: projects
      }
    },

    async getById(projectId) {
      // const result = projects.find((project) => project.id === projectId)
      const [project] = await db
        .select()
        .from(projectsTable)
        .where(eq(projectsTable.id, projectId))
        .limit(1)

      if (!project)
        return {
          success: false,
          error: {
            code: "NOT_FOUND",
            message: "No project found with id '" + projectId + "'"
          }
        }

      return {
        success: true,
        data: project
      }
    },

    async delete(projectId) {
      const res = await db
        .delete(projectsTable)
        .where(eq(projectsTable.id, projectId))

      if (res.rowsAffected !== 1)
        return {
          success: false,
          error: {
            code: "NOT_FOUND",
            message: "No projects found with that ID."
          }
        }

      return {
        success: true,
        data: undefined
      }
    },

    async createRole(projectId, userId, role) {
      try {
        const result = await db
          .insert(userProjectRolesTable)
          .values({ projectId, userId, role })

        if (result.rowsAffected !== 1)
          return {
            success: false,
            error: {
              code: "SERVER_ERROR",
              message: "Something went wrong while create user's role"
            }
          }

        return { success: true, data: undefined }
      } catch (error) {
        return {
          success: false,
          error: {
            code: "SERVER_ERROR",
            message: `DB error of: ${error}`
          }
        }
      }
    },

    async getRole({ projectId, userId }) {
      try {
        const [result] = await db
          .select()
          .from(userProjectRolesTable)
          .where((table) =>
            and(eq(table.projectId, projectId), eq(table.userId, userId))
          )
          .limit(1)

        return {
          success: true,
          data: result?.role ?? "None"
        }
      } catch (error) {
        return {
          success: false,
          error: { code: "SERVER_ERROR", message: `DB error of: ${error}` }
        }
      }
    }
  }
}
