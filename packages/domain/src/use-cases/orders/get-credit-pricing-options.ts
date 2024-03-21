// might become a db fetch later
const CREDIT_PRICING_OPTIONS = [
  { price: 100, creditMultiplier: 10 },
  { price: 200, creditMultiplier: 12 },
  { price: 500, creditMultiplier: 15 }
] as const

export async function getCreditPricingOptions() {
  return CREDIT_PRICING_OPTIONS
}
