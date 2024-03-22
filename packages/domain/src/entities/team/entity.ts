export type Entity = {
  id: number
  name: string
}

export type NewEntity = {
  name: string
}

export const TEAM_ROLES = ["owner", "leader", "member"] as const
export type TeamRole = (typeof TEAM_ROLES)[number]
