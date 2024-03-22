import { and, eq } from "drizzle-orm"

import { Team } from "@repo/domain/entities"

import { DatabaseRepository } from "../../db"

export function createTeamRepository(db: DatabaseRepository): Team.Repository {
  return {
    async createTeam(newTeam) {
      return {
        success: false,
        error: { code: "SERVER_ERROR", message: "Not implemented" }
      }
    },

    async getAllTeamsByUser(userId) {
      return {
        success: false,
        error: { code: "SERVER_ERROR", message: "Not implemented" }
      }
    },

    async deleteTeam(team) {
      return {
        success: false,
        error: { code: "SERVER_ERROR", message: "Not implemented" }
      }
    },

    async setUserRoleInTeam(teamId, userId, role) {
      return {
        success: false,
        error: { code: "SERVER_ERROR", message: "Not implemented" }
      }
    }
  }
}
