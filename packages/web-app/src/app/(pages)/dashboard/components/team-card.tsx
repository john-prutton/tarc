import Link from "next/link"

import { Team } from "@repo/domain/entities"

export function TeamCard({ team }: { team: Team.Entity }) {
  return (
    <Link
      href={`/team/${team.id}`}
      className="bg-background block w-full rounded-xl p-4 drop-shadow-lg"
    >
      <h2 className="text-xl font-bold">{team.name}</h2>
    </Link>
  )
}
