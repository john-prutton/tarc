import { User } from "../../entities"

export const COOKIE_NAME = "authCookie"

export type Entity = {
  id: string
  userId: User.Entity["id"]
  expiresAt: Date
}

export type Cookie = {
  name: typeof COOKIE_NAME
  value: string
}
