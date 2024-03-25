import { Team, User } from ".."
import { AsyncTaskResult } from "../../types"

export type Repository = {
  createTeam: (team: Team.NewEntity) => AsyncTaskResult<Team.Entity>
  deleteTeam: (team: Team.Entity["id"]) => AsyncTaskResult<void>
  getAllTeamsByUser: (
    userId: User.Entity["id"]
  ) => AsyncTaskResult<Team.Entity[]>
  setUserRoleInTeam: (
    teamId: Team.Entity["id"],
    userId: User.Entity["id"],
    role: Team.TeamRole
  ) => AsyncTaskResult<void>
}
