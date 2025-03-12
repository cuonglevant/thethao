"use client";

import { useState, useEffect, useContext } from "react";
import { format, addDays, parseISO } from "date-fns";
import Image from "next/image";
import { DateContext } from "./layout";
import { vi } from "date-fns/locale";

// Component that renders only on the client side
function ClientOnly({ children, fallback = null }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return fallback || null;
  }

  return <>{children}</>;
}

export default function FixturesPage() {
  const { selectedDate } = useContext(DateContext);
  const [competitions, setCompetitions] = useState([]);
  const [matchesByCompetition, setMatchesByCompetition] = useState({});
  const [selectedLeague, setSelectedLeague] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch matches when the date changes
  useEffect(() => {
    if (!selectedDate) {
      return; // Skip if no date is selected yet
    }

    const fetchMatches = async () => {
      setLoading(true);
      setError(null);

      try {
        // Calculate dateTo as selectedDate + 1 day to get full day matches
        const dateObj = new Date(selectedDate);
        const nextDay = addDays(dateObj, 1);
        const dateTo = format(nextDay, "yyyy-MM-dd");

        // Build API URL with query params
        const params = new URLSearchParams({
          dateFrom: selectedDate,
          dateTo: dateTo,
        });

        const response = await fetch(`/api/matches?${params}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch matches: ${response.status}`);
        }

        const data = await response.json();

        // Process the data
        if (
          !data.matches ||
          !Array.isArray(data.matches) ||
          data.matches.length === 0
        ) {
          setMatchesByCompetition({});
          setCompetitions([]);
          return;
        }

        // Group matches by competition
        const byCompetition = data.matches.reduce((acc, match) => {
          const competition = match.competition;
          if (!competition) return acc;

          if (!acc[competition.id]) {
            acc[competition.id] = {
              competition,
              matches: [],
            };
          }

          acc[competition.id].matches.push(match);
          return acc;
        }, {});

        setMatchesByCompetition(byCompetition);

        // Extract unique competitions for the filter
        const uniqueCompetitions = Array.from(
          new Map(
            data.matches
              .map((match) => [match.competition.id, match.competition])
              .filter(([_, comp]) => comp)
          ).values()
        );

        setCompetitions(uniqueCompetitions);
      } catch (err) {
        console.error("Error fetching matches:", err);
        setError(err.message || "Failed to load matches");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [selectedDate]);

  // Filter matches by selected league
  const filteredCompetitions =
    selectedLeague === "all"
      ? Object.values(matchesByCompetition)
      : Object.values(matchesByCompetition).filter(
          (item) => item.competition?.name === selectedLeague
        );

  // Loading placeholder
  const loadingPlaceholder = (
    <div className="bg-white rounded shadow p-4">
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="grid grid-cols-3 gap-4">
              <div className="h-4 bg-gray-200 rounded col-span-1"></div>
              <div className="h-4 bg-gray-200 rounded col-span-1"></div>
              <div className="h-4 bg-gray-200 rounded col-span-1"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Format match date for display
  const getFormattedMatchDay = (dateString) => {
    try {
      const date = parseISO(dateString);
      return format(date, "EEEE, dd/MM", { locale: vi });
    } catch (e) {
      console.error("Error formatting date:", e);
      return dateString;
    }
  };

  // These determine what to render
  const showLoading = loading || !selectedDate;
  const showNoMatches = !loading && !error && filteredCompetitions.length === 0;
  const showMatches = !loading && !error && filteredCompetitions.length > 0;

  return (
    <ClientOnly fallback={loadingPlaceholder}>
      <div className="bg-white rounded shadow p-4">
        <h1 className="text-xl font-bold mb-4">Lịch thi đấu</h1>

        {/* League filter - only show if there are competitions */}
        {competitions.length > 1 && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chọn giải đấu
            </label>

            <div className="flex flex-wrap gap-2">
              <button
                className={`px-3 py-1 rounded text-sm ${
                  selectedLeague === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => setSelectedLeague("all")}
              >
                Tất cả
              </button>

              {competitions.map((comp) => (
                <button
                  key={comp.id}
                  className={`px-3 py-1 rounded text-sm flex items-center gap-2 ${
                    selectedLeague === comp.name
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  onClick={() => setSelectedLeague(comp.name)}
                >
                  {comp.emblem && (
                    <img
                      src={comp.emblem}
                      alt={comp.name}
                      className="w-4 h-4 object-contain"
                    />
                  )}
                  {comp.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading state */}
        {showLoading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
            <p className="mt-2 text-gray-600">Đang tải lịch thi đấu...</p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded">
            <p>Lỗi: {error}</p>
          </div>
        )}

        {/* No matches state */}
        {showNoMatches && (
          <div className="p-8 text-center text-gray-500">
            <p>Không có trận đấu nào trong ngày này.</p>
          </div>
        )}

        {/* Match listings by competition */}
        {showMatches && (
          <div className="space-y-6">
            {filteredCompetitions.map(({ competition, matches }) => (
              <div
                key={competition.id}
                className="border rounded overflow-hidden"
              >
                <div className="bg-blue-800 text-white p-3 flex items-center gap-2">
                  {competition.emblem && (
                    <img
                      src={competition.emblem}
                      alt={competition.name}
                      className="w-5 h-5 object-contain"
                    />
                  )}
                  <h2 className="font-bold">{competition.name}</h2>
                </div>

                <div className="divide-y">
                  {matches.map((match) => (
                    <div key={match.id} className="p-3">
                      <div className="flex items-center">
                        {/* Match time */}
                        <div className="w-16 text-center">
                          {match.status === "IN_PLAY" ? (
                            <span className="text-red-600 font-semibold animate-pulse">
                              LIVE
                            </span>
                          ) : match.status === "FINISHED" ? (
                            <span className="text-gray-500 text-sm">FT</span>
                          ) : (
                            <span className="text-gray-700">
                              {format(parseISO(match.utcDate), "HH:mm")}
                            </span>
                          )}
                        </div>

                        <div className="flex-1 grid grid-cols-9 items-center">
                          {/* Home team - 4 cols */}
                          <div className="col-span-4 flex items-center justify-end">
                            <span className="font-medium text-right mr-2">
                              {match.homeTeam?.shortName ||
                                match.homeTeam?.name}
                            </span>
                            <div className="w-6 h-6 relative">
                              <img
                                src={
                                  match.homeTeam?.crest || "/placeholder.svg"
                                }
                                alt={match.homeTeam?.name}
                                className="w-full h-full object-contain"
                                width={24}
                                height={24}
                              />
                            </div>
                          </div>

                          {/* Score - 1 col */}
                          <div className="col-span-1 flex items-center justify-center">
                            {match.status === "FINISHED" ||
                            match.status === "IN_PLAY" ? (
                              <span
                                className={`font-bold ${
                                  match.status === "IN_PLAY"
                                    ? "text-red-600"
                                    : ""
                                }`}
                              >
                                {match.score?.fullTime?.home ?? 0} -{" "}
                                {match.score?.fullTime?.away ?? 0}
                              </span>
                            ) : (
                              <span className="text-gray-400">vs</span>
                            )}
                          </div>

                          {/* Away team - 4 cols */}
                          <div className="col-span-4 flex items-center">
                            <div className="w-6 h-6 relative">
                              <img
                                src={
                                  match.awayTeam?.crest || "/placeholder.svg"
                                }
                                alt={match.awayTeam?.name}
                                className="w-full h-full object-contain"
                                width={24}
                                height={24}
                              />
                            </div>
                            <span className="font-medium ml-2">
                              {match.awayTeam?.shortName ||
                                match.awayTeam?.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ClientOnly>
  );
}
