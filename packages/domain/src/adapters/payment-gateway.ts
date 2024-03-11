import { Database } from "."
import { User } from "../entities"
import { AsyncTaskResult } from "../types"

export type Repository = {
  initializePayment: InitializePayment
  handleWebhook: HandleWebhook
}

type InitializePayment = (inputs: {
  price: number
  meta: { userId: User.Entity["id"]; credits: number }
  callback_url: string
}) => AsyncTaskResult<{ checkoutUrl: string; reference: string }>

type HandleWebhook = (
  inputs: { req: Request },
  dependencies: {
    databaseAdapter: Database.Repository
  }
) => AsyncTaskResult<void>
