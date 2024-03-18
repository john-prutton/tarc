"use server"

import { AsyncTaskResult } from "@repo/domain/types"
import {
  getCreditPricingOptions,
  initializeCreditPurchase
} from "@repo/domain/use-cases/credits"

import { databaseAdapter, paymentAdapter } from "@/lib/adapters"
import { tryGetAuthedUser } from "@/lib/auth/util"

export { getCreditPricingOptions }

export async function tryGeneratePurchaseLink({
  pricingOption
}: {
  pricingOption: number
}): AsyncTaskResult<{ checkoutUrl: string; reference: string }> {
  // auth check
  const user = await tryGetAuthedUser()
  if (!user)
    return {
      success: false,
      error: {
        code: "NOT_ALLOWED",
        message: "You must be logged in to do this"
      }
    }

  // try initialize
  return await initializeCreditPurchase(
    { pricingOption, userId: user.id },
    { paymentGateway: paymentAdapter, database: databaseAdapter }
  )
}
