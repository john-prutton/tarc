import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

import { ORDER_STATUSES } from "@repo/domain/entities/order"

import { usersTable } from "."

export const ordersTable = sqliteTable("orders", {
  reference: text("reference").primaryKey().notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id),
  status: text("status", { enum: ORDER_STATUSES }).notNull().default("pending"),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
  paidAt: integer("paid_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
  price: integer("price_in_cents").notNull(),
  credits: integer("credits_rewarded").notNull()
})
