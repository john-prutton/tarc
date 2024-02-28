export type Entity = {
  id: string
  username: string
  hashedPassword: string
}

export type NewEntity = {
  username: Entity["id"]
  plainPassword: Entity["hashedPassword"]
}

// export type SafeEntity = Omit<Entity, "hashedPassword">
