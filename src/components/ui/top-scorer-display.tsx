"use client";

import React from "react";
import { Scorer, Competition } from "@/types/Types";

interface TopScorerDisplayProps {
  title: string;
  scorersWithPositions: Array<Scorer & { position: number }>;
  competition?: Competition;
  isLoading: boolean;
  error?: string | null;
}

export function TopScorerDisplay({
  title,
  scorersWithPositions = [],
  competition,
  isLoading,
  error,
}: TopScorerDisplayProps) {
  // Display loading state
  if (isLoading) {
    return (
      <div className="bg-white rounded shadow overflow-hidden">
        <div className="bg-blue-800 text-white p-3">
          <h2 className="font-bold text-sm sm:text-base">{title}</h2>
        </div>
        <div className="p-4 text-center text-gray-500">
          Loading top scorers...
        </div>
      </div>
    );
  }

  // Display error state
  if (error) {
    return (
      <div className="bg-white rounded shadow overflow-hidden">
        <div className="bg-blue-800 text-white p-3">
          <h2 className="font-bold text-sm sm:text-base">{title}</h2>
        </div>
        <div className="p-4 text-center text-red-500">
          Failed to load top scorers
        </div>
      </div>
    );
  }

  // Use competition name if title is generic
  const displayTitle =
    title === "Vua phá lưới" && competition
      ? `Vua phá lưới ${competition.name}`
      : title;

  return (
    <div className="bg-white rounded shadow overflow-hidden">
      <div className="bg-blue-800 text-white p-3">
        <h2 className="font-bold text-sm sm:text-base">{displayTitle}</h2>
      </div>

      {scorersWithPositions.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          No scorer data available
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {scorersWithPositions.map((scorer) => (
            <div key={scorer.player.id} className="p-3 flex items-center">
              <div className="w-8 text-center font-bold text-gray-700">
                {scorer.position}
              </div>
              <div className="flex-1">
                <div className="font-medium">{scorer.player.name}</div>
                <div className="flex items-center text-sm text-gray-500">
                  <img
                    src={scorer.team.crest}
                    alt={scorer.team.name}
                    className="h-4 w-4 mr-1"
                  />
                  {scorer.team.name}
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold">{scorer.goals}</div>
                <div className="text-xs text-gray-500">
                  {scorer.playedMatches} matches
                  {scorer.assists &&
                    scorer.assists > 0 &&
                    `, ${scorer.assists} assists`}
                  {scorer.penalties &&
                    scorer.penalties > 0 &&
                    `, ${scorer.penalties} pen`}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
