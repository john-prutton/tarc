import { getCreditPricingOptions } from ".."
import { Database, PaymentGateway } from "../../../adapters"
import { User } from "../../../entities"
import { AsyncTaskResult } from "../../../types"

type Dependencies = {
  paymentGateway: PaymentGateway.Repository
  database: Database.Repository
}

type Inputs = {
  userId: User.Entity["id"]
  pricingOption: number
}

export async function initializeOrder(
  { pricingOption, userId }: Inputs,
  { paymentGateway, database }: Dependencies
): AsyncTaskResult<{ checkoutUrl: string; reference: string }> {
  // Identify user
  const getUserResult = await database.user.getById(userId)
  if (!getUserResult.success) return getUserResult

  // Identify pricing option to purchase
  const pricingOptions = await getCreditPricingOptions()
  const option = pricingOptions.at(pricingOption)
  if (!option)
    return {
      success: false,
      error: {
        code: "NOT_FOUND",
        message: "The requested pricing option doesn't exist"
      }
    }

  // Get price and credits
  const price = option.price
  const credits = option.price * option.creditMultiplier

  // Make call to payment gateway to initialize payment
  const initializePaymentResult = await paymentGateway.initializePayment({
    price,
    meta: { userId, credits },
    callback_url: "/purchase-credits/success"
  })
  if (!initializePaymentResult.success) return initializePaymentResult

  // Store order in the database
  const storeResult = await database.order.createNewOrder({
    userId,
    reference: initializePaymentResult.data.reference,
    credits,
    price
  })
  if (!storeResult.success) return storeResult

  return { success: true, data: initializePaymentResult.data }
}
