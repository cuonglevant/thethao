"use client";

import React, { useState, useEffect, useMemo } from "react";
import { format, addDays, isSameDay } from "date-fns";
import { vi } from "date-fns/locale";
import { useGetMatchesByDate } from "@/hooks/useGetMatchesByDate";

// Function to format date consistently in UTC to avoid hydration mismatch
function formatDateStable(date, formatStr) {
  // Create a stable string representation by using UTC dates
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  return format(d, formatStr);
}

export default function FixturesPage() {
  // Use state for date handling to avoid hydration errors
  const [dateTabs, setDateTabs] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedLeague, setSelectedLeague] = useState("all");
  const [isClient, setIsClient] = useState(false);

  // Initialize date tabs once on client to avoid hydration mismatch
  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Create stable date tabs with consistent formatting
    const tabs = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i - 3);

      const key = formatDateStable(date, "yyyy-MM-dd");
      const label = formatDateStable(date, "d/M");
      const dayName = formatDateStable(date, "EEEE", { locale: vi });

      return { key, label, dayName, date };
    });

    setDateTabs(tabs);
    setSelectedDate(tabs[3].key); // Default to today (index 3)
    setIsClient(true);
  }, []);

  // Only render date-dependent content after client hydration
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="bg-white rounded shadow p-4">
          <h1 className="text-xl font-bold mb-4">Lịch thi đấu</h1>
          <div className="flex justify-center p-4">
            <p>Đang tải...</p>
          </div>
        </div>
      </div>
    );
  }

  // Rest of your component logic...
  const { matchesByDate, matchesByCompetition, loading, error } =
    useGetMatchesByDate(selectedDate, selectedDate);

  // Check if selectedDate is today
  const isToday = isSameDay(new Date(selectedDate), new Date());

  // Filter matches based on selected league
  const filteredMatches = useMemo(() => {
    if (!matchesByDate || matchesByDate.length === 0) return [];

    return matchesByDate.filter((match) => {
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
  }, [matchesByDate, selectedLeague, isToday]);

  // Safe grouping of matches...
  const groupedMatches = useMemo(() => {
    if (selectedLeague !== "all") {
      return {
        [selectedLeague]: filteredMatches || [],
      };
    } else {
      if (!matchesByCompetition) {
        return {};
      }

      try {
        return Object.entries(matchesByCompetition).reduce(
          (acc, [key, value]) => {
            if (!value || typeof value !== "object") return acc;
            if (!value.matches || !Array.isArray(value.matches)) return acc;
            if (!value.competition) return acc;

            const competitionName = value.competition.name || key;
            const competitionMatches = value.matches.filter((match) => {
              if (!match) return false;
              return true; // Apply your filters here
            });

            if (competitionMatches.length > 0) {
              acc[competitionName] = competitionMatches;
            }

            return acc;
          },
          {}
        );
      } catch (err) {
        console.error("Error processing matchesByCompetition:", err);
        return {};
      }
    }
  }, [filteredMatches, matchesByCompetition, selectedLeague]);

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
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded shadow p-4">
        <h1 className="text-xl font-bold mb-4">Lịch thi đấu</h1>

        {/* Date selector - with stable client-side rendering */}
        <div className="flex items-center justify-between mb-4 overflow-x-auto">
          {dateTabs.map((tab) => (
            <button
              key={tab.key}
              className={`flex flex-col items-center px-3 py-2 rounded ${
                selectedDate === tab.key ? "bg-blue-100 text-blue-700" : ""
              }`}
              onClick={() => setSelectedDate(tab.key)}
            >
              <div className="text-sm font-medium">{tab.label}</div>
              <div className="text-xs text-gray-500">{tab.dayName}</div>
            </button>
          ))}
        </div>

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
                                {match.homeTeam.shortName ||
                                  match.homeTeam.name}
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
                                {match.awayTeam.shortName ||
                                  match.awayTeam.name}
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
    </div>
  );
}
