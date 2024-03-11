import { initializePayment } from "./index"

// Mocks
jest.mock("../helpers", () => ({
  paystackFetch: jest.fn()
}))

const paystackFetch = require("../helpers").paystackFetch as jest.Mock

describe("initializePayment", () => {
  it("should return an error if the fetch fails", async () => {
    paystackFetch.mockResolvedValue({ ok: false })
    const result = await initializePayment({
      price: 100,
      meta: {
        userId: "test-user-id",
        credits: 1000
      },
      callback_url: "/callback"
    })

    expect(result).toEqual({
      success: false,
      error: {
        code: "FETCH_ERROR",
        message: "Something went wrong while initializing the payment"
      }
    })
  })

  it("should return an error if the API response indicates failure", async () => {
    paystackFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ status: false, message: "Invalid request" })
    })
    const result = await initializePayment({
      price: 100,
      meta: {
        userId: "test-user-id",
        credits: 1000
      },
      callback_url: "/callback"
    })

    expect(result).toEqual({
      success: false,
      error: {
        code: "NOT_ALLOWED",
        message:
          "Something went wrong while initializing the payment: Invalid request"
      }
    })
  })

  describe("should error if checkout_url or reference is missing", () => {
    it("checkout_url", async () => {
      paystackFetch.mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({
            status: true,
            data: { reference: "" }
          })
      })
      const result = await initializePayment({
        price: 100,
        meta: {
          userId: "test-user-id",
          credits: 1000
        },
        callback_url: "/callback"
      })

      expect(result).toEqual({
        success: false,
        error: {
          code: "SERVER_ERROR",
          message: "Checkout url or reference not present"
        }
      })
    })

    it("reference", async () => {
      paystackFetch.mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({
            status: true,
            data: { reference: undefined, checkout_url: "test-ref" }
          })
      })
      const result = await initializePayment({
        price: 100,
        meta: {
          userId: "test-user-id",
          credits: 1000
        },
        callback_url: "/callback"
      })

      expect(result).toEqual({
        success: false,
        error: {
          code: "SERVER_ERROR",
          message: "Checkout url or reference not present"
        }
      })
    })
  })

  it("should return the checkout URL and reference on success", async () => {
    paystackFetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          status: true,
          data: {
            authorization_url: "https://checkout.url",
            reference: "ref123"
          }
        })
    })
    const result = await initializePayment({
      price: 100,
      meta: {
        userId: "test-user-id",
        credits: 1000
      },
      callback_url: "/callback"
    })

    expect(result).toEqual({
      success: true,
      data: {
        checkoutUrl: "https://checkout.url",
        reference: "ref123"
      }
    })
  })
})
