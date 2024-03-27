"use server"

import { AsyncTaskResult } from "@repo/domain/types"
import {
  getCreditPricingOptions,
  initializeOrder
} from "@repo/domain/use-cases/orders"

import { databaseAdapter, paymentAdapter } from "@/lib/adapters"
import { withAuthedUser } from "@/lib/auth/utils"

export { getCreditPricingOptions }

export async function tryGeneratePurchaseLink({
  pricingOption
}: {
  pricingOption: number
}): AsyncTaskResult<{ checkoutUrl: string; reference: string }> {
  return withAuthedUser(async (user) =>
    // try initialize
    initializeOrder(
      { pricingOption, userId: user.id },
      { paymentGateway: paymentAdapter, database: databaseAdapter }
    )
  )
}
