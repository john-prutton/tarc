import { PAYSTACK_SECRET } from "../env"

export const paystackFetch = async ({
  url,
  method,
  body
}: {
  method: "POST" | "GET"
  url: string
  body?: any
}) =>
  fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET}`,
      ...(method === "POST" && {
        "Content-Type": "application/json"
      })
    },
    ...(!!body && { body: JSON.stringify(body) })
  })
