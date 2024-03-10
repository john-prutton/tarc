import { BadgeCentIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

import { PurchaseCTA } from "./purchase-cta"

export function PricingCard({
  price,
  credits,
  savings,
  index
}: {
  price: number
  credits: number
  savings: number
  index: number
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row flex-wrap gap-x-2 gap-y-2">
          <BadgeCentIcon />
          {credits}
          <Badge
            className={cn(
              "text-foreground text-sm",
              index === 0 && "bg-muted hover:bg-muted/80",
              index === 1 && "bg-emerald-300 hover:bg-emerald-300/80",
              index === 2 &&
                "text-background bg-emerald-500 hover:bg-emerald-500/80"
            )}
          >
            + {savings}%
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <span className="text-2xl">R{price}</span>

        <PurchaseCTA index={index} />
      </CardContent>
    </Card>
  )
}
