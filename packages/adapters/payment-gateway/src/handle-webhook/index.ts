import { createHmac } from "crypto"

import { PaymentGateway } from "@repo/domain/adapters"
import { recordPurchase } from "@repo/domain/use-cases/credits/record-credit-purchase"

import { PAYSTACK_SECRET } from "../env"

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
  const reference = body.data.reference

  if (typeof reference !== "string")
    return {
      success: false,
      error: { code: "NOT_ALLOWED", message: "Malformed request: no reference" }
    }

  // Record payment
  const result = await recordPurchase(
    { reference },
    { database: databaseAdapter }
  )
  if (!result?.success) return result

  return { success: true, data: undefined }
}
