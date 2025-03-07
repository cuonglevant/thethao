"use client";

import React from "react";
import { useGetStandingsData } from "@/lib/useGetData";
import { LeagueStandings } from "./league-standings";

type LeagueStandingsContainerProps = {
  competitionCode: string;
  title?: string;
  highlightPosition?: number[];
};

export const LeagueStandingsContainer = ({
  competitionCode,
  title = "League Table",
  highlightPosition = [1, 2, 3],
}: LeagueStandingsContainerProps) => {
  const { leagueTable, loading, error } = useGetStandingsData(competitionCode);

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
      standings={leagueTable}
      competitionId={competitionCode}
      highlightPosition={highlightPosition}
      isLoading={loading}
    />
  );
};
