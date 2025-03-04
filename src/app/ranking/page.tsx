import { RankingLayout } from "@/components/ui/ranking-layout";

const vLeagueData = [
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

const premierLeagueData = [
  {
    _id: "3",
    name: "Arsenal",
    slug: "arsenal",
    description: "Arsenal FC",
    league: {
      _id: "2",
      name: "Premier League",
      slug: "premier-league",
      logo: "/leagues/premier-league.png",
    },
    points: 68,
    category: {
      _id: "1",
      name: "Bóng đá",
      description: "",
      slug: "bong-da",
      nation: {
        _id: "2",
        name: "Anh",
        flag: "",
        slug: "anh",
        league: [],
      },
      matches: [],
    },
    media: [],
    player: [],
    nation: {
      _id: "2",
      name: "Anh",
      flag: "",
      slug: "anh",
      league: [],
    },
    flag: "",
    shortName: "ARS",
    logo: "/teams/arsenal.svg",
    position: 1,
    played: 28,
    won: 20,
    drawn: 4,
    lost: 4,
    gd: 46,
  },
  {
    _id: "4",
    name: "Liverpool",
    slug: "liverpool",
    description: "Liverpool FC",
    league: {
      _id: "2",
      name: "Premier League",
      slug: "premier-league",
      logo: "/leagues/premier-league.png",
    },
    points: 67,
    category: {
      _id: "1",
      name: "Bóng đá",
      description: "",
      slug: "bong-da",
      nation: {
        _id: "2",
        name: "Anh",
        flag: "",
        slug: "anh",
        league: [],
      },
      matches: [],
    },
    media: [],
    player: [],
    nation: {
      _id: "2",
      name: "Anh",
      flag: "",
      slug: "anh",
      league: [],
    },
    flag: "",
    shortName: "LIV",
    logo: "/teams/liver.png",
    position: 2,
    played: 28,
    won: 20,
    drawn: 4,
    lost: 4,
    gd: 41,
  },
];

export default function RankingsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-[1200px]">
      <h1 className="text-2xl font-bold mb-6">Bảng Xếp Hạng</h1>
      <RankingLayout
        firstLeague={{
          title: "BẢNG XẾP HẠNG V-LEAGUE 2024",
          teams: vLeagueData,
        }}
        secondLeague={{
          title: "BẢNG XẾP HẠNG NGOẠI HẠNG ANH 2023/24",
          teams: premierLeagueData,
        }}
      />
    </div>
  );
}
