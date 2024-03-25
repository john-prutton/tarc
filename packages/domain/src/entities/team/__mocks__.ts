import { Team } from ".."

export const mockTeamRepository = (): Team.Repository => {
  const mock: Team.Repository = {
    createTeam: jest.fn(),
    deleteTeam: jest.fn(),
    setUserRoleInTeam: jest.fn(),
    getAllTeamsByUser: jest.fn(),
    getUserRoleInTeam: jest.fn()
  }

  return mock
}
