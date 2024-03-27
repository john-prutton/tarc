import { tryGetMyTeams } from "./actions"
import { CreateTeamForm, TeamCard } from "./components"

export default async function DashboardPage() {
  const myTeamsResult = await tryGetMyTeams()
  if (!myTeamsResult.success) {
    return <div>{myTeamsResult.error.message}</div>
  }

  const myTeams = myTeamsResult.data

  return (
    <div className="px-2">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <p className="mt-4 text-lg font-semibold">New Team</p>
      <CreateTeamForm />

      <p className="mt-4 text-lg font-semibold">Your teams</p>

      <div className="space-y-4">
        {myTeams.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </div>
  )
}
