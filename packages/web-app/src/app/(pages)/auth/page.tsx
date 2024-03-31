import { redirect } from "next/navigation"

import { tryGetAuthedUser } from "@/lib/auth/actions"

import { AuthForm } from "./auth-form"
import { SignOutForm } from "./sign-out"

export default async function AuthPage({
  searchParams
}: {
  searchParams: { redirect?: string; signOut?: string }
}) {
  const user = await tryGetAuthedUser()

  const redirectPath = searchParams["redirect"]
  const isSignOut = searchParams["signOut"] === "true"

  if (user && redirectPath) redirect(decodeURIComponent(redirectPath))
  if (!user && isSignOut) redirect("/")

  const form = user ? <SignOutForm username={user.username} /> : <AuthForm />

  return (
    <main className="grid place-content-center drop-shadow-lg">{form}</main>
  )
}
