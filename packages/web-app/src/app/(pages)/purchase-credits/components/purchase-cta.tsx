"use client"

import { SubmitButton } from "@/components/functional/submit-button"
import { toast } from "@/components/ui/sonner"

import { tryGeneratePurchaseLink } from "../actions"

export function PurchaseCTA({ index }: { index: number }) {
  async function formAction() {
    const result = await tryGeneratePurchaseLink({ pricingOption: index })

    if (!result.success)
      return toast.error(result.error.code + ": Failed to create purchase", {
        description: result.error.message
      })

    toast.success("Successfully created checkout URL", {
      description: "You will be redirected in 5 seconds"
    })

    setTimeout(() => (window.location.href = result.data.checkoutUrl), 5000)
  }

  return (
    <form action={formAction}>
      <SubmitButton
        variant={index === 1 ? "default" : "secondary"}
        className="mt-2 w-full"
        text="Buy now"
        pendingText="Buying..."
      />
    </form>
  )
}
