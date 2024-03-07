import { tryGetAuthedUser } from "@/lib/auth/util"

import { AuthForm } from "./auth-form"
import { SignOutForm } from "./sign-out"

export default async function AuthPage() {
  const user = await tryGetAuthedUser()
  const form = user ? <SignOutForm username={user.username} /> : <AuthForm />

  return (
    <main className="grid min-h-svh w-full place-content-center drop-shadow-lg">
      {form}
    </main>
  )
}
