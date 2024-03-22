export type Entity = {
  id: string
  name: string
}

export type NewEntity = {
  name: string
}

export const TEAM_ROLES = ["owner", "leader", "member"]
export type TeamRole = (typeof TEAM_ROLES)[number]
