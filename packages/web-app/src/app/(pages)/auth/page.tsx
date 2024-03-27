import { redirect } from "next/navigation"

import { tryGetAuthedUser } from "@/lib/auth/actions"

import { AuthForm } from "./auth-form"
import { SignOutForm } from "./sign-out"

export default async function AuthPage({
  searchParams
}: {
  searchParams: { [key: string]: string }
}) {
  const user = await tryGetAuthedUser()

  const redirectPathname = searchParams["redirect"]
  const isSignOut = searchParams["signOut"] === "true"

  if (user && redirectPathname) redirect(redirectPathname || "/dashboard")
  if (!user && isSignOut) redirect("/")

  const form = user ? <SignOutForm username={user.username} /> : <AuthForm />

  return (
    <main className="grid place-content-center drop-shadow-lg">{form}</main>
  )
}
