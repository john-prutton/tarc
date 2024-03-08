"use server"

import { AsyncTaskResult } from "@repo/domain/types"
import { getCreditPricingOptions } from "@repo/domain/use-cases/credits"

import { tryGetAuthedUser } from "@/lib/auth/util"

export { getCreditPricingOptions }

export async function tryGeneratePurchaseLink(inputs: {
  priceOption: number
}): AsyncTaskResult<string> {
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

  console.log("generating purchase...")
  return { success: true, data: "url-to-pay" }
}
