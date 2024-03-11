import { Button } from "@/components/ui/button"

import { trySignOut } from "./actions"

export function SignOutForm({ username }: { username: string }) {
  return (
    <form action={trySignOut}>
      <p className="text-muted-foreground text-sm">Logged in as</p>
      <p className="mb-4 text-xl font-bold">{username}</p>
      <Button variant={"default"} className="w-32">
        Sign out
      </Button>
    </form>
  )
}
