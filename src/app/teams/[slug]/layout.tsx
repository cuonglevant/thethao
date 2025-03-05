import { ReactNode } from "react";
import { MatchSchedule } from "@/components/ui/match-schedule";
import { LeagueStandings } from "@/components/ui/league-standings";
import { TopScorer } from "@/components/ui/top-scorer";
import { Team } from "@/types/teamTypes";

interface TeamsLayoutProps {
  children: ReactNode;
}

const matchDaysData = [
  {
    date: "07/03/2025",
    matches: [
      {
        time: "00:45",
        home: {
          name: "Real Sociedad",
          logo: "/teams/real-sociedad.png",
        },
        away: {
          name: "Manchester United",
          logo: "/teams/manchester-united.png",
        },
      },
    ],
  },
  {
    date: "10/03/2025",
    matches: [
      {
        time: "21:00",
        home: {
          name: "Manchester United",
          logo: "/teams/manchester-united.png",
        },
        away: {
          name: "Everton",
          logo: "/teams/everton.png",
        },
      },
    ],
  },
];

const standingsData: (Team & {
  position: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gd: number;
})[] = [
  {
    _id: "1",
    name: "Manchester United",
    slug: "manchester-united",
    description: "Manchester United FC",
    league: {
      _id: "1",
      name: "Premier League",
      slug: "premier-league",
      logo: "/leagues/premier-league.png",
    },
    points: 45,
    category: {
      _id: "1",
      name: "Football",
      description: "Football category",
      slug: "football",
      nation: {
        _id: "1",
        name: "England",
        flag: "/flags/england.png",
        slug: "england",
        league: [],
      },
      matches: [],
    },
    media: [],
    player: [],
    nation: {
      _id: "1",
      name: "England",
      flag: "/flags/england.png",
      slug: "england",
      league: [],
    },
    flag: "/flags/england.png",
    shortName: "MUN",
    logo: "/teams/manchester-united.png",
    position: 1,
    played: 27,
    won: 14,
    drawn: 3,
    lost: 10,
    gd: 12,
  },
  // Add more teams as needed
];

const topScorersData = [
  {
    player: {
      _id: "1",
      name: "Marcus Rashford",
      image: {
        _id: "1",
        mediaCaption: "",
        mediaType: "image",
        mediaURL: "/players/rashford.jpg",
      },
    },
    team: {
      name: "Manchester United",
      logo: "/teams/manchester-united.png",
    },
    goals: 15,
    assists: 5,
    matches: 25,
  },
  {
    player: {
      _id: "1",
      name: "Bruno Fernandes",
      image: {
        _id: "1",
        mediaCaption: "",
        mediaType: "image",
        mediaURL: "/players/fernandes.jpg",
      },
    },
    team: {
      name: "Manchester United",
      logo: "/teams/manchester-united.png",
    },
    goals: 10,
    assists: 8,
    matches: 27,
  },
];

export default function TeamsLayout({ children }: TeamsLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-[1200px]">
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_300px] gap-4">
        {/* Left Sidebar */}
        <div className="hidden lg:block space-y-4"></div>

        {/* Main Content */}
        <div className="space-y-4">
          {children}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-bold text-lg mb-4">Lịch thi đấu</h3>
            <MatchSchedule title="Upcoming Matches" matchDays={matchDaysData} />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:flex flex-col gap-4">
          <div className="bg-white rounded-lg shadow">
            <LeagueStandings teams={standingsData} title="Premier League" />
          </div>
          <div className="bg-white rounded-lg shadow">
            <TopScorer
              title="Top Scorers - Premier League"
              scorers={topScorersData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
