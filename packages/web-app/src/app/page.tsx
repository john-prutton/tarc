import { AuthForm, SignOutForm } from "@/components/auth"
import { tryGetAuthedUser } from "@/components/auth/actions"

export default async function HomePage() {
  const user = await tryGetAuthedUser()

  if (!user)
    return (
      <>
        <AuthForm />
      </>
    )

  return (
    <>
      <p>Logged in as {JSON.stringify(user)}</p>
      <SignOutForm />
    </>
  )
}
