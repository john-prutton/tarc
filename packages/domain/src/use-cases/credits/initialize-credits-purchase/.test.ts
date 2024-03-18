import { initializeCreditPurchase } from "."
import { mockDatabaseRepository, mockPaymentGateway } from "../../../__mocks__"
import { Order } from "../../../entities"

jest.mock("../get-credit-pricing-options", () => ({
  getCreditPricingOptions: jest
    .fn()
    .mockResolvedValue([{ price: 100, creditMultiplier: 10 }])
}))

const mockedPaymentGateway = mockPaymentGateway()
const mockedDatabase = mockDatabaseRepository()

describe("initializeCreditPurchase", () => {
  it("should return an error if the user is not found", async () => {
    jest.spyOn(mockedDatabase.user, "getById").mockResolvedValueOnce({
      success: false,
      error: { code: "NOT_FOUND", message: "test-message" }
    })
    expect(
      await initializeCreditPurchase(
        {
          userId: "non-existant",
          pricingOption: 0
        },
        {
          database: mockedDatabase,
          paymentGateway: mockedPaymentGateway
        }
      )
    ).toEqual({
      success: false,
      error: { code: "NOT_FOUND", message: "test-message" }
    })
  })

  it("should return an error if the pricing option is not found", async () => {
    jest.spyOn(mockedDatabase.user, "getById").mockResolvedValueOnce({
      success: true,
      data: {
        id: "test-user-id",
        username: "test-user-name",
        hashedPassword: "test-hashed-password",
        credits: 100
      }
    })
    const result = await initializeCreditPurchase(
      { userId: "user123", pricingOption: 1 },
      { paymentGateway: mockedPaymentGateway, database: mockedDatabase }
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
    jest.spyOn(mockedDatabase.user, "getById").mockResolvedValueOnce({
      success: true,
      data: {
        id: "test-user-id",
        username: "test-user-name",
        hashedPassword: "test-hashed-password",
        credits: 100
      }
    })

    jest
      .spyOn(mockedPaymentGateway, "initializePayment")
      .mockResolvedValueOnce({
        success: false,
        error: { code: "FETCH_ERROR", message: "Payment initialization failed" }
      })

    const result = await initializeCreditPurchase(
      { userId: "user123", pricingOption: 0 },
      { paymentGateway: mockedPaymentGateway, database: mockedDatabase }
    )

    expect(result).toEqual({
      success: false,
      error: { code: "FETCH_ERROR", message: "Payment initialization failed" }
    })
  })

  it("should return if it cant save the order to the database", async () => {
    jest.spyOn(mockedPaymentGateway, "initializePayment").mockResolvedValue({
      success: true,
      data: { checkoutUrl: "https://example.com/checkout", reference: "ref123" }
    })

    jest.spyOn(mockedDatabase.user, "getById").mockResolvedValueOnce({
      success: true,
      data: {
        id: "test-user-id",
        username: "test-user-name",
        hashedPassword: "test-hashed-password",
        credits: 100
      }
    })

    jest.spyOn(mockedDatabase.order, "createNewOrder").mockResolvedValueOnce({
      success: false,
      error: { code: "SERVER_ERROR", message: "test-message" }
    })

    const result = await initializeCreditPurchase(
      { userId: "user123", pricingOption: 0 },
      { paymentGateway: mockedPaymentGateway, database: mockedDatabase }
    )

    expect(result).toEqual({
      success: false,
      error: { code: "SERVER_ERROR", message: "test-message" }
    })
  })

  it("should return the checkout URL and reference if the payment gateway initialization is successful", async () => {
    jest.spyOn(mockedPaymentGateway, "initializePayment").mockResolvedValue({
      success: true,
      data: { checkoutUrl: "https://example.com/checkout", reference: "ref123" }
    })

    jest.spyOn(mockedDatabase.user, "getById").mockResolvedValueOnce({
      success: true,
      data: {
        id: "test-user-id",
        username: "test-user-name",
        hashedPassword: "test-hashed-password",
        credits: 100
      }
    })

    const createOrderMock = jest
      .spyOn(mockedDatabase.order, "createNewOrder")
      .mockResolvedValueOnce({
        success: true,
        data: undefined
      })

    const result = await initializeCreditPurchase(
      { userId: "test-user-id", pricingOption: 0 },
      { paymentGateway: mockedPaymentGateway, database: mockedDatabase }
    )

    expect(result).toEqual({
      success: true,
      data: { checkoutUrl: "https://example.com/checkout", reference: "ref123" }
    })

    expect(createOrderMock).toHaveBeenLastCalledWith<[Order.NewEntity]>({
      userId: "test-user-id",
      reference: "ref123",
      price: 100,
      credits: 1000
    })
  })
})
