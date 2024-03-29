import { and, eq, inArray } from "drizzle-orm"

import { Team } from "@repo/domain/entities"
import { AsyncTaskResult } from "@repo/domain/types"

import { DatabaseRepository } from "../../db"
import { teamInvitesTable, userTeamRolesTable } from "../../schema"
import { teamsTable } from "../../schema/teams"

const withDbTryCatch = async <T>(
  callback: () => AsyncTaskResult<T>
): AsyncTaskResult<T> => {
  try {
    return await callback()
  } catch (error) {
    return {
      success: false,
      error: { code: "SERVER_ERROR", message: `Database error: ${error}` }
    }
  }
}

export function createTeamRepository(db: DatabaseRepository): Team.Repository {
  return {
    async createTeam(newTeam) {
      return withDbTryCatch(async () => {
        const [result] = await db.insert(teamsTable).values(newTeam).returning()

        if (!result)
          return {
            success: false,
            error: { code: "SERVER_ERROR", message: "Failed to create team" }
          }

        return {
          success: true,
          data: result
        }
      })
    },

    async getAllTeamsByUser(userId) {
      return withDbTryCatch(async () => {
        const userTeamIdsSq = db
          .select({ teamId: userTeamRolesTable.teamId })
          .from(userTeamRolesTable)
          .where(eq(userTeamRolesTable.userId, userId))

        const query = db
          .with(db.$with("user_team_ids").as(userTeamIdsSq))
          .select()
          .from(teamsTable)
          .where(inArray(teamsTable.id, userTeamIdsSq))

        const results = await query

        return {
          success: true,
          data: results
        }
      })
    },

    async deleteTeam(teamId) {
      return withDbTryCatch(async () => {
        const result = await db
          .delete(teamsTable)
          .where(eq(teamsTable.id, teamId))

        if (result.rowsAffected === 0)
          return {
            success: false,
            error: { code: "NOT_FOUND", message: "Team not found" }
          }
        return { success: true, data: undefined }
      })
    },

    async setUserRoleInTeam(teamId, userId, role) {
      return withDbTryCatch(async () => {
        // check if user is already in the team
        const [userTeamRole] = await db
          .select()
          .from(userTeamRolesTable)
          .where(
            and(
              eq(userTeamRolesTable.teamId, teamId),
              eq(userTeamRolesTable.userId, userId)
            )
          )

        let result
        if (userTeamRole) {
          result = (
            await db
              .update(userTeamRolesTable)
              .set({ teamId, userId, role })
              .where(
                and(
                  eq(userTeamRolesTable.teamId, teamId),
                  eq(userTeamRolesTable.userId, userId)
                )
              )
              .returning()
          )[0]
        } else {
          result = (
            await db
              .insert(userTeamRolesTable)
              .values({ teamId, userId, role })
              .returning()
          )[0]
        }

        if (!result)
          return {
            success: false,
            error: {
              code: "SERVER_ERROR",
              message: "Failed to set user's role"
            }
          }

        return {
          success: true,
          data: undefined
        }
      })
    },

    async getUserRoleInTeam(userId, teamId) {
      return withDbTryCatch(async () => {
        const [result] = await db
          .select({ role: userTeamRolesTable.role })
          .from(userTeamRolesTable)
          .where(
            and(
              eq(userTeamRolesTable.teamId, teamId),
              eq(userTeamRolesTable.userId, userId)
            )
          )

        if (!result)
          return {
            success: false,
            error: {
              code: "NOT_FOUND",
              message: "User not found in team"
            }
          }

        return {
          success: true,
          data: result.role
        }
      })
    },

    async getTeamById(teamId) {
      return withDbTryCatch(async () => {
        const [result] = await db
          .select()
          .from(teamsTable)
          .where(eq(teamsTable.id, teamId))

        if (!result)
          return {
            success: false,
            error: { code: "NOT_FOUND", message: "Team not found" }
          }

        return {
          success: true,
          data: result
        }
      })
    },

    async createTeamInvite({ teamId }) {
      return withDbTryCatch(async () => {
        const [result] = await db
          .insert(teamInvitesTable)
          .values({ teamId })
          .returning()

        if (!result)
          return {
            success: false,
            error: {
              code: "SERVER_ERROR",
              message: "Failed to create team invite"
            }
          }

        return {
          success: true,
          data: result.code
        }
      })
    },

    async getTeamByInviteCode(code) {
      return withDbTryCatch(async () => {
        const invitationSq = db
          .select({ teamId: teamInvitesTable.teamId })
          .from(teamInvitesTable)
          .where(eq(teamInvitesTable.code, code))
          .limit(1)

        const [result] = await db
          .with(db.$with("invitation").as(invitationSq))
          .select()
          .from(teamsTable)
          .where(eq(teamsTable.id, invitationSq))

        if (!result)
          return {
            success: false,
            error: { code: "NOT_FOUND", message: "Invitation not found" }
          }

        return {
          success: true,
          data: result
        }
      })
    }
  }
}
