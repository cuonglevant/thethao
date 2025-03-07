import React from "react";
import { useGetStandingsData } from "@/lib/useGetData"; // Updated import path
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
  const { standingsData, leagueTable, loading, error } =
    useGetStandingsData(competitionCode);

  // Use the title from data if available and no custom title is provided
  const displayTitle = standingsData?.standings?.[0]?.group || title;

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
      title={displayTitle}
      standings={leagueTable}
      competitionId={competitionCode}
      highlightPosition={highlightPosition}
      isLoading={loading}
    />
  );
};
