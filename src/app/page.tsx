import { Sidebar } from "@/components/ui/sidebar";
import { RightSidebar } from "@/components/ui/right-sidebar";
import { MainContent } from "@/components/ui/main-content";
import { MatchScheduleContainer } from "@/components/ui/match-schedule-container"; // Changed import
import { ClientLeagueStandingsWrapper } from "@/components/ui/client-league-standings-wrapper";
import LatestPage from "./latest/page";
import { LeagueStandingsContainer } from "@/components/ui/league-standings-container";
import { TopScorerClient } from "@/components/ui/top-scorer-client";
import { subDays, format } from "date-fns";

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

            {/* Dynamic Match Schedule - replaced static component */}
            <div className="mb-6">
              <MatchScheduleContainer
                title="LỊCH THI ĐẤU HÔM NAY VÀ NGÀY MAI"
                days={1} // Show today and tomorrow's matches
              />
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
              <TopScorerClient competitionCode="PL" limit={10} />
            </div>

            {/* Recent Results (Past Matches) */}
            <div className="mb-6">
              <MatchScheduleContainer
                title="KẾT QUẢ GẦN ĐÂY"
                dateFrom={format(subDays(new Date(), 10), "yyyy-MM-dd")} // Look back 10 days instead of 5
                dateTo={format(subDays(new Date(), 1), "yyyy-MM-dd")}
                status="FINISHED"
              />
            </div>

            {/* League Standings */}
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
