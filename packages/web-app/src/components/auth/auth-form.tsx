"use client"

import { TaskResult } from "@repo/domain/types"
import { useFormState, useFormStatus } from "react-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { trySignIn, trySignUp } from "./actions"

export function AuthForm() {
  return (
    <Tabs
      defaultValue="sign-in"
      className="grid min-h-svh place-content-center"
    >
      <TabsList className="mb-4">
        <TabsTrigger value="sign-in">Sign In</TabsTrigger>
        <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
      </TabsList>

      <TabsContent asChild value="sign-in">
        <Form action={trySignIn}>Sign in</Form>
      </TabsContent>

      <TabsContent asChild value="sign-up">
        <Form action={trySignUp}>Sign up</Form>
      </TabsContent>
    </Tabs>
  )
}

function Form({
  action,
  children
}: {
  action: any
  children: React.ReactNode
}) {
  const [formState, formAction] = useFormState<TaskResult<void>>(action, {
    success: true,
    data: undefined
  })

  return (
    <form action={formAction}>
      {!formState.success ? (
        <p className="text-destructive">{formState.error.message}</p>
      ) : null}
      <Input name="username" placeholder="Username" className="mb-2" />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        className="mb-4"
      />
      <SubmitButton>{children}</SubmitButton>
    </form>
  )
}

function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus()
  return (
    <Button className="w-full" disabled={pending}>
      {children}
    </Button>
  )
}
