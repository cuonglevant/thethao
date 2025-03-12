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
  const [isProcessing, setIsProcessing] = useState<boolean>(true);

  // Group players by position using the custom mapping
  useEffect(() => {
    if (team?.squad) {
      console.log("Team squad data:", team.squad);
      console.log(`Total squad size: ${team.squad.length} players`);

      // Define position mapping for standardization
      const positionMap: Record<string, string> = {
        Goalkeeper: "Goalkeeper",
        Keeper: "Goalkeeper",
        GK: "Goalkeeper",
        Defence: "Defender",
        Defender: "Defender",
        "Centre-Back": "Defender",
        "Centre Back": "Defender",
        CB: "Defender",
        "Right-Back": "Defender",
        "Left-Back": "Defender",
        RB: "Defender",
        LB: "Defender",
        Midfield: "Midfielder",
        Midfielder: "Midfielder",
        "Defensive Midfield": "Midfielder",
        "Central Midfield": "Midfielder",
        "Attacking Midfield": "Midfielder",
        DMF: "Midfielder",
        CMF: "Midfielder",
        AMF: "Midfielder",
        Offence: "Forward",
        Forward: "Forward",
        Attack: "Forward",
        Attacker: "Forward",
        Striker: "Forward",
        "Centre-Forward": "Forward",
        CF: "Forward",
        "Left Wing": "Forward",
        "Right Wing": "Forward",
      };

      try {
        // Define display order for positions
        const positionOrder: Record<string, number> = {
          Goalkeeper: 1,
          Defender: 2,
          Midfielder: 3,
          Forward: 4,
          Other: 5,
        };

        // Initialize positions
        const positionGroups: Record<string, any[]> = {
          Goalkeeper: [],
          Defender: [],
          Midfielder: [],
          Forward: [],
          Other: [],
        };

        // Players that couldn't be categorized
        const unassigned: any[] = [];

        // Categorize each player
        team.squad.forEach((player) => {
          if (!player) return;

          const rawPosition = player.position || "";
          // Standardize the position name
          const standardPosition = positionMap[rawPosition] || "Other";

          // Add to the appropriate group
          if (positionGroups[standardPosition]) {
            positionGroups[standardPosition].push(player);
          } else {
            positionGroups["Other"].push(player);
            unassigned.push(player);
          }
        });

        // Remove empty categories
        const filteredPositions: Record<string, any[]> = {};
        const positionNames: string[] = [];

        Object.entries(positionGroups).forEach(([position, players]) => {
          if (players.length > 0) {
            filteredPositions[position] = players;
            positionNames.push(position);
          }
        });

        // Sort positions by order
        positionNames.sort(
          (a, b) => (positionOrder[a] || 999) - (positionOrder[b] || 999)
        );

        // Set state values
        setPlayersByPosition(filteredPositions);
        setAllPositions(positionNames);
        setUngroupedPlayers(unassigned);
      } catch (err) {
        console.error("Error processing team squad data:", err);
        // If there's an error in categorization, just group everyone together
        if (team.squad.length > 0) {
          setPlayersByPosition({ "Team Squad": team.squad });
          setAllPositions(["Team Squad"]);
        }
      } finally {
        setIsProcessing(false);
      }
    } else {
      setIsProcessing(false);
    }
  }, [team?.squad]);

  // Show loading state
  if (loading || isProcessing) {
    return (
      <div className="p-4 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent mb-2"></div>
        <p>Loading squad data...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded shadow">
        <p>Error loading team data: {error}</p>
      </div>
    );
  }

  // Show empty state if no team or no squad data
  if (!team || !team.squad || team.squad.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-4 text-center py-8">
        <p className="text-gray-500 mb-2">
          No squad information available for {displayName || "this team"}.
        </p>
        <p className="text-sm text-gray-400">
          Player data may be temporarily unavailable from the data source.
        </p>
      </div>
    );
  }

  // Show empty state if no positions were found
  if (Object.keys(playersByPosition).length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-4 text-center py-8">
        <p className="text-gray-500">
          Unable to categorize players for {displayName || "this team"}.
        </p>
        <div className="mt-4">
          <button
            onClick={() => {
              // Simply group all players together
              setPlayersByPosition({ "All Players": team.squad });
              setAllPositions(["All Players"]);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Show All Players
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Modal for player details */}
      {selectedPlayer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Chi tiết cầu thủ</h3>
                <button
                  onClick={() => setSelectedPlayer(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Player details component */}
              <PlayerDetail player={selectedPlayer} />
            </div>
          </div>
        </div>
      )}

      {/* Display players by position */}
      <div className="space-y-6">
        {allPositions.map((position) => {
          const players = playersByPosition[position] || [];
          if (players.length === 0) return null;

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
                        src="/placeholder.png"
                        alt={player.name}
                        width={100}
                        height={100}
                        className="object-cover"
                      />
                      {/* Display player initial */}
                      <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-gray-400">
                        {player.name?.charAt(0).toUpperCase() || "?"}
                      </div>
                      {player.shirtNumber && (
                        <div className="absolute bottom-0 right-0 bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                          {player.shirtNumber}
                        </div>
                      )}
                    </div>

                    {/* Name with custom tooltip only (no default tooltip) */}
                    <div className="relative">
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
    </div>
  );
}
