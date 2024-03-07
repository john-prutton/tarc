import { signUp } from "."
import { mockAuthAdapter } from "../../adapters/authentication.mocks"
import { Session, User } from "../../entities"
import { mockUserRepository } from "../../entities/user/__mocks__"
import { TaskResult } from "../../types"

describe("signUp function", () => {
  /*
   * Setup mocks
   */
  const mockedUserRepository = mockUserRepository()
  const mockedAuthAdapter = mockAuthAdapter()

  // setup new user details
  const newUserDetails: User.NewEntity = {
    username: "newUsername",
    plainPassword: "newPassword"
  }

  describe("when called with a new user's details", () => {
    // mock that the username does not exist
    jest.spyOn(mockedUserRepository, "getByUsername").mockResolvedValueOnce({
      success: false,
      error: { code: "NOT_FOUND", message: "User not found." }
    })

    // mock password hashing and user id generation
    jest
      .spyOn(mockedAuthAdapter, "hashPassword")
      .mockResolvedValueOnce("hashedPassword")
    jest.spyOn(mockedAuthAdapter, "generateId").mockReturnValueOnce("newUserId")

    // mock that the user was created successfully
    jest.spyOn(mockedUserRepository, "create").mockResolvedValueOnce({
      success: true,
      data: undefined
    })

    // mock that a session was created
    jest.spyOn(mockedAuthAdapter, "createSession").mockResolvedValueOnce({
      success: true,
      data: { expiresAt: new Date(), id: "newSessionId", userId: "newUserId" }
    })

    // mock that a session cookie was created
    jest.spyOn(mockedAuthAdapter, "createSessionCookie").mockReturnValueOnce({
      name: "authCookie",
      value: "newSessionId"
    })

    test("should return a successful result with a session cookie", async () => {
      const res = await signUp(
        newUserDetails,
        mockedUserRepository,
        mockedAuthAdapter
      )

      expect(res).toEqual<TaskResult<Session.Cookie>>({
        success: true,
        data: { name: "authCookie", value: "newSessionId" }
      })
    })

    test("should check if the username already exists", () => {
      expect(mockedUserRepository.getByUsername).toHaveBeenCalledWith<[string]>(
        newUserDetails.username
      )
    })

    test("should hash the user's password", () => {
      expect(mockedAuthAdapter.hashPassword).toHaveBeenCalledWith<[string]>(
        newUserDetails.plainPassword
      )
    })

    test("should create a new user in the database", () => {
      expect(mockedUserRepository.create).toHaveBeenCalledWith<[User.Entity]>({
        id: "newUserId",
        username: newUserDetails.username,
        hashedPassword: "hashedPassword",
        credits: 100
      })
    })

    test("should create a session in the database for the new user", () => {
      expect(mockedAuthAdapter.createSession).toHaveBeenCalledWith<[string]>(
        "newUserId"
      )
    })

    test("should create a session cookie from the session", () => {
      expect(mockedAuthAdapter.createSessionCookie).toHaveBeenCalledWith<
        [string]
      >("newSessionId")
    })
  })

  describe("when called with a username that already exists", () => {
    // mock that the username already exists
    jest.spyOn(mockedUserRepository, "getByUsername").mockResolvedValueOnce({
      success: true,
      data: {
        id: "existingUserId",
        username: "existingUsername",
        hashedPassword: "existingHashedPassword",
        credits: 0
      }
    })

    test("should return a NOT_ALLOWED error if the username is taken", async () => {
      const res = await signUp(
        newUserDetails,
        mockedUserRepository,
        mockedAuthAdapter
      )

      expect(res).toEqual<TaskResult<Session.Cookie>>({
        success: false,
        error: {
          code: "NOT_ALLOWED",
          message: "This username is taken."
        }
      })
    })
  })

  // Additional tests can be added for other scenarios, such as errors during user creation or session creation.
})
