"use client";

import { useContext, useState, useMemo } from "react";
import { format, isSameDay } from "date-fns";
import { useGetMatchesByDate } from "@/hooks/useGetMatchesByDate";
import { SelectedDateContext } from "./context";

export default function FixturesPage() {
  // Use the selectedDate from context instead of local state
  const selectedDate = useContext(SelectedDateContext);

  // State for filters (only keep the league filter)
  const [selectedLeague, setSelectedLeague] = useState<string>("all");

  // Format date for the API (YYYY-MM-DD)
  const formattedDate = format(selectedDate, "yyyy-MM-dd");

  // Fetch matches for the selected date - only pass the starting date
  const { matches, matchesByCompetition, loading, error } = useGetMatchesByDate(
    formattedDate
    // No second parameter, letting the hook handle adding a day
  );

  // Check if selectedDate is today
  const isToday = isSameDay(selectedDate, new Date());

  // Filter matches based on selected league
  const filteredMatches = useMemo(() => {
    if (!matches || matches.length === 0) return [];

    return matches.filter((match) => {
      // Filter by league/competition
      if (
        selectedLeague !== "all" &&
        match.competition.name !== selectedLeague
      ) {
        return false;
      }

      // Hide matches with "IN_PLAY" status when not viewing today
      if (!isToday && match.status === "IN_PLAY") return false;

      return true;
    });
  }, [matches, selectedLeague, isToday]);

  // Group matches by competition for display
  const groupedMatches = useMemo(() => {
    if (selectedLeague !== "all") {
      // When a league is selected, just show those matches grouped by date
      return {
        [selectedLeague]: filteredMatches,
      };
    } else {
      // When showing all leagues, group by competition
      return Object.entries(matchesByCompetition).reduce(
        (acc, [key, value]) => {
          // Only include competitions that have matches after filtering
          const competitionMatches = value.matches.filter((match) => {
            // Apply the same filtering as above (except league filter)
            return isToday || match.status !== "IN_PLAY";
          });

          if (competitionMatches.length > 0) {
            acc[value.competition.name] = competitionMatches;
          }

          return acc;
        },
        {} as Record<string, any[]>
      );
    }
  }, [filteredMatches, matchesByCompetition, selectedLeague, isToday]);

  // Available leagues for the filter dropdown with priority sorting
  const availableLeagues = useMemo(() => {
    if (!matchesByCompetition) return [];

    const leagues = Object.values(matchesByCompetition).map((item) => ({
      id: item.competition.id,
      name: item.competition.name,
      logo: item.competition.emblem,
    }));

    // Sort leagues to prioritize Champions League and Premier League
    return leagues.sort((a, b) => {
      // Check for Champions League (put first)
      if (a.name.includes("Champions League")) return -1;
      if (b.name.includes("Champions League")) return 1;

      // Check for Premier League (put second)
      if (a.name.includes("Premier League")) return -1;
      if (b.name.includes("Premier League")) return 1;

      // For other leagues, maintain alphabetical order
      return a.name.localeCompare(b.name);
    });
  }, [matchesByCompetition]);

  // Handle league selection
  const handleLeagueChange = (league: string) => {
    setSelectedLeague(league);
  };

  return (
    <div className="container mx-auto">
      {/* Remove the date picker as it's now in the layout */}

      {/* League selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Giải đấu
        </label>
        <select
          value={selectedLeague}
          onChange={(e) => handleLeagueChange(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="all">Tất cả giải đấu</option>

          {/* Render the leagues with priority leagues styled differently */}
          {availableLeagues.map((league) => (
            <option
              key={league.id}
              value={league.name}
              className={
                league.name.includes("Champions League") ||
                league.name.includes("Premier League")
                  ? "font-bold"
                  : ""
              }
            >
              {league.name.includes("Champions League") ||
              league.name.includes("Premier League")
                ? "★ " + league.name
                : league.name}
            </option>
          ))}
        </select>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex justify-center my-8">
          <div className="loader">Loading...</div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded mb-6">
          {error}
        </div>
      )}

      {/* No matches found */}
      {!loading && filteredMatches.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">
            Không có trận đấu nào cho ngày đã chọn.
          </p>
        </div>
      )}

      {/* Match listing */}
      {!loading && (
        <>
          {/* Sort competitions to prioritize Champions League and Premier League */}
          {Object.entries(groupedMatches)
            .sort(([competitionA], [competitionB]) => {
              // Champions League first
              if (competitionA.includes("Champions League")) return -1;
              if (competitionB.includes("Champions League")) return 1;

              // Premier League second
              if (competitionA.includes("Premier League")) return -1;
              if (competitionB.includes("Premier League")) return 1;

              // Alphabetical for the rest
              return competitionA.localeCompare(competitionB);
            })
            .map(([competition, matches]) => (
              <div key={competition} className="mb-8">
                <h2
                  className={`text-lg mb-3 ${
                    competition.includes("Champions League") ||
                    competition.includes("Premier League")
                      ? "font-bold text-blue-700"
                      : "font-semibold"
                  }`}
                >
                  {competition.includes("Champions League") ||
                  competition.includes("Premier League")
                    ? "★ " + competition
                    : competition}
                </h2>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                  {matches.map((match) => (
                    <div
                      key={match.id}
                      className={`border-b last:border-0 p-4 hover:bg-gray-50 ${
                        competition.includes("Champions League")
                          ? "bg-blue-50"
                          : competition.includes("Premier League")
                          ? "bg-purple-50"
                          : ""
                      }`}
                    >
                      <div className="flex items-center">
                        {/* Match time */}
                        <div className="w-16 text-center flex-shrink-0">
                          {match.status === "IN_PLAY" ? (
                            <span className="text-red-600 font-semibold animate-pulse">
                              LIVE
                            </span>
                          ) : match.status === "FINISHED" ? (
                            <span className="text-gray-500 text-sm">FT</span>
                          ) : (
                            <span className="text-gray-700">
                              {format(new Date(match.utcDate), "HH:mm")}
                            </span>
                          )}
                        </div>

                        {/* Teams and Score - Using Grid for perfect centering */}
                        <div className="flex-1 grid grid-cols-3 items-center">
                          {/* Home team - right aligned */}
                          <div className="flex items-center justify-end">
                            <span className="font-medium text-right pr-2">
                              {match.homeTeam.shortName || match.homeTeam.name}
                            </span>
                            {match.homeTeam.crest && (
                              <img
                                src={match.homeTeam.crest}
                                alt={match.homeTeam.name}
                                className="h-5 w-5 object-contain"
                                width={20}
                                height={20}
                              />
                            )}
                          </div>

                          {/* Score or VS - centered */}
                          <div className="flex items-center justify-center">
                            {match.status === "FINISHED" ||
                            match.status === "IN_PLAY" ? (
                              <span className="font-bold">
                                {match.score.fullTime.home} -{" "}
                                {match.score.fullTime.away}
                              </span>
                            ) : (
                              <span className="text-gray-400 font-medium">
                                vs
                              </span>
                            )}
                          </div>

                          {/* Away team - left aligned */}
                          <div className="flex items-center justify-start">
                            {match.awayTeam.crest && (
                              <img
                                src={match.awayTeam.crest}
                                alt={match.awayTeam.name}
                                className="h-5 w-5 object-contain mr-2"
                                width={20}
                                height={20}
                              />
                            )}
                            <span className="font-medium text-left pl-2">
                              {match.awayTeam.shortName || match.awayTeam.name}
                            </span>
                          </div>
                        </div>

                        {/* Venue or additional info */}
                        <div className="w-24 text-right text-xs text-gray-500 flex-shrink-0">
                          {match.venue || match.group || ""}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
}
