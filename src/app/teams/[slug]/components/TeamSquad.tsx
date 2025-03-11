"use client";

import { useState } from "react";
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

  if (loading) {
    return <p>Đang tải thông tin đội hình...</p>;
  }

  if (error) {
    return <p className="text-red-500">Lỗi: {error}</p>;
  }

  if (!team || !team.squad || team.squad.length === 0) {
    return <p>Không có thông tin về đội hình của {displayName}</p>;
  }

  // Group players by position
  const playersByPosition = team.squad.reduce((acc, player) => {
    const position = player.position || "Không xác định";
    if (!acc[position]) {
      acc[position] = [];
    }
    acc[position].push(player);
    return acc;
  }, {} as Record<string, any[]>);

  // Define position order
  const positionOrder = [
    "Goalkeeper",
    "Defence",
    "Midfield",
    "Offence",
    "Không xác định",
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-blue-600 mb-4">
        Đội hình của {displayName}
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
          {positionOrder.map((position) => {
            const players = playersByPosition[position];
            if (!players || players.length === 0) return null;

            return (
              <div key={position} className="bg-white rounded-lg shadow p-4">
                <h3 className="text-lg font-bold mb-3">
                  {position === "Goalkeeper"
                    ? "Thủ môn"
                    : position === "Defence"
                    ? "Hậu vệ"
                    : position === "Midfield"
                    ? "Tiền vệ"
                    : position === "Offence"
                    ? "Tiền đạo"
                    : "Không xác định"}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {players.map((player) => (
                    <div
                      key={player.id}
                      className="bg-gray-50 rounded p-3 text-center cursor-pointer hover:bg-blue-50 transition-colors"
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
                      <p className="font-medium truncate">{player.name}</p>
                      {player.shirtNumber && (
                        <p className="text-sm text-gray-600">
                          #{player.shirtNumber}
                        </p>
                      )}
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
