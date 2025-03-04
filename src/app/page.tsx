import { Sidebar } from "@/components/ui/sidebar";
import { RightSidebar } from "@/components/ui/right-sidebar";
import { MainContent } from "@/components/ui/main-content";
import { MatchSchedule } from "@/components/ui/match-schedule";
import { LeagueStandings } from "@/components/ui/league-standings";
import { TopScorer } from "@/components/ui/top-scorer";
import LatestPage from "./latest/page";

const standingsData = [
  {
    _id: "1",
    name: "Nam Định",
    slug: "nam-dinh",
    description: "Nam Định FC",
    league: {
      _id: "1",
      name: "V-League",
      slug: "v-league",
      logo: "/leagues/vleague1.png",
    },
    points: 30,
    category: {
      _id: "1",
      name: "Bóng đá",
      description: "",
      slug: "bong-da",
      nation: {
        _id: "1",
        name: "Việt Nam",
        flag: "",
        slug: "viet-nam",
        league: [],
      },
      matches: [],
    },
    media: [],
    player: [],
    nation: {
      _id: "1",
      name: "Việt Nam",
      flag: "",
      slug: "viet-nam",
      league: [],
    },
    flag: "",
    shortName: "ND",
    logo: "/teams/nam-dinh.png",
    position: 1,
    played: 15,
    won: 9,
    drawn: 3,
    lost: 3,
    gd: 16,
  },
  {
    _id: "2",
    name: "Công An Hà Nội",
    slug: "cong-an-ha-noi",
    description: "Công An Hà Nội FC",
    league: {
      _id: "1",
      name: "V-League",
      slug: "v-league",
      logo: "/leagues/vleague1.png",
    },
    points: 28,
    category: {
      _id: "1",
      name: "Bóng đá",
      description: "",
      slug: "bong-da",
      nation: {
        _id: "1",
        name: "Việt Nam",
        flag: "",
        slug: "viet-nam",
        league: [],
      },
      matches: [],
    },
    media: [],
    player: [],
    nation: {
      _id: "1",
      name: "Việt Nam",
      flag: "",
      slug: "viet-nam",
      league: [],
    },
    flag: "",
    shortName: "CAHN",
    logo: "/teams/cahn.png",
    position: 2,
    played: 15,
    won: 8,
    drawn: 4,
    lost: 3,
    gd: 12,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-4 max-w-[1200px]">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_300px] gap-4 mb-4">
          {/* Sidebar - hidden on mobile, shown as overlay on tablet, normal on desktop */}
          <div className="hidden lg:block">
            <Sidebar />
          </div>

          {/* Main Content */}
          <div className="space-y-4">
            <div className="bg-white rounded shadow p-4">
              <MainContent.Featured />
            </div>
            <MatchSchedule />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TopScorer />
              <LeagueStandings teams={standingsData} />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4">
            <RightSidebar />
            <LeagueStandings teams={standingsData} />
          </div>
        </div>

        {/* Grid Articles */}
        <div className="bg-white rounded shadow p-4">
          <LatestPage />
        </div>
      </main>
    </div>
  );
}
