"use client";

import { useState, useEffect } from "react";
import { useGetTeamById } from "@/lib/api-client";
import { LeagueStandingsContainer } from "@/components/ui/league-standings-container";
import { Competition } from "@/types/Types";

interface TeamStandingProps {
  teamId: number;
  displayName: string;
}

export default function TeamStanding({
  teamId,
  displayName,
}: TeamStandingProps) {
  // Fetch team data to get competitions
  const { team, loading, error } = useGetTeamById(teamId);
  const [selectedCompetition, setSelectedCompetition] = useState<string | null>(
    null
  );

  // Set the first competition as selected when data loads
  useEffect(() => {
    if (team?.runningCompetitions && team.runningCompetitions.length > 0) {
      // Try to find a league competition first (prioritize leagues)
      const leagueComp = team.runningCompetitions.find(
        (comp) =>
          comp.type === "LEAGUE" ||
          ["PL", "BL1", "SA", "PD", "FL1"].includes(comp.code || "")
      );

      if (leagueComp) {
        setSelectedCompetition(leagueComp.code);
      } else {
        setSelectedCompetition(team.runningCompetitions[0].code);
      }
    }
  }, [team]);

  if (loading) {
    return <p>Đang tải thông tin giải đấu...</p>;
  }

  if (error) {
    return <p className="text-red-500">Lỗi: {error}</p>;
  }

  if (
    !team ||
    !team.runningCompetitions ||
    team.runningCompetitions.length === 0
  ) {
    return (
      <div>
        <h2 className="text-xl font-bold text-blue-600 mb-4">
          Bảng xếp hạng của {displayName}
        </h2>
        <p>Không có thông tin về giải đấu hiện tại của đội bóng.</p>
      </div>
    );
  }

  // Filter competitions to only include those with standings (leagues)
  const competitionsWithStandings = team.runningCompetitions.filter(
    (comp) =>
      comp.type === "LEAGUE" ||
      ["PL", "BL1", "SA", "PD", "FL1", "CL"].includes(comp.code || "")
  );

  if (competitionsWithStandings.length === 0) {
    return (
      <div>
        <h2 className="text-xl font-bold text-blue-600 mb-4">
          Bảng xếp hạng của {displayName}
        </h2>
        <p>{displayName} hiện không tham gia giải đấu nào có bảng xếp hạng.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-blue-600 mb-4">
        Bảng xếp hạng của {displayName}
      </h2>

      {/* Competition selector */}
      {competitionsWithStandings.length > 1 && (
        <div className="mb-4">
          <label
            htmlFor="competition-select"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Chọn giải đấu:
          </label>
          <select
            id="competition-select"
            className="block w-full max-w-xs p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={selectedCompetition || ""}
            onChange={(e) => setSelectedCompetition(e.target.value)}
          >
            {competitionsWithStandings.map((comp) => (
              <option key={comp.code} value={comp.code || ""}>
                {comp.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Show standings for selected competition */}
      {selectedCompetition && (
        <LeagueStandingsContainer
          competitionCode={selectedCompetition}
          title={`BẢNG XẾP HẠNG ${
            team.runningCompetitions
              .find((c) => c.code === selectedCompetition)
              ?.name?.toUpperCase() || ""
          }`}
          highlightTeam={teamId}
          limit={20} // Show full table
        />
      )}
    </div>
  );
}
