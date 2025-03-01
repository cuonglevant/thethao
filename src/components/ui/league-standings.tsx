import Image from "next/image";

type Team = {
  position: number;
  team: {
    name: string;
    logo: string;
  };
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gd?: number;
  points: number;
};

const defaultTeams: Team[] = [
  {
    position: 1,
    team: {
      name: "Nam Định",
      logo: "/placeholder.svg?height=32&width=32",
    },
    played: 15,
    won: 11,
    drawn: 2,
    lost: 2,
    gd: 12,
    points: 35,
  },
  {
    position: 2,
    team: {
      name: "Hà Nội FC",
      logo: "/placeholder.svg?height=32&width=32",
    },
    played: 15,
    won: 9,
    drawn: 3,
    lost: 3,
    gd: 8,
    points: 30,
  },
  {
    position: 3,
    team: {
      name: "Thanh Hóa",
      logo: "/placeholder.svg?height=32&width=32",
    },
    played: 15,
    won: 8,
    drawn: 4,
    lost: 3,
    gd: 6,
    points: 28,
  },
  {
    position: 4,
    team: {
      name: "Viettel",
      logo: "/placeholder.svg?height=32&width=32",
    },
    played: 15,
    won: 8,
    drawn: 3,
    lost: 4,
    gd: 4,
    points: 27,
  },
  {
    position: 5,
    team: {
      name: "HAGL",
      logo: "/placeholder.svg?height=32&width=32",
    },
    played: 15,
    won: 7,
    drawn: 4,
    lost: 4,
    gd: 2,
    points: 25,
  },
];

interface LeagueStandingsProps {
  title?: string;
  teams?: Team[];
}

export function LeagueStandings({
  title = "BẢNG XẾP HẠNG V-LEAGUE 2024",
  teams = defaultTeams,
}: LeagueStandingsProps) {
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
              <th className="text-left py-2">Đội</th>
              <th className="text-center py-2 w-8 hidden sm:table-cell">Tr</th>
              <th className="text-center py-2 w-8 hidden sm:table-cell">T</th>
              <th className="text-center py-2 w-8 hidden sm:table-cell">H</th>
              <th className="text-center py-2 w-8 hidden sm:table-cell">B</th>
              <th className="text-center py-2 w-8 hidden sm:table-cell">HS</th>
              <th className="text-center py-2 w-12">Đ</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team.position} className="hover:bg-gray-50">
                <td className="py-2">
                  <span
                    className={`inline-flex items-center justify-center w-6 h-6 rounded text-sm
                    ${
                      team.position <= 3
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {team.position}
                  </span>
                </td>
                <td className="py-2">
                  <div className="flex items-center gap-2">
                    <Image
                      src={team.team.logo}
                      alt={team.team.name}
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                    <span className="text-sm font-medium truncate max-w-[120px] sm:max-w-[150px]">
                      {team.team.name}
                    </span>
                  </div>
                </td>
                <td className="text-center text-sm hidden sm:table-cell">
                  {team.played}
                </td>
                <td className="text-center text-sm hidden sm:table-cell">
                  {team.won}
                </td>
                <td className="text-center text-sm hidden sm:table-cell">
                  {team.drawn}
                </td>
                <td className="text-center text-sm hidden sm:table-cell">
                  {team.lost}
                </td>
                <td className="text-center text-sm hidden sm:table-cell">
                  {team.gd}
                </td>
                <td className="text-center text-sm font-bold">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 text-xs sm:text-sm text-gray-600">
          Nếu các đội bằng điểm nhau vào cuối mùa giải, việc xếp hạng sẽ dựa vào
          thành tích đối đầu.
        </div>
      </div>
    </div>
  );
}
