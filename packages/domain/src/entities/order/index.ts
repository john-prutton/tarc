import { User } from ".."
import { AsyncTaskResult } from "../../types"

export const ORDER_STATUSES = ["pending", "paid", "abandoned"] as const
export type Entity = {
  userId: User.Entity["id"]
  reference: string
  createdAt: Date
  paidAt: Date
  status: (typeof ORDER_STATUSES)[number]
  price: number
  credits: number
}

export type NewEntity = Pick<
  Entity,
  "userId" | "reference" | "price" | "credits"
>

export type Repository = {
  createNewOrder: (newOrder: NewEntity) => AsyncTaskResult<void>
  getOrderByReference: (newOrder: Entity) => AsyncTaskResult<Entity>
  updateOrderStatus: (newStatus: Entity["status"]) => AsyncTaskResult<void>
}
