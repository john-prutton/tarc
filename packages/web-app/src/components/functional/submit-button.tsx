"use client"

import { Loader2Icon } from "lucide-react"
import { useFormStatus } from "react-dom"

import { Button, ButtonProps } from "../ui/button"

export function SubmitButton({
  text,
  pendingText,
  ...props
}: ButtonProps & {
  text: string
  pendingText: string
}) {
  const { pending } = useFormStatus()

  return (
    <Button {...props} disabled={pending}>
      {!pending ? (
        text
      ) : (
        <>
          {pendingText}
          <Loader2Icon className="ml-2 animate-spin" />
        </>
      )}
    </Button>
  )
}
