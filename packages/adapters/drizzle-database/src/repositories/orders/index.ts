import { and, eq, inArray, lte } from "drizzle-orm"

import type { Order } from "@repo/domain/entities"

import type { DatabaseRepository } from "../../db"
import { ordersTable } from "../../schema"

export function createOrderRepository(
  db: DatabaseRepository
): Order.Repository {
  return {
    async createNewOrder(newOrder) {
      try {
        const result = await db.insert(ordersTable).values(newOrder)

        if (result.rowsAffected !== 1)
          return {
            success: false,
            error: {
              code: "SERVER_ERROR",
              message: "Failed to create new order"
            }
          }
        else
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
    },

    async getOrderByReference(reference) {
      try {
        const [result] = await db
          .select()
          .from(ordersTable)
          .where(eq(ordersTable.reference, reference))
          .limit(1)

        if (!result)
          return {
            success: false,
            error: {
              code: "NOT_FOUND",
              message: "No order found with that reference"
            }
          }
        else
          return {
            success: true,
            data: result
          }
      } catch (error) {
        return {
          success: false,
          error: { code: "SERVER_ERROR", message: `DB error of: ${error}` }
        }
      }
    },

    async updateOrderStatus(reference, newStatus) {
      try {
        const result = await db
          .update(ordersTable)
          .set({
            status: newStatus,
            paidAt: newStatus === "paid" ? new Date() : null
          })
          .where(eq(ordersTable.reference, reference))

        if (result.rowsAffected !== 1)
          return {
            success: false,
            error: {
              code: "SERVER_ERROR",
              message: "Failed to update order status"
            }
          }
        else
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
    },

    async updateExpiredOrders(expiryDate) {
      const expiredOrders = db
        .select({ reference: ordersTable.reference })
        .from(ordersTable)
        .where(
          and(
            lte(ordersTable.createdAt, expiryDate),
            eq(ordersTable.status, "pending")
          )
        )

      const updateQuery = db
        .with(db.$with("expired_orders").as(expiredOrders))
        .update(ordersTable)
        .set({ status: "abandoned" })
        .where(inArray(ordersTable.reference, expiredOrders))

      const results = await updateQuery

      return {
        success: true,
        data: results.rowsAffected
      }
    }
  }
}
