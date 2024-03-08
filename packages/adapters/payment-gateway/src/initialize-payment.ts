import { PaymentGateway } from "@repo/domain/adapters"

import { HOST_URL } from "./env"
import { paystackFetch } from "./helpers"

export const initializePayment: PaymentGateway.Repository["initializePayment"] =
  async (inputs) => {
    const res = await paystackFetch({
      url: "https://api.paystack.co/transaction/initialize",
      method: "POST",
      body: {
        email: "admin@gmail.com",
        amount: inputs.price * 100,
        metadata: JSON.stringify(inputs.meta),
        callback_url: HOST_URL + inputs.callback_url
      }
    })

    if (!res.ok)
      return {
        success: false,
        error: {
          code: "FETCH_ERROR",
          message: "Something went wrong while initializing the payment"
        }
      }

    const resultJson = await res.json()
    if (resultJson.status !== true)
      return {
        success: false,
        error: {
          code: "NOT_ALLOWED",
          message: `Something went wrong while initializing the payment: ${resultJson.message}`
        }
      }

    if (
      typeof resultJson.data.authorization_url !== "string" ||
      typeof resultJson.data.reference !== "string"
    )
      return {
        success: false,
        error: {
          code: "SERVER_ERROR",
          message: "Checkout url or reference not present"
        }
      }

    return {
      success: true,
      data: {
        checkoutUrl: resultJson.data.authorization_url,
        reference: resultJson.data.reference
      }
    }
  }
