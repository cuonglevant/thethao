import { LeagueStandings } from "./league-standings";
import { Team } from "@/types/teamTypes";

interface RankingLayoutProps {
  firstLeague: {
    title: string;
    teams: (Team & {
      position: number;
      played: number;
      won: number;
      drawn: number;
      lost: number;
      gd?: number;
    })[];
  };
  secondLeague: {
    title: string;
    teams: (Team & {
      position: number;
      played: number;
      won: number;
      drawn: number;
      lost: number;
      gd?: number;
    })[];
  };
}

export function RankingLayout({
  firstLeague,
  secondLeague,
}: RankingLayoutProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <LeagueStandings title={firstLeague.title} teams={firstLeague.teams} />
      <LeagueStandings title={secondLeague.title} teams={secondLeague.teams} />
    </div>
  );
}
