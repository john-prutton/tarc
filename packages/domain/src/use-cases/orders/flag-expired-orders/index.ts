import { Database } from "../../../adapters"

type Inputs = {}
type Dependencies = {
  db: Database.Repository
}

export async function flagExpiredOrders({}: Inputs, { db }: Dependencies) {
  return db.order.updateExpiredOrders(new Date())
}
