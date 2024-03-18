import { recordPurchase } from "."
import { mockDatabaseRepository } from "../../../__mocks__"

describe("recordPurchase", () => {
  const database = mockDatabaseRepository()

  it("should fail: order not found", async () => {
    // mock order get
    jest.spyOn(database.order, "getOrderByReference").mockResolvedValueOnce({
      success: false,
      error: { code: "NOT_FOUND", message: "test-not-found" }
    })

    const result = await recordPurchase(
      { reference: "fake-reference" },
      { database }
    )

    expect(result).toEqual({
      success: false,
      error: { code: "NOT_FOUND", message: "test-not-found" }
    })
  })

  it("should fail: cant find user", async () => {
    // set up mocks
    const fakeOrder = {
      createdAt: new Date(1),
      paidAt: null,
      credits: 100,
      price: 100_00,
      reference: "test-reference",
      status: "pending" as const,
      userId: "non-existent-user-id"
    }

    jest.spyOn(database.order, "getOrderByReference").mockResolvedValueOnce({
      success: true,
      data: fakeOrder
    })

    jest.spyOn(database.user, "getById").mockResolvedValueOnce({
      success: false,
      error: {
        code: "NOT_FOUND",
        message: "test-not-found"
      }
    })

    // try
    const result = await recordPurchase(
      { reference: fakeOrder.reference },
      { database }
    )

    // expect
    expect(result).toEqual({
      success: false,
      error: { code: "NOT_FOUND", message: "test-not-found" }
    })
  })

  it("should fail: cant update credits", async () => {
    // set up mocks
    const fakeOrder = {
      createdAt: new Date(1),
      paidAt: null,
      credits: 100,
      price: 100_00,
      reference: "test-reference",
      status: "pending" as const,
      userId: "non-existent-user-id"
    }

    jest.spyOn(database.order, "getOrderByReference").mockResolvedValueOnce({
      success: true,
      data: fakeOrder
    })

    const fakeUser = {
      id: "test-user-id",
      username: "test-user-name",
      hashedPassword: "test-hashed-password",
      credits: 100
    }

    jest.spyOn(database.user, "getById").mockResolvedValueOnce({
      success: true,
      data: fakeUser
    })

    jest.spyOn(database.user, "setCredits").mockResolvedValueOnce({
      success: false,
      error: { code: "SERVER_ERROR", message: "test-error" }
    })

    // try
    const result = await recordPurchase(
      { reference: fakeOrder.reference },
      { database }
    )

    // expect
    expect(result).toEqual({
      success: false,
      error: { code: "SERVER_ERROR", message: "test-error" }
    })
  })

  it("should fail: cant update order status", async () => {
    // set up mocks
    const fakeOrder = {
      createdAt: new Date(1),
      paidAt: null,
      credits: 100,
      price: 100_00,
      reference: "test-reference",
      status: "pending" as const,
      userId: "non-existent-user-id"
    }

    jest.spyOn(database.order, "getOrderByReference").mockResolvedValueOnce({
      success: true,
      data: fakeOrder
    })

    const fakeUser = {
      id: "test-user-id",
      username: "test-user-name",
      hashedPassword: "test-hashed-password",
      credits: 100
    }

    jest.spyOn(database.user, "getById").mockResolvedValueOnce({
      success: true,
      data: fakeUser
    })

    jest.spyOn(database.user, "setCredits").mockResolvedValueOnce({
      success: true,
      data: undefined
    })

    jest.spyOn(database.order, "updateOrderStatus").mockResolvedValueOnce({
      success: false,
      error: { code: "SERVER_ERROR", message: "test-error" }
    })

    // try
    const result = await recordPurchase(
      { reference: fakeOrder.reference },
      { database }
    )

    // expect
    expect(result).toEqual({
      success: false,
      error: { code: "SERVER_ERROR", message: "test-error" }
    })
  })

  it("should pass", async () => {
    // set up mocks
    const fakeUser = {
      id: "test-user-id",
      username: "test-user-name",
      hashedPassword: "test-hashed-password",
      credits: 100
    }

    jest.spyOn(database.user, "getById").mockResolvedValueOnce({
      success: true,
      data: fakeUser
    })

    const fakeOrder = {
      createdAt: new Date(1),
      paidAt: null,
      credits: 100,
      price: 100_00,
      reference: "test-reference",
      status: "pending" as const,
      userId: fakeUser.id
    }

    jest.spyOn(database.order, "getOrderByReference").mockResolvedValueOnce({
      success: true,
      data: fakeOrder
    })

    const setCreditsMock = jest
      .spyOn(database.user, "setCredits")
      .mockResolvedValueOnce({
        success: true,
        data: undefined
      })

    const updateOrderStatusMock = jest
      .spyOn(database.order, "updateOrderStatus")
      .mockResolvedValueOnce({
        success: true,
        data: undefined
      })

    // try
    const result = await recordPurchase(
      { reference: fakeOrder.reference },
      { database }
    )

    // expect
    expect(result).toEqual({
      success: true,
      data: undefined
    })

    expect(setCreditsMock).toHaveBeenLastCalledWith(
      fakeUser.id,
      fakeUser.credits + fakeOrder.credits
    )

    expect(updateOrderStatusMock).toHaveBeenLastCalledWith(
      fakeOrder.reference,
      "paid"
    )
  })
})
