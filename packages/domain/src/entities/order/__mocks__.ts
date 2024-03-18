import { Order } from ".."

export const mockOrderRepository = (): Order.Repository => ({
  createNewOrder: jest.fn(),
  getOrderByReference: jest.fn(),
  updateOrderStatus: jest.fn()
})
