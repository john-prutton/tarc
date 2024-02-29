import type { Auth, Database } from "@repo/domain/adapters"
import type { Project, Session, User } from "@repo/domain/entities"

let projects: Project.Entity[] = []

var sessions: Session.Entity[] = []
var users: User.Entity[] = []

const authRepository: Auth.Repository = {
  async deleteExpiredSessions() {
    sessions = sessions.filter(
      (session) => session.expiresAt.getTime() > Date.now()
    )
  },

  async deleteSession(sessionId) {
    sessions = sessions.filter((session) => session.id !== sessionId)
  },

  async deleteUserSessions(userId) {
    sessions = sessions.filter((sessions) => sessions.userId !== userId)
  },

  async getSessionAndUser(sessionId) {
    const session = sessions.find((session) => session.id === sessionId)
    if (!session) return [null, null]

    const user = users.find((user) => user.id === session.userId)
    if (!user) return [null, null]

    return [session, user]
  },

  async getUserSessions(userId) {
    return sessions.filter((session) => session.userId === userId)
  },

  async setSession(session) {
    sessions.push(session)
  },

  async updateSessionExpiration(sessionId, expiresAt) {
    const session = sessions.find((session) => session.id === sessionId)

    if (session) session.expiresAt = expiresAt
  }
}

const userRepository: User.Repository = {
  async create(user) {
    const prevUser = users.findIndex(
      ({ username }) => username === user.username
    )

    if (prevUser !== -1)
      return {
        success: false,
        error: {
          code: "NOT_ALLOWED",
          message: "Unique constraint failed on 'username'"
        }
      }

    users.push(user)

    return {
      success: true,
      data: undefined
    }
  },

  async getByUsername(username) {
    const user = users.find((user) => user.username === username)
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
  }
}

const projectRepository: Project.Repository = {
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

    const result = await txfn(projectRepository)

    if (result.success === false) {
      projects = _projects
    }

    return result
  }
}

export const db: Database.Repository = {
  project: projectRepository,
  user: userRepository,
  auth: authRepository
}
