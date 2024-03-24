import { describeDatabaseTest } from "../../helpers"
import { ordersTable } from "../../schema"

describeDatabaseTest("orders", (db, repository) => {
  describe("update expired orders", () => {
    test("correctly expires orders", async () => {
      // seed
      const fakeUser = {
        id: "id",
        username: "uname",
        hashedPassword: "pass",
        credits: 1
      }
      await repository.user.create(fakeUser)

      await db.insert(ordersTable).values({
        userId: fakeUser.id,
        reference: "ref1",
        credits: 1,
        price: 1,
        createdAt: new Date(Date.now() + 1000 * 1 * 60 * 60 * 5)
      })
      await db.insert(ordersTable).values({
        userId: fakeUser.id,
        reference: "ref2",
        credits: 1,
        price: 1,
        createdAt: new Date(Date.now() - 1000 * 1 * 60 * 60 * 5)
      })
      await db.insert(ordersTable).values({
        userId: fakeUser.id,
        reference: "ref3",
        credits: 1,
        price: 1,
        createdAt: new Date(Date.now() - 1000 * 1 * 60 * 60 * 5)
      })

      // test
      expect(
        // @ts-expect-error
        (await repository.order.updateExpiredOrders(new Date())).data
      ).toBe(2)

      expect(
        // @ts-expect-error
        (await repository.order.getOrderByReference("ref1")).data.status
      ).toEqual("pending")

      expect(
        // @ts-expect-error
        (await repository.order.getOrderByReference("ref2")).data.status
      ).toEqual("abandoned")
    })
  })
})
