import { createHmac } from "crypto"

import { mockDatabaseRepository } from "@repo/domain/__mocks__"
import { Database } from "@repo/domain/adapters"
import { User } from "@repo/domain/entities"
import { TaskResult } from "@repo/domain/types"

import { PAYSTACK_SECRET } from "../env"
import { handleWebhook } from "./index"

// Mocks
jest.mock("crypto", () => ({
  createHmac: jest.fn().mockReturnValue({
    update: jest.fn().mockReturnThis(),
    digest: jest.fn().mockReturnValue("mocked_hash")
  })
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
  it("should return an error if the hash is invalid", async () => {
    const req = mockRequest({}, "invalid_hash")
    const db = mockDatabaseRepository()

    const result = await handleWebhook({ req }, { databaseAdapter: db })

    expect(result).toEqual({
      success: false,
      error: { code: "SERVER_ERROR", message: "Invalid hash" }
    })
  })

  it("should return an error for unhandled events", async () => {
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

  it("should return an error if metadata is malformed", async () => {
    const body = {
      event: "charge.success",
      data: {
        metadata: {
          userId: 123, // should be a string
          credits: "10" // should be a number
        }
      }
    }
    const req = mockRequest(body, "mocked_hash")

    const result = await handleWebhook(
      { req },
      { databaseAdapter: mockDatabaseRepository() }
    )

    expect(result).toEqual({
      success: false,
      error: { code: "NOT_ALLOWED", message: "Malformed metadata" }
    })
  })

  it("should fail if user not found", async () => {
    const body = {
      event: "charge.success",
      data: {
        metadata: {
          userId: "fakeUser.id",
          credits: 10
        }
      }
    }
    const userNotFoundError = {
      success: false,
      error: { code: "NOT_FOUND", message: "test-error" }
    } as TaskResult<User.Entity>

    const req = mockRequest(body, "mocked_hash")

    const db = mockDatabaseRepository()
    jest.spyOn(db.user, "getById").mockResolvedValueOnce(userNotFoundError)

    const result = await handleWebhook({ req }, { databaseAdapter: db })

    expect(result).toEqual(userNotFoundError)
  })

  it("should fail if setCredits fails", async () => {
    const fakeUser: User.Entity = {
      credits: 100,
      id: "fake-user-id",
      hashedPassword: "fake-hashed-password",
      username: "fake-user-name"
    }
    const body = {
      event: "charge.success",
      data: {
        metadata: {
          userId: fakeUser.id,
          credits: 10
        }
      }
    }
    const setCreditsError: TaskResult<void> = {
      success: false,
      error: { code: "SERVER_ERROR", message: "test-error" }
    }

    const req = mockRequest(body, "mocked_hash")
    const db = mockDatabaseRepository()
    jest
      .spyOn(db.user, "getById")
      .mockResolvedValueOnce({ success: true, data: fakeUser })
    jest.spyOn(db.user, "setCredits").mockResolvedValueOnce(setCreditsError)

    const result = await handleWebhook({ req }, { databaseAdapter: db })

    expect(result).toEqual(setCreditsError)
  })

  it("should update user's credits on successful charge", async () => {
    const fakeUser: User.Entity = {
      credits: 100,
      id: "fake-user-id",
      hashedPassword: "fake-hashed-password",
      username: "fake-user-name"
    }
    const body = {
      event: "charge.success",
      data: {
        metadata: {
          userId: fakeUser.id,
          credits: 10
        }
      }
    }

    const req = mockRequest(body, "mocked_hash")
    const db = mockDatabaseRepository()
    jest
      .spyOn(db.user, "getById")
      .mockResolvedValueOnce({ success: true, data: fakeUser })
    jest
      .spyOn(db.user, "setCredits")
      .mockResolvedValueOnce({ success: true, data: undefined })

    const result = await handleWebhook({ req }, { databaseAdapter: db })

    expect(result).toEqual({ success: true })
    expect(db.user.setCredits).toHaveBeenCalledWith(
      fakeUser.id,
      fakeUser.credits + body.data.metadata.credits
    )
  })
})
