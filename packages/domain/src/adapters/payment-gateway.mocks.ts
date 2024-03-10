import { PaymentGateway } from "."

export function mockPaymentGateway() {
  const mock: PaymentGateway.Repository = {
    handleWebhook: jest.fn(),
    initializePayment: jest.fn()
  }
  return mock
}
