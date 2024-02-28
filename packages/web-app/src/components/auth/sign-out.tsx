import { Button } from "@/components/ui/button"

import { trySignOut } from "./actions"

export function SignOutForm() {
  return (
    <form className="grid min-h-svh place-content-center" action={trySignOut}>
      <Button variant={"destructive"} className="mt-4">
        Sign out
      </Button>
    </form>
  )
}
