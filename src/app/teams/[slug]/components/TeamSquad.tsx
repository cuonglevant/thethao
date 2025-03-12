"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import PlayerDetail from "./PlayerDetail";
import { TeamDetail } from "@/types/Types";

interface TeamSquadProps {
  team: TeamDetail | null;
  loading: boolean;
  error: string | null;
  displayName: string;
}

export default function TeamSquad({
  team,
  loading,
  error,
  displayName,
}: TeamSquadProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
  const [playersByPosition, setPlayersByPosition] = useState<
    Record<string, any[]>
  >({});
  const [allPositions, setAllPositions] = useState<string[]>([]);
  const [ungroupedPlayers, setUngroupedPlayers] = useState<any[]>([]);

  // Group players by position using the custom mapping
  useEffect(() => {
    if (team?.squad) {
      console.log("Team squad data:", team.squad);
      console.log(`Total squad size: ${team.squad.length} players`);

      // Define position categories and mapping
      const positions: Record<string, any[]> = {
        "Thủ môn": [],
        "Hậu vệ": [],
        "Trung vệ": [],
        "Tiền vệ": [],
        "Tiền đạo": [],
        "Tiền đạo cánh trái": [],
        "Tiền đạo cánh phải": [],
        "Hậu vệ cánh trái": [],
        "Hậu vệ cánh phải": [],
        Khác: [], // For players that don't fit elsewhere
      };

      const positionMapping: Record<string, string> = {
        Goalkeeper: "Thủ môn",
        Defence: "Hậu vệ",
        Defender: "Hậu vệ",
        Midfield: "Tiền vệ",
        Midfielder: "Tiền vệ",
        Offence: "Tiền đạo",
        Attacker: "Tiền đạo",
        Forward: "Tiền đạo",
        "Right Winger": "Tiền đạo cánh phải",
        "Left Winger": "Tiền đạo cánh trái",
        "Centre-Forward": "Tiền đạo",
        "Centre-Back": "Trung vệ",
        "Defensive Midfield": "Tiền vệ",
        "Right-Back": "Hậu vệ cánh phải",
        "Left-Back": "Hậu vệ cánh trái",
        "Attacking Midfield": "Tiền vệ",
        "Central Midfield": "Tiền vệ",
      };

      // Track players that don't fit into any category
      const unmatched: any[] = [];

      // Group players by position
      team.squad.forEach((player) => {
        const positionName = player.position;
        const mappedPosition = positionName
          ? positionMapping[positionName]
          : null;

        if (mappedPosition && positions[mappedPosition]) {
          positions[mappedPosition].push(player);
        } else {
          positions["Khác"].push(player);
          unmatched.push(player);
        }
      });

      // Remove empty position categories
      const filteredPositions = Object.entries(positions)
        .filter(([_, players]) => players.length > 0)
        .reduce((obj, [position, players]) => {
          obj[position] = players;
          return obj;
        }, {} as Record<string, any[]>);

      // Set state
      setPlayersByPosition(filteredPositions);
      setAllPositions(Object.keys(filteredPositions));
      setUngroupedPlayers(unmatched);

      // Debug output
      console.log("Players grouped by position:", filteredPositions);
      console.log(`Ungrouped players: ${unmatched.length}`);

      // Count players in each position
      Object.entries(filteredPositions).forEach(([position, players]) => {
        console.log(`${position}: ${players.length} players`);
      });

      // Verify all players are accounted for
      const totalGrouped = Object.values(filteredPositions).reduce(
        (sum, players) => sum + players.length,
        0
      );
      console.log(
        `Total players grouped: ${totalGrouped}/${team.squad.length}`
      );
    }
  }, [team?.squad]);

  if (loading) {
    return <p>Đang tải thông tin đội hình...</p>;
  }

  if (error) {
    return <p className="text-red-500">Lỗi: {error}</p>;
  }

  if (!team || !team.squad || team.squad.length === 0) {
    return <p>Không có thông tin về đội hình của {displayName}</p>;
  }

  // Define position display order (in Vietnamese)
  const positionOrder = [
    "Khác",
    "Tiền đạo",
    "Tiền đạo cánh trái",
    "Tiền đạo cánh phải",
    "Tiền vệ",
    "Trung vệ",
    "Hậu vệ cánh trái",
    "Hậu vệ cánh phải",
    "Hậu vệ",
    "Thủ môn",
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-blue-600 mb-4">
        Đội hình của {displayName} ({team.squad.length} thành viên)
      </h2>

      {selectedPlayer ? (
        <div>
          <button
            onClick={() => setSelectedPlayer(null)}
            className="mb-4 text-blue-600 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Quay lại danh sách
          </button>
          <PlayerDetail player={selectedPlayer} />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Position groups display - only show this view */}
          {positionOrder
            .filter((position) => playersByPosition[position]?.length > 0)
            .map((position) => {
              const players = playersByPosition[position];
              if (!players || players.length === 0) return null;

              return (
                <div key={position} className="bg-white rounded-lg shadow p-4">
                  <h4 className="font-bold mb-2">
                    {position} ({players.length})
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {players.map((player) => (
                      <div
                        key={player.id}
                        className="bg-gray-50 rounded p-3 text-center cursor-pointer hover:bg-blue-50 transition-colors relative group"
                        onClick={() => setSelectedPlayer(player)}
                      >
                        <div className="relative w-16 h-16 mx-auto bg-gray-200 rounded-full mb-2 overflow-hidden">
                          <Image
                            src={`https://via.placeholder.com/100/f5f5f5/2563eb?text=${player.name.charAt(
                              0
                            )}`}
                            alt={player.name}
                            width={100}
                            height={100}
                            className="object-cover"
                          />
                        </div>

                        {/* Name with custom tooltip only (no default tooltip) */}
                        <div className="relative">
                          {/* Removed title attribute to disable default tooltip */}
                          <p className="font-medium truncate">{player.name}</p>

                          {/* Custom tooltip that appears on hover */}
                          <div className="opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-opacity duration-200 absolute z-10 -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                            {player.name}
                          </div>
                        </div>

                        <p className="text-xs text-gray-600">
                          {player.nationality || ""}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
