import { signOut } from "."
import { mockAuthAdapter } from "../../adapters/authentication.mocks"
import { Session } from "../../entities"
import { TaskResult } from "../../types"

describe("signOut function", () => {
  /*
   * Setup mocks
   */
  const mockedAuthAdapter = mockAuthAdapter()

  // setup a valid session id
  const validSessionId: Session.Entity["id"] = "testSessionId"

  describe("when called with a valid session id", () => {
    // mock that the session was invalidated successfully
    jest.spyOn(mockedAuthAdapter, "invalidateSession").mockResolvedValueOnce({
      success: true,
      data: undefined
    })

    // mock that a blank session cookie was created
    jest
      .spyOn(mockedAuthAdapter, "createBlankSessionCookie")
      .mockReturnValueOnce({
        name: "authCookie",
        value: ""
      })

    test("should return a successful result with a blank session cookie", async () => {
      const res = await signOut(validSessionId, mockedAuthAdapter)

      expect(res).toEqual<TaskResult<Session.Cookie>>({
        success: true,
        data: { name: "authCookie", value: "" }
      })
    })

    test("should invalidate the session in the database", () => {
      expect(mockedAuthAdapter.invalidateSession).toHaveBeenCalledWith<
        [string]
      >(validSessionId)
    })

    test("should create a blank session cookie", () => {
      expect(mockedAuthAdapter.createBlankSessionCookie).toHaveBeenCalledWith()
    })
  })

  describe("when there is an error invalidating the session", () => {
    // mock that the session invalidation failed
    jest.spyOn(mockedAuthAdapter, "invalidateSession").mockResolvedValueOnce({
      success: false,
      error: { code: "SERVER_ERROR", message: "testErrorMessage" }
    })

    test("should return an error result if the session invalidation fails", async () => {
      const res = await signOut(validSessionId, mockedAuthAdapter)

      expect(res).toEqual<TaskResult<Session.Cookie>>({
        success: false,
        error: {
          code: "SERVER_ERROR",
          message: "testErrorMessage"
        }
      })
    })
  })
})
