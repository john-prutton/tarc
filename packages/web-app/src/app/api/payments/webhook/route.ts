import { NextRequest } from "next/server"

import { databaseAdapter, paymentAdapter } from "@/lib/adapters"

export async function POST(req: NextRequest) {
  const res = await paymentAdapter.handleWebhook({ req }, { databaseAdapter })
  console.log(res)
  return new Response(null, { status: res.success ? 200 : 500 })
}
