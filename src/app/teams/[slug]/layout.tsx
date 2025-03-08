import { ReactNode } from "react";
import { ClientLeagueStandingsWrapper } from "@/components/ui/client-league-standings-wrapper";

interface TeamsLayoutProps {
  children: ReactNode;
}

export default function TeamsLayout({ children }: TeamsLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-[1200px]">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">
        {/* Main Content */}
        <div className="space-y-4">
          {children}
          {/* Removed MatchScheduleContainer from here */}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          {/* League Standings - Client Component */}
          <ClientLeagueStandingsWrapper />
        </div>
      </div>
    </div>
  );
}
