import { Database } from "@repo/domain/adapters"

import { createRepository } from "../.."
import { DatabaseRepository } from "../../db"

export function createTransactionRepository(
  db: DatabaseRepository
): Database.Repository["transaction"] {
  return async (txFn) => {
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
}
