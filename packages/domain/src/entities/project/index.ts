export * from "./entity"
export * from "./repository"

export const PROJECT_COST = 25
export const PROJECT_ROLES = ["Owner", "Leader", "Member"] as const
export type ProjectRole = (typeof PROJECT_ROLES)[number]
