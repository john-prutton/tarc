import type { Auth } from "."
import type { Project, Session, User } from "../entities"

export type Repository = {
  auth: Auth.Repository
  project: Project.Repository
  user: User.Repository
}
