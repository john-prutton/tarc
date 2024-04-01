import { Team } from ".."

export const mockTeamRepository = (): Team.Repository => {
  const mock: Team.Repository = {
    createTeam: jest.fn(),
    deleteTeam: jest.fn(),
    setUserRoleInTeam: jest.fn(),
    getAllTeamsByUser: jest.fn(),
    getUserRoleInTeam: jest.fn(),
    getTeamById: jest.fn(),
    createTeamInvite: jest.fn(),
    getTeamByInviteCode: jest.fn(),
    deleteInvitation: jest.fn(),
    removeMemberFromTeam: jest.fn(),
    getTeamMembers: jest.fn()
  }

  return mock
}
