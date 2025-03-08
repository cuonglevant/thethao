import React from "react";
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

        {/* Mobile-optimized layout */}
        <div className="p-2">
          {matchDays.map((day, dayIndex) => (
            <div key={dayIndex} className="mb-4">
              {/* Date header */}
              <div className="text-xs font-medium text-gray-600 mb-2 px-1">
                {day.date}
              </div>

              {/* Matches */}
              <div className="space-y-2">
                {day.matches.map((match, matchIndex) => (
                  <div
                    key={matchIndex}
                    className="border border-gray-100 rounded-md p-2 bg-white"
                  >
                    {/* Time */}
                    <div className="text-xs text-gray-500 mb-2">
                      {match.time}
                    </div>

                    {/* Teams - simple 3-column grid layout */}
                    <div className="grid grid-cols-[4fr,1fr,4fr] items-center">
                      {/* Home team */}
                      <div className="flex items-center justify-end gap-1">
                        <div className="text-xs font-medium text-right truncate max-w-[calc(100%-24px)]">
                          {match.home.name}
                        </div>
                        <div className="w-5 h-5 flex-shrink-0">
                          <img
                            src={match.home.logo || "/placeholder.svg"}
                            alt={match.home.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>

                      {/* VS */}
                      <div className="text-center text-xs font-bold">VS</div>

                      {/* Away team */}
                      <div className="flex items-center gap-1">
                        <div className="w-5 h-5 flex-shrink-0">
                          <img
                            src={match.away.logo || "/placeholder.svg"}
                            alt={match.away.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="text-xs font-medium truncate max-w-[calc(100%-24px)]">
                          {match.away.name}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // For the legacy matches format - also simplified
  return (
    <div className="bg-white rounded shadow overflow-hidden">
      <div className="bg-blue-800 text-white p-3">
        <h2 className="font-bold text-sm sm:text-base">{title}</h2>
      </div>

      <div className="p-2">
        <div className="space-y-2">
          {matches.map((match, index) => (
            <div
              key={index}
              className="border border-gray-100 rounded-md p-2 bg-white"
            >
              {/* Date and time */}
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>{match.date}</span>
                <span>{match.time}</span>
              </div>

              {/* Teams - simple 3-column grid layout */}
              <div className="grid grid-cols-[4fr,1fr,4fr] items-center">
                {/* Home team */}
                <div className="flex items-center justify-end gap-1">
                  <div className="text-xs font-medium text-right truncate max-w-[calc(100%-24px)]">
                    {match.homeTeam.name}
                  </div>
                  <div className="w-5 h-5 flex-shrink-0">
                    <img
                      src={match.homeTeam.logo}
                      alt={match.homeTeam.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* VS */}
                <div className="text-center text-xs font-bold">VS</div>

                {/* Away team */}
                <div className="flex items-center gap-1">
                  <div className="w-5 h-5 flex-shrink-0">
                    <img
                      src={match.awayTeam.logo}
                      alt={match.awayTeam.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-xs font-medium truncate max-w-[calc(100%-24px)]">
                    {match.awayTeam.name}
                  </div>
                </div>
              </div>

              {/* Competition */}
              <div className="text-xs text-gray-500 mt-2 text-right">
                {match.competition}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
