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
  isLoading?: boolean;
  limit?: number; // Add a limit prop with default value of 10
};

export const LeagueStandings = ({
  title,
  standings,
  competitionId,
  highlightPosition = [1, 2, 3],
  isLoading = false,
  limit = 10, // Add a limit prop with default value of 10
}: LeagueStandingsProps) => {
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

  if (!standings || standings.length === 0) {
    return (
      <div className="bg-white rounded shadow overflow-hidden">
        <div className="bg-blue-800 text-white p-3">
          <h2 className="font-bold text-sm sm:text-base">{title}</h2>
        </div>
        <div className="p-4">
          <p className="text-center text-gray-500">
            No standings data available.
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
      <div className="p-4 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-sm text-gray-600 border-b">
              <th className="text-left py-2 w-8">#</th>
              <th className="text-left py-2">Đội</th>
              <th className="text-center py-2 w-8 hidden sm:table-cell">Tr</th>
              <th className="text-center py-2 w-8 hidden sm:table-cell">T</th>
              <th className="text-center py-2 w-8 hidden sm:table-cell">H</th>
              <th className="text-center py-2 w-8 hidden sm:table-cell">B</th>
              <th className="text-center py-2 w-8 hidden sm:table-cell">HS</th>
              <th className="text-center py-2 w-12">Đ</th>
            </tr>
          </thead>
          <tbody>
            {standings.slice(0, limit).map((team) => (
              <tr key={team.position} className="hover:bg-gray-50">
                <td className="py-2">
                  <span
                    className={`inline-flex items-center justify-center w-6 h-6 rounded text-sm
                    ${
                      highlightPosition.includes(team.position)
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {team.position}
                  </span>
                </td>
                <td className="py-2">
                  <Link
                    href={`/teams/${team.team.id}`}
                    className="flex items-center"
                  >
                    {team.team.crest && (
                      <div className="mr-2 flex-shrink-0">
                        <Image
                          src={team.team.crest}
                          alt={team.team.shortName || team.team.name}
                          width={20}
                          height={20}
                        />
                      </div>
                    )}
                    <span className="text-sm font-medium">
                      {team.team.shortName || team.team.name}
                    </span>
                  </Link>
                </td>
                <td className="text-center py-2 hidden sm:table-cell">
                  {team.playedGames}
                </td>
                <td className="text-center py-2 hidden sm:table-cell">
                  {team.won}
                </td>
                <td className="text-center py-2 hidden sm:table-cell">
                  {team.draw}
                </td>
                <td className="text-center py-2 hidden sm:table-cell">
                  {team.lost}
                </td>
                <td className="text-center py-2 hidden sm:table-cell">
                  {team.goalDifference}
                </td>
                <td className="text-center py-2 font-bold">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
