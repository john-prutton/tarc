import { signIn } from "."
import { mockAuthAdapter } from "../../adapters/authentication.mocks"
import { Session, User } from "../../entities"
import { mockUserRepository } from "../../entities/user/__mocks__"
import { TaskResult } from "../../types"

describe("signIn function", () => {
  describe("when called with valid login details", () => {
    /*
     * setup mocks
     */
    const mockedUserRepository = mockUserRepository()
    const mockedAuthAdapter = mockAuthAdapter()

    // setup valid login details
    const validLoginDetails: User.NewEntity = {
      username: "testUsername",
      plainPassword: "testPassword"
    }

    // mock that this user exists
    jest.spyOn(mockedUserRepository, "getByUsername").mockResolvedValueOnce({
      success: true,
      data: {
        id: "testId",
        username: "testUsername",
        hashedPassword: "testHashedPassword",
        credits: 100
      }
    })

    // mock that this password is correct
    jest.spyOn(mockedAuthAdapter, "verifyPassword").mockResolvedValueOnce(true)

    // mock that a session was created
    jest.spyOn(mockedAuthAdapter, "createSession").mockResolvedValueOnce({
      success: true,
      data: { expiresAt: new Date(), id: "testSessionId", userId: "testId" }
    })

    // mock that a session cookie was created
    jest.spyOn(mockedAuthAdapter, "createSessionCookie").mockReturnValueOnce({
      name: "authCookie",
      value: "testSessionId"
    })

    /**
     * Run tests
     */
    test("should return a successful result with a session cookie if the user exists and the password is correct", async () => {
      const res = await signIn(
        validLoginDetails,
        mockedUserRepository,
        mockedAuthAdapter
      )

      expect(res).toEqual<TaskResult<Session.Cookie>>({
        success: true,
        data: { name: "authCookie", value: "testSessionId" }
      })
    })

    test("should verify the password using the authAdapter", () => {
      expect(mockedAuthAdapter.verifyPassword).toHaveBeenCalledWith<
        [string, string]
      >("testPassword", "testHashedPassword")
    })

    test("should create a session in the database for the user", () => {
      expect(mockedAuthAdapter.createSession).toHaveBeenCalledWith<[string]>(
        "testId"
      )
    })

    test("should create a session cookie from the session", () => {
      expect(mockedAuthAdapter.createSessionCookie).toHaveBeenCalledWith<
        [string]
      >("testSessionId")
    })
  })

  describe("when called with an invalid username", () => {
    /*
     * Setup mocks
     */
    const mockedUserRepository = mockUserRepository()
    const mockedAuthAdapter = mockAuthAdapter()

    // setup invalid login details
    const invalidLoginDetails: User.NewEntity = {
      username: "testUsername",
      plainPassword: "testPassword"
    }

    // mock that this doesn't user exists
    jest.spyOn(mockedUserRepository, "getByUsername").mockResolvedValueOnce({
      success: false,
      error: {
        code: "NOT_FOUND",
        message: "testMessage"
      }
    })

    /**
     * Run test
     */
    test("should return an error result if the user does not exist", async () => {
      const res = await signIn(
        invalidLoginDetails,
        mockedUserRepository,
        mockedAuthAdapter
      )

      expect(res).toEqual<TaskResult<Session.Cookie>>({
        success: false,
        error: {
          code: "NOT_FOUND",
          message: "testMessage"
        }
      })
    })
  })

  describe("when called with an invalid password", () => {
    /*
     * setup mocks
     */
    const mockedUserRepository = mockUserRepository()
    const mockedAuthAdapter = mockAuthAdapter()

    // setup valid login details
    const invalidLoginDetails: User.NewEntity = {
      username: "testUsername",
      plainPassword: "testPassword"
    }

    // mock that this user exists
    jest.spyOn(mockedUserRepository, "getByUsername").mockResolvedValueOnce({
      success: true,
      data: {
        id: "testId",
        username: "testUsername",
        hashedPassword: "testHashedPassword",
        credits: 100
      }
    })

    // mock that this password is incorrect
    jest.spyOn(mockedAuthAdapter, "verifyPassword").mockResolvedValueOnce(false)

    /**
     * Run test
     */
    test("should return an error result if the password is incorrect", async () => {
      const res = await signIn(
        invalidLoginDetails,
        mockedUserRepository,
        mockedAuthAdapter
      )

      expect(res).toEqual<TaskResult<Session.Cookie>>({
        success: false,
        error: {
          code: "NOT_ALLOWED",
          message: "Invalid password"
        }
      })
    })
  })

  describe("when there is an error creating the session in the database", () => {
    /*
     * setup mocks
     */
    const mockedUserRepository = mockUserRepository()
    const mockedAuthAdapter = mockAuthAdapter()

    // setup valid login details
    const validLoginDetails: User.NewEntity = {
      username: "testUsername",
      plainPassword: "testPassword"
    }

    // mock that this user exists
    jest.spyOn(mockedUserRepository, "getByUsername").mockResolvedValueOnce({
      success: true,
      data: {
        id: "testId",
        username: "testUsername",
        hashedPassword: "testHashedPassword",
        credits: 100
      }
    })

    // mock that this password is correct
    jest.spyOn(mockedAuthAdapter, "verifyPassword").mockResolvedValueOnce(true)

    // mock that a session was not created
    jest.spyOn(mockedAuthAdapter, "createSession").mockResolvedValueOnce({
      success: false,
      error: { code: "SERVER_ERROR", message: "testErrorMessage" }
    })

    /**
     * Run test
     */
    test("should return an error result if the session creation fails", async () => {
      const res = await signIn(
        validLoginDetails,
        mockedUserRepository,
        mockedAuthAdapter
      )

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
