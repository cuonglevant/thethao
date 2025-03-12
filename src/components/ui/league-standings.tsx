"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { StandingTable } from "@/types/Types";

type LeagueStandingsProps = {
  title: string;
  standings: StandingTable[];
  competitionId?: string;
  highlightPosition?: number[];
  highlightTeam?: number; // Add this parameter
  isLoading?: boolean;
  limit?: number;
};

export const LeagueStandings = ({
  title,
  standings,
  competitionId,
  highlightPosition = [1, 2, 3],
  highlightTeam,
  isLoading = false,
  limit = 10,
}: LeagueStandingsProps) => {
  // Limit the standings to display
  const limitedStandings = standings?.slice(0, limit) || [];

  if (isLoading) {
    return (
      <div className="bg-white rounded shadow overflow-hidden">
        <div className="bg-blue-800 text-white p-3">
          <h2 className="font-bold text-sm sm:text-base">{title}</h2>
        </div>
        <div className="p-4">
          <p className="text-center text-gray-500">Loading standings...</p>
        </div>
      </div>
    );
  }

  if (!limitedStandings || limitedStandings.length === 0) {
    return (
      <div className="bg-white rounded shadow overflow-hidden">
        <div className="bg-blue-800 text-white p-3">
          <h2 className="font-bold text-sm sm:text-base">{title}</h2>
        </div>
        <div className="p-4">
          <p className="text-center text-gray-500">
            No standings data available
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded shadow overflow-hidden">
      <div className="bg-blue-800 text-white p-3">
        <h2 className="font-bold text-sm sm:text-base">{title}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="text-xs text-gray-500 uppercase tracking-wider bg-gray-50">
              <th className="px-3 py-2 text-left">Pos</th>
              <th className="px-3 py-2 text-left">Club</th>
              <th className="px-3 py-2 text-center">Pl</th>
              <th className="px-3 py-2 text-center">W</th>
              <th className="px-3 py-2 text-center">D</th>
              <th className="px-3 py-2 text-center">L</th>
              <th className="px-3 py-2 text-center">GD</th>
              <th className="px-3 py-2 text-center">Pts</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {limitedStandings.map((standing) => (
              <tr
                key={standing.team.id}
                className={
                  highlightTeam === standing.team.id
                    ? "bg-yellow-100 font-semibold"
                    : highlightPosition.includes(standing.position)
                    ? "bg-blue-50"
                    : ""
                }
              >
                <td className="px-3 py-2 whitespace-nowrap text-sm">
                  {standing.position}
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <Link
                    href={`/teams/${standing.team.id}-${standing.team.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="flex items-center"
                  >
                    <div className="w-5 h-5 relative mr-2">
                      <Image
                        src={standing.team.crest || "/placeholder.svg"}
                        alt={standing.team.name}
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                    </div>
                    <span className="text-sm font-medium">
                      {standing.team.name}
                    </span>
                  </Link>
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-center text-sm">
                  {standing.playedGames}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-center text-sm">
                  {standing.won}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-center text-sm">
                  {standing.draw}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-center text-sm">
                  {standing.lost}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-center text-sm">
                  {standing.goalDifference}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-center text-sm font-bold">
                  {standing.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
