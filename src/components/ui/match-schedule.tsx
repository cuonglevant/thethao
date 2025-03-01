import Image from "next/image";

type Match = {
  time: string;
  date: string;
  homeTeam: {
    name: string;
    logo: string;
  };
  awayTeam: {
    name: string;
    logo: string;
  };
  competition: string;
};

type MatchDay = {
  date: string;
  matches: {
    time: string;
    home: {
      name: string;
      logo: string;
    };
    away: {
      name: string;
      logo: string;
    };
  }[];
};

interface MatchScheduleProps {
  title?: string;
  matches?: Match[];
  matchDays?: MatchDay[];
}

const defaultMatches: Match[] = [
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

export function MatchSchedule({
  title = "LỊCH THI ĐẤU",
  matches = defaultMatches,
  matchDays,
}: MatchScheduleProps) {
  if (matchDays) {
    return (
      <div className="bg-white rounded shadow overflow-hidden">
        <div className="bg-blue-800 text-white p-3">
          <h2 className="font-bold text-sm sm:text-base">{title}</h2>
        </div>
        <div className="p-4">
          <div className="space-y-6">
            {matchDays.map((day, dayIndex) => (
              <div key={dayIndex}>
                <div className="text-sm font-medium text-gray-600 mb-2">
                  {day.date}
                </div>
                <div className="space-y-3">
                  {day.matches.map((match, matchIndex) => (
                    <div
                      key={matchIndex}
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                    >
                      <div className="text-sm text-gray-600 w-16">
                        {match.time}
                      </div>
                      <div className="flex items-center flex-grow justify-center gap-2">
                        <div className="flex items-center gap-2 w-32 justify-end">
                          <span className="text-sm font-medium truncate">
                            {match.home.name}
                          </span>
                          <Image
                            src={match.home.logo}
                            alt={match.home.name}
                            width={24}
                            height={24}
                            className="w-6 h-6"
                          />
                        </div>
                        <span className="text-sm font-bold">VS</span>
                        <div className="flex items-center gap-2 w-32">
                          <Image
                            src={match.away.logo}
                            alt={match.away.name}
                            width={24}
                            height={24}
                            className="w-6 h-6"
                          />
                          <span className="text-sm font-medium truncate">
                            {match.away.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded shadow overflow-hidden">
      <div className="bg-blue-800 text-white p-3">
        <h2 className="font-bold text-sm sm:text-base">{title}</h2>
      </div>
      <div className="p-4">
        <div className="space-y-3">
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
                  <span className="text-sm font-medium truncate">
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
                  <span className="text-sm font-medium truncate">
                    {match.awayTeam.name}
                  </span>
                </div>
              </div>
              <div className="text-xs text-gray-500 w-24 text-right hidden sm:block">
                {match.competition}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
