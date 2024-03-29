import { mockDatabaseRepository } from "@repo/domain/__mocks__"
import { recordOrder } from "@repo/domain/use-cases/orders/record-order"

import { handleWebhook } from "./index"

// Mocks
jest.mock("crypto", () => ({
  createHmac: jest.fn().mockReturnValue({
    update: jest.fn().mockReturnThis(),
    digest: jest.fn().mockReturnValue("mocked_hash")
  })
}))

jest.mock("@repo/domain/use-cases/orders/record-order", () => ({
  recordOrder: jest.fn().mockResolvedValue({ success: true, data: undefined })
}))

const mockRequest = (body: any, signature: string): Request => {
  return {
    json: jest.fn().mockResolvedValue(body),
    headers: {
      get: jest.fn((headerName: string) => {
        if (headerName === "x-paystack-signature") {
          return signature
        }
        return null
      })
    }
  } as unknown as Request // Cast to Request type
}

describe("handleWebhook", () => {
  it("should error: hash is invalid", async () => {
    const req = mockRequest({}, "invalid_hash")
    const db = mockDatabaseRepository()

    const result = await handleWebhook({ req }, { databaseAdapter: db })

    expect(result).toEqual({
      success: false,
      error: { code: "SERVER_ERROR", message: "Invalid hash" }
    })
  })

  it("should error: unhandled events", async () => {
    const body = { event: "unhandled_event" }
    const req = mockRequest(body, "mocked_hash")
    const result = await handleWebhook(
      { req },
      { databaseAdapter: mockDatabaseRepository() }
    )

    expect(result).toEqual({
      success: false,
      error: {
        code: "NOT_ALLOWED",
        message: "Unhandled event: unhandled_event"
      }
    })
  })

  it("should error: no reference", async () => {
    const body = {
      event: "charge.success",
      data: {
        reference: undefined
      }
    }
    const req = mockRequest(body, "mocked_hash")

    const result = await handleWebhook(
      { req },
      { databaseAdapter: mockDatabaseRepository() }
    )

    expect(result).toEqual({
      success: false,
      error: {
        code: "NOT_ALLOWED",
        message: "Malformed request: no reference"
      }
    })
  })

  it("should: successfully call use-case", async () => {
    const body = {
      event: "charge.success",
      data: {
        reference: "test-ref"
      }
    }

    const req = mockRequest(body, "mocked_hash")
    const db = mockDatabaseRepository()

    const result = await handleWebhook({ req }, { databaseAdapter: db })

    expect(result).toEqual({ success: true })
    expect(recordOrder).toHaveBeenCalledWith(
      {
        reference: body.data.reference
      },
      { database: db }
    )
  })
})
