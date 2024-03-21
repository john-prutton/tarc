import { eq } from "drizzle-orm"

import { User } from "@repo/domain/entities"

import { DatabaseRepository } from "../../db"
import { usersTable } from "../../schema"

export function createUserRepository(db: DatabaseRepository): User.Repository {
  return {
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
    },

    async getById(id) {
      try {
        const [user] = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.id, id))
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
    },

    async setCredits(userId, credits) {
      try {
        const result = await db
          .update(usersTable)
          .set({ credits })
          .where(eq(usersTable.id, userId))

        if (result.rowsAffected !== 1)
          return {
            success: false,
            error: {
              code: "SERVER_ERROR",
              message: "Something went wrong updating user's credits"
            }
          }

        return {
          success: true,
          data: undefined
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
