"use client";

import React, { useEffect } from "react";
import { useGetStandingsData } from "@/lib/useGetData";
import { LeagueStandings } from "./league-standings";

type LeagueStandingsContainerProps = {
  competitionCode: string;
  title?: string;
  highlightPosition?: number[];
  highlightTeam?: number; // Add this parameter
  limit?: number;
};

export const LeagueStandingsContainer = ({
  competitionCode,
  title = "League Table",
  highlightPosition = [1, 2, 3],
  highlightTeam, // Add this parameter
  limit = 10,
}: LeagueStandingsContainerProps) => {
  const { leagueTable, loading, error } = useGetStandingsData(competitionCode);

  // Debug logging to check if data is being fetched
  useEffect(() => {
    console.log(`LeagueStandingsContainer for ${competitionCode}:`, {
      loading,
      error,
      tableLength: leagueTable?.length,
      highlightTeam,
    });
  }, [competitionCode, loading, error, leagueTable, highlightTeam]);

  if (error) {
    return (
      <div className="bg-white rounded shadow overflow-hidden">
        <div className="bg-blue-800 text-white p-3">
          <h2 className="font-bold text-sm sm:text-base">{title}</h2>
        </div>
        <div className="p-4">
          <p className="text-center text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <LeagueStandings
      title={title}
      standings={leagueTable || []}
      competitionId={competitionCode}
      highlightPosition={highlightPosition}
      highlightTeam={highlightTeam} // Pass it down
      isLoading={loading}
      limit={limit}
    />
  );
};
