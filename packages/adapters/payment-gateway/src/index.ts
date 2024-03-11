import type { PaymentGateway } from "@repo/domain/adapters"

import { handleWebhook } from "./handle-webhook"
import { initializePayment } from "./initialize-payment"

export const paymentGateway: PaymentGateway.Repository = {
  initializePayment,
  handleWebhook
}
