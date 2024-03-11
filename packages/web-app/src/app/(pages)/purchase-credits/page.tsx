import { getCreditPricingOptions } from "./actions"
import { PricingCard } from "./components/pricing-card"

export default async function PurchaseCreditsPage() {
  const pricingOptions = await getCreditPricingOptions()

  return (
    <main className="mx-auto flex max-w-lg flex-col gap-y-4 p-4">
      {pricingOptions.map((option, i, array) => {
        const savings =
          i === 0
            ? 0
            : (100 * option.creditMultiplier) / array[i - 1].creditMultiplier -
              100

        return (
          <PricingCard
            key={i}
            index={i}
            price={option.price}
            credits={option.creditMultiplier * option.price}
            savings={savings}
          />
        )
      })}
    </main>
  )
}
