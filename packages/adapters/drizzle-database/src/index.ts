import type { Auth, Database } from "@repo/domain/adapters"
import type { Project, User } from "@repo/domain/entities"
import { eq, lte } from "drizzle-orm"

import { createDb } from "./db"
import { usersTable } from "./schema"
import { projectsTable } from "./schema/projects"
import { sessionsTable } from "./schema/sessions"

export { createDb }

export function createRepository(
  db:
    | ReturnType<typeof createDb>
    | Parameters<
        Parameters<ReturnType<typeof createDb>["transaction"]>["0"]
      >["0"]
) {
  const userRepository: User.Repository = {
    async create(user) {
      try {
        const res = await db.insert(usersTable).values(user)

        return {
          success: true,
          data: undefined
        }
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

    async getByUsername(username) {
      try {
        const [user] = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.username, username))
          .limit(1)

        if (!user)
          return {
            success: false,
            error: {
              code: "NOT_FOUND",
              message: "User not found"
            }
          }

        return {
          success: true,
          data: user
        }
      } catch (error) {
        return {
          success: false,
          error: { code: "SERVER_ERROR", message: `DB error of: ${error}` }
        }
      }
    }
  }

  const authRepository: Auth.Repository = {
    async deleteExpiredSessions(timestamp) {
      const res = await db
        .delete(sessionsTable)
        .where(lte(sessionsTable.expiresAt, timestamp))
    },

    async deleteSession(sessionId) {
      // sessions = sessions.filter((session) => session.id !== sessionId)
      const res = await db
        .delete(sessionsTable)
        .where(eq(sessionsTable.id, sessionId))
    },

    async deleteUserSessions(userId) {
      // sessions = sessions.filter((sessions) => sessions.userId !== userId)
      const res = await db
        .delete(sessionsTable)
        .where(eq(sessionsTable.userId, userId))
    },

    async getSessionAndUser(sessionId) {
      // const session = sessions.find((session) => session.id === sessionId)
      const [session] = await db
        .select()
        .from(sessionsTable)
        .where(eq(sessionsTable.id, sessionId))
        .limit(1)
      if (!session) return [null, null]

      // const user = users.find((user) => user.id === session.userId)
      const [user] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, session.userId))
      if (!user) return [null, null]

      return [session, user]
    },

    async getUserSessions(userId) {
      // return sessions.filter((session) => session.userId === userId)
      const sessions = await db
        .select()
        .from(sessionsTable)
        .where(eq(sessionsTable.userId, userId))
      return sessions
    },

    async setSession(session) {
      // sessions.push(session)
      const res = await db.insert(sessionsTable).values(session)
    },

    async updateSessionExpiration(sessionId, expiresAt) {
      // const session = sessions.find((session) => session.id === sessionId)
      const res = await db
        .update(sessionsTable)
        .set({ expiresAt })
        .where(eq(sessionsTable.id, sessionId))
    }
  }

  const projectRepository: Project.Repository = {
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
    }
  }

  const transaction: Database.Repository["transaction"] = async (txFn) => {
    try {
      const txRes = await db.transaction(async (txDb) => {
        const txRepository = createRepository(txDb)
        const res = await txFn(txRepository)

        if (!res.success)
          throw new Error(`${res.error.code}: ${res.error.message}`)

        return res
      })
      return txRes
    } catch (error) {
      return {
        success: false,
        error: {
          code: "ROLLBACK",
          message:
            "Rollback occurred: " +
            (error instanceof Error
              ? error.message
              : "unexpected error occurred")
        }
      }
    }
  }

  const dbRepository: Database.Repository = {
    transaction,
    project: projectRepository,
    user: userRepository,
    auth: authRepository
  }

  return dbRepository
}
