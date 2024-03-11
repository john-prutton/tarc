import Link from "next/link"

import {
  BadgeCentIcon,
  LogOutIcon,
  PresentationIcon,
  UserIcon
} from "lucide-react"

import { PROJECT_COST } from "@repo/domain/entities/project"

import { tryGetAuthedUser } from "@/lib/auth/util"
import { cn } from "@/lib/utils"

import { Avatar, AvatarFallback } from "../ui/avatar"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../ui/dropdown-menu"
import { Logo } from "./logo"

export async function Navbar() {
  return (
    <nav className="bg-primary-foreground flex flex-row items-center justify-between px-8 py-4 shadow">
      <Logo />

      <ProfileSection />
    </nav>
  )
}

async function ProfileSection() {
  const user = await tryGetAuthedUser()

  if (!user)
    return (
      <Button asChild>
        <Link href={"/auth"}>Sign In</Link>
      </Button>
    )

  return (
    <div className="flex flex-row gap-6">
      <Credits credits={user.credits} />
      <Menu />
    </div>
  )
}

function Credits({ credits }: { credits: number }) {
  return (
    <Button variant={"ghost"} asChild>
      <Link
        href={"/purchase-credits"}
        className={cn(
          "flex flex-row items-center gap-x-1",
          credits <= PROJECT_COST && "text-destructive"
        )}
      >
        <BadgeCentIcon className="size-5" />
        <span className="font-bold">{credits}</span>
      </Link>
    </Button>
  )
}

function Menu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-full p-0">
          <Avatar>
            <AvatarFallback>
              <UserIcon className="stroke-muted-foreground" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent forceMount className="translate-y-5">
        <DropdownMenuLabel>Projects</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link href={"/projects"} className="flex flex-row gap-x-2">
            <PresentationIcon />
            Create a Project
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={"/purchase-credits"} className="flex flex-row gap-x-2">
            <BadgeCentIcon />
            Buy Credits
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={"/auth"} className="flex flex-row gap-x-2">
            <LogOutIcon />
            Sign Out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
