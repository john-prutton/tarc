import { initializeCreditPurchase } from "."
import { mockPaymentGateway } from "../../../__mocks__"

jest.mock("../get-credit-pricing-options", () => ({
  getCreditPricingOptions: jest
    .fn()
    .mockResolvedValue([{ price: 100, creditMultiplier: 10 }])
}))

const mockedPaymentGateway = mockPaymentGateway()

describe("initializeCreditPurchase", () => {
  it("should return an error if the pricing option is not found", async () => {
    const result = await initializeCreditPurchase(
      { userId: "user123", pricingOption: 1 },
      { paymentGateway: mockedPaymentGateway }
    )

    expect(result).toEqual({
      success: false,
      error: {
        code: "NOT_FOUND",
        message: "The requested pricing option doesn't exist"
      }
    })
  })

  it("should return an error if the payment gateway initialization fails", async () => {
    jest
      .spyOn(mockedPaymentGateway, "initializePayment")
      .mockResolvedValueOnce({
        success: false,
        error: { code: "FETCH_ERROR", message: "Payment initialization failed" }
      })

    const result = await initializeCreditPurchase(
      { userId: "user123", pricingOption: 0 },
      { paymentGateway: mockedPaymentGateway }
    )

    expect(result).toEqual({
      success: false,
      error: { code: "FETCH_ERROR", message: "Payment initialization failed" }
    })
  })

  it("should return the checkout URL and reference if the payment gateway initialization is successful", async () => {
    jest.spyOn(mockedPaymentGateway, "initializePayment").mockResolvedValue({
      success: true,
      data: { checkoutUrl: "https://example.com/checkout", reference: "ref123" }
    })

    const result = await initializeCreditPurchase(
      { userId: "user123", pricingOption: 0 },
      { paymentGateway: mockedPaymentGateway }
    )

    expect(result).toEqual({
      success: true,
      data: { checkoutUrl: "https://example.com/checkout", reference: "ref123" }
    })
  })
})
