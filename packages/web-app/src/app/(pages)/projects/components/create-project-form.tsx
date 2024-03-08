"use client"

import { useEffect, useRef } from "react"

import { Loader2Icon, PlusIcon } from "lucide-react"
import { useFormState, useFormStatus } from "react-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { tryCreateProject } from "../actions"

export function CreateProjectForm() {
  // Form state and action
  const [formState, formAction] = useFormState(tryCreateProject, undefined)

  // Form ref for controlling the form after submission
  const formRef = useRef<HTMLFormElement>(null)

  // useEffect to watch the form state
  useEffect(() => {
    if (formState?.success) {
      formRef.current?.reset()
    }
  }, [formState])

  // Markup
  return (
    <>
      {!!formState && !formState.success ? (
        <p className="text-destructive">{formState.error.message}</p>
      ) : null}
      <form
        ref={formRef}
        action={formAction}
        className="mb-8 flex flex-row gap-2"
      >
        <Input type="text" name="name" placeholder="New project name" />
        <SubmitButton />
      </form>
    </>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button disabled={pending}>
      {!pending ? <PlusIcon /> : <Loader2Icon className="ml-2 animate-spin" />}
    </Button>
  )
}
