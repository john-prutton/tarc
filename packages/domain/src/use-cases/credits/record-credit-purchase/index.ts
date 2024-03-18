import { Database } from "../../../adapters"

type Inputs = {
  reference: string
}
type Dependencies = {
  database: Database.Repository
}

export async function recordPurchase(
  { reference }: Inputs,
  { database }: Dependencies
) {
  const updateCreditsResult = await database.transaction(async (database) => {
    // Find order
    const orderResult = await database.order.getOrderByReference(reference)
    if (!orderResult.success) return orderResult
    const order = orderResult.data
    const userId = order.userId
    const purchasedCredits = order.credits

    // Find user
    const userResult = await database.user.getById(userId)
    if (!userResult.success) return userResult
    const userCredits = userResult.data.credits

    // Set credits
    const updateResult = await database.user.setCredits(
      userId,
      userCredits + purchasedCredits
    )
    if (!updateResult.success) return updateResult

    // Flag payment as complete
    const updateOrderResult = await database.order.updateOrderStatus(
      reference,
      "paid"
    )
    if (!updateOrderResult.success) return updateOrderResult

    // successfully return
    return { success: true, data: undefined }
  })

  return updateCreditsResult
}
