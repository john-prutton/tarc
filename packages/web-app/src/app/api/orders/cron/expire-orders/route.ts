import { NextResponse } from "next/server"

import { flagExpiredOrders } from "@repo/domain/use-cases/orders/flag-expired-orders"

import { databaseAdapter } from "@/lib/adapters"

export async function GET() {
  const result = await flagExpiredOrders({}, { db: databaseAdapter })
  if (!result.success) return NextResponse.json(result.error, { status: 500 })

  const rowsAffected = result.data
  return NextResponse.json({ status: true, orders_flagged: rowsAffected })
}
