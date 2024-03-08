import type { PaymentGateway } from "@repo/domain/adapters"

import { initializePayment } from "./initialize-payment"

export const paymentGateway: PaymentGateway.Repository = {
  initializePayment
}
