import { createHmac } from "crypto"

import { Database, PaymentGateway } from "@repo/domain/adapters"

import { PAYSTACK_SECRET } from "./env"

export const handleWebhook: PaymentGateway.Repository["handleWebhook"] = async (
  { req },
  { databaseAdapter }
) => {
  // Validate event
  const body = await req.json()
  const hash = createHmac("sha512", PAYSTACK_SECRET)
    .update(JSON.stringify(body))
    .digest("hex")

  if (hash !== req.headers.get("x-paystack-signature"))
    return {
      success: false,
      error: { code: "SERVER_ERROR", message: "Invalid hash" }
    }

  // Check event type
  const event = body.event
  if (event !== "charge.success")
    return {
      success: false,
      error: {
        code: "NOT_ALLOWED",
        message: "Unhandled event: " + event
      }
    }

  // Get metadata
  const userId = body.data.metadata.userId
  const credits = +body.data.metadata.credits

  if (typeof userId !== "string" || typeof credits !== "number")
    return {
      success: false,
      error: { code: "NOT_ALLOWED", message: "Malformed metadata" }
    }

  // Update users credits
  const updateCreditsResult = await databaseAdapter.transaction(
    async (databaseAdapter) => {
      // Find user
      const userResult = await databaseAdapter.user.getById(userId)
      if (!userResult.success) return userResult

      const userCredits = userResult.data.credits

      // Set credits
      const updateResult = await databaseAdapter.user.setCredits(
        userId,
        userCredits + credits
      )

      return updateResult
    }
  )

  return updateCreditsResult
}
