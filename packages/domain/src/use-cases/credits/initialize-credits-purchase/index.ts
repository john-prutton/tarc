import { getCreditPricingOptions } from ".."
import { PaymentGateway } from "../../../adapters"
import { User } from "../../../entities"
import { AsyncTaskResult } from "../../../types"

type Dependencies = {
  paymentGateway: PaymentGateway.Repository
}

type Inputs = {
  userId: User.Entity["id"]
  pricingOption: number
}

export async function initializeCreditPurchase(
  { pricingOption, userId }: Inputs,
  { paymentGateway }: Dependencies
): AsyncTaskResult<{ checkoutUrl: string; reference: string }> {
  // Identify user: will do in transaction when i store reference

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
  const result = await paymentGateway.initializePayment({
    price,
    meta: { userId, credits },
    callback_url: "/purchase-credits/success"
  })

  return result
}
