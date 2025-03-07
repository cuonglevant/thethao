import { Sidebar } from "@/components/ui/sidebar";
import { RightSidebar } from "@/components/ui/right-sidebar";
import { MainContent } from "@/components/ui/main-content";
import { MatchSchedule } from "@/components/ui/match-schedule";
import { TopScorer } from "@/components/ui/top-scorer";
import { ClientLeagueStandingsWrapper } from "@/components/ui/client-league-standings-wrapper";
import LatestPage from "./latest/page";
import { LeagueStandingsContainer } from "@/components/ui/league-standings-container";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <MainContent />

            {/* Static Match Schedule */}
            <div className="mb-6">
              <MatchSchedule />
            </div>

            {/* Client Components Section with League Standings */}
            <div className="mb-6">
              <ClientLeagueStandingsWrapper />
            </div>

            {/* Latest Content */}
            <div className="bg-white rounded shadow p-4">
              <LatestPage />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <RightSidebar />

            {/* Top Scorer Section */}
            <div className="mb-6">
              <TopScorer competitionCode="CL" limit={10} />
            </div>

            {/* Static League Standings */}
            <div className="mb-6">
              <LeagueStandingsContainer
                competitionCode="PL"
                title="Premier League"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
