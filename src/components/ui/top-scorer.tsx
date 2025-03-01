import Image from "next/image";

type Scorer = {
  position: number;
  player: {
    name: string;
    image: string;
  };
  team: {
    name: string;
    logo: string;
  };
  goals: number;
  assists: number;
  matches: number;
};

const defaultScorers: Scorer[] = [
  {
    position: 1,
    player: {
      name: "Rimario Gordon",
      image: "/placeholder.svg?height=32&width=32",
    },
    team: {
      name: "Nam Định",
      logo: "/placeholder.svg?height=32&width=32",
    },
    goals: 10,
    assists: 3,
    matches: 15,
  },
  {
    position: 2,
    player: {
      name: "Nguyễn Văn Toàn",
      image: "/placeholder.svg?height=32&width=32",
    },
    team: {
      name: "Hà Nội FC",
      logo: "/placeholder.svg?height=32&width=32",
    },
    goals: 8,
    assists: 5,
    matches: 14,
  },
  {
    position: 3,
    player: {
      name: "Nguyễn Tiến Linh",
      image: "/placeholder.svg?height=32&width=32",
    },
    team: {
      name: "HAGL",
      logo: "/placeholder.svg?height=32&width=32",
    },
    goals: 7,
    assists: 2,
    matches: 15,
  },
  {
    position: 4,
    player: {
      name: "Rafaelson",
      image: "/placeholder.svg?height=32&width=32",
    },
    team: {
      name: "Thanh Hóa",
      logo: "/placeholder.svg?height=32&width=32",
    },
    goals: 7,
    assists: 1,
    matches: 13,
  },
  {
    position: 5,
    player: {
      name: "Geovane",
      image: "/placeholder.svg?height=32&width=32",
    },
    team: {
      name: "Viettel",
      logo: "/placeholder.svg?height=32&width=32",
    },
    goals: 6,
    assists: 4,
    matches: 15,
  },
];

interface TopScorerProps {
  title?: string;
  scorers?: Scorer[];
}

export function TopScorer({
  title = "VUA PHÁ LƯỚI V-LEAGUE 2024",
  scorers = defaultScorers,
}: TopScorerProps) {
  return (
    <div className="bg-white rounded shadow overflow-hidden">
      <div className="bg-blue-800 text-white p-3">
        <h2 className="font-bold text-sm sm:text-base">{title}</h2>
      </div>
      <div className="p-4 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-sm text-gray-600 border-b">
              <th className="text-left py-2 w-8">#</th>
              <th className="text-left py-2">Cầu thủ</th>
              <th className="text-center py-2 w-8 hidden sm:table-cell">Tr</th>
              <th className="text-center py-2 w-8 hidden sm:table-cell">KP</th>
              <th className="text-center py-2 w-12">B</th>
            </tr>
          </thead>
          <tbody>
            {scorers.map((scorer) => (
              <tr key={scorer.position} className="hover:bg-gray-50">
                <td className="py-2">
                  <span
                    className={`inline-flex items-center justify-center w-6 h-6 rounded text-sm
                    ${
                      scorer.position <= 3
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {scorer.position}
                  </span>
                </td>
                <td className="py-2">
                  <div className="flex items-center gap-2">
                    <Image
                      src={scorer.player.image}
                      alt={scorer.player.name}
                      width={24}
                      height={24}
                      className="w-6 h-6 rounded-full"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium truncate max-w-[120px] sm:max-w-[150px]">
                        {scorer.player.name}
                      </span>
                      <div className="flex items-center gap-1">
                        <Image
                          src={scorer.team.logo}
                          alt={scorer.team.name}
                          width={16}
                          height={16}
                          className="w-4 h-4"
                        />
                        <span className="text-xs text-gray-500 truncate max-w-[100px]">
                          {scorer.team.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="text-center text-sm hidden sm:table-cell">
                  {scorer.matches}
                </td>
                <td className="text-center text-sm hidden sm:table-cell">
                  {scorer.assists}
                </td>
                <td className="text-center text-sm font-bold">
                  {scorer.goals}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
