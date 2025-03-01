import Image from "next/image";

const standings = [
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
    points: 25,
  },
];

export function LeagueStandings() {
  return (
    <div className="bg-white rounded shadow p-4 mt-4">
      <h2 className="text-xl font-bold mb-4">BẢNG XẾP HẠNG V-LEAGUE 2024</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-sm text-gray-600 border-b">
              <th className="text-left py-2 w-8">#</th>
              <th className="text-left py-2">Đội</th>
              <th className="text-center py-2 w-8">Tr</th>
              <th className="text-center py-2 w-8">T</th>
              <th className="text-center py-2 w-8">H</th>
              <th className="text-center py-2 w-8">B</th>
              <th className="text-center py-2 w-12">Đ</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((team) => (
              <tr key={team.position} className="hover:bg-gray-50">
                <td className="py-2 text-sm">{team.position}</td>
                <td className="py-2">
                  <div className="flex items-center gap-2">
                    <Image
                      src={team.team.logo}
                      alt={team.team.name}
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                    <span className="text-sm font-medium">
                      {team.team.name}
                    </span>
                  </div>
                </td>
                <td className="text-center text-sm">{team.played}</td>
                <td className="text-center text-sm">{team.won}</td>
                <td className="text-center text-sm">{team.drawn}</td>
                <td className="text-center text-sm">{team.lost}</td>
                <td className="text-center text-sm font-bold">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
