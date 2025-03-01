import Image from "next/image";

const matches = [
  {
    time: "19:00",
    date: "24/03",
    homeTeam: {
      name: "Hà Nội FC",
      logo: "/placeholder.svg?height=32&width=32",
    },
    awayTeam: {
      name: "HAGL",
      logo: "/placeholder.svg?height=32&width=32",
    },
    competition: "V-League 2024",
  },
  {
    time: "19:30",
    date: "24/03",
    homeTeam: {
      name: "Nam Định",
      logo: "/placeholder.svg?height=32&width=32",
    },
    awayTeam: {
      name: "Viettel",
      logo: "/placeholder.svg?height=32&width=32",
    },
    competition: "V-League 2024",
  },
  {
    time: "17:00",
    date: "25/03",
    homeTeam: {
      name: "Thanh Hóa",
      logo: "/placeholder.svg?height=32&width=32",
    },
    awayTeam: {
      name: "SLNA",
      logo: "/placeholder.svg?height=32&width=32",
    },
    competition: "V-League 2024",
  },
];

export function MatchSchedule() {
  return (
    <div className="bg-white rounded shadow p-4 mt-4">
      <h2 className="text-xl font-bold mb-4">LỊCH THI ĐẤU</h2>
      <div className="space-y-4">
        {matches.map((match, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
          >
            <div className="text-sm text-gray-600 w-16">
              <div>{match.time}</div>
              <div>{match.date}</div>
            </div>
            <div className="flex items-center flex-grow justify-center gap-2">
              <div className="flex items-center gap-2 w-32 justify-end">
                <span className="text-sm font-medium">
                  {match.homeTeam.name}
                </span>
                <Image
                  src={match.homeTeam.logo}
                  alt={match.homeTeam.name}
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </div>
              <span className="text-sm font-bold">VS</span>
              <div className="flex items-center gap-2 w-32">
                <Image
                  src={match.awayTeam.logo}
                  alt={match.awayTeam.name}
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <span className="text-sm font-medium">
                  {match.awayTeam.name}
                </span>
              </div>
            </div>
            <div className="text-xs text-gray-500 w-24 text-right">
              {match.competition}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
