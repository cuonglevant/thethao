import { Player } from "../../types/playerTypes";
import { Team } from "../../types/Types";
import Image from "next/image";
import React from "react";

// Update the Scorer interface to make some properties optional or more flexible
interface Scorer {
  player: {
    _id?: string; // Make _id optional
    name: string;
    image: string | { url: string; alt?: string }; // Accept both string and Media object
  };
  team: {
    name: string;
    logo: string;
  };
  goals: number;
  assists?: number;
  appearances?: number;
  matches?: number; // Add this alias for appearances
  position?: number; // Make position optional as we calculate it
}

interface TopScorerProps {
  title?: string;
  scorers?: Scorer[];
}

// Default scorers for demo/fallback
const defaultScorers: Scorer[] = [
  {
    player: {
      _id: "1",
      name: "Rimario Gordon",
      image: {
        url: "/players/rimario-gordon.png",
      },
    },
    team: {
      name: "Nam Định",
      logo: "/teams/nam-dinh.png",
    },
    goals: 10,
    assists: 3,
    appearances: 15,
  },
  {
    player: {
      _id: "2",
      name: "Nguyễn Văn Toàn",
      image: {
        url: "/players/nguyen-van-toan.png",
      },
    },
    team: {
      name: "Hà Nội FC",
      logo: "/placeholder.svg?height=32&width=32",
    },
    goals: 8,
    assists: 5,
    appearances: 14,
  },
  {
    player: {
      _id: "3",
      name: "Nguyễn Tiến Linh",
      image: {
        url: "/players/nguyen-tien-linh.png",
      },
    },
    team: {
      name: "HAGL",
      logo: "/placeholder.svg?height=32&width=32",
    },
    goals: 7,
    assists: 2,
    appearances: 15,
  },
  {
    player: {
      _id: "4",
      name: "Rafaelson",
      image: {
        url: "/players/rafaelson.png",
      },
    },
    team: {
      name: "Thanh Hóa",
      logo: "/placeholder.svg?height=32&width=32",
    },
    goals: 7,
    assists: 1,
    appearances: 13,
  },
  {
    player: {
      _id: "5",
      name: "Geovane",
      image: {
        url: "/players/geovane.png",
      },
    },
    team: {
      name: "Viettel",
      logo: "/placeholder.svg?height=32&width=32",
    },
    goals: 6,
    assists: 4,
    appearances: 15,
  },
];

export function TopScorer({
  title = "VUA PHÁ LƯỚI V-LEAGUE 2024",
  scorers = defaultScorers,
}: TopScorerProps) {
  // Sort the scorers by goals in descending order
  const sortedScorers = React.useMemo(() => {
    return [...scorers].sort((a, b) => b.goals - a.goals);
  }, [scorers]);

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
              <th className="text-left py-2">Tên cầu thủ</th>
              <th className="text-center py-2 w-8 hidden sm:table-cell">Bàn</th>
              <th className="text-center py-2 w-16 hidden sm:table-cell">
                Kiến tạo
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedScorers.map((scorer, index) => {
              // Calculate position (add 1 because index is 0-based)
              // Handle ties - players with same goals get the same position
              const position =
                index > 0 && scorer.goals === sortedScorers[index - 1].goals
                  ? getPositionByIndex(sortedScorers, index)
                  : index + 1;

              return (
                <tr
                  key={scorer.player._id || `player-${index}`}
                  className="hover:bg-gray-50"
                >
                  <td className="py-2">
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 rounded text-sm
                      ${
                        position <= 3 ? "bg-blue-600 text-white" : "bg-gray-100"
                      }`}
                    >
                      {position}
                    </span>
                  </td>
                  <td className="py-2">
                    <div className="flex items-center gap-2">
                      <Image
                        src={
                          typeof scorer.player.image === "string"
                            ? scorer.player.image
                            : scorer.player.image.url
                        }
                        alt={scorer.player.name}
                        width={24}
                        height={24}
                        className="w-6 h-6 rounded-full"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium truncate max-w-[120px] sm:max-w-[150px]">
                          {scorer.player.name}
                        </span>
                        <div className="flex items-center gap-1">
                          <Image
                            src={scorer.team.logo}
                            alt={scorer.team.name}
                            width={16}
                            height={16}
                            className="w-4 h-4"
                          />
                          <span className="text-xs text-gray-500 truncate max-w-[100px]">
                            {scorer.team.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  {/* Add additional table cells for other data */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Helper function to get position considering ties
function getPositionByIndex(
  sortedScorers: Scorer[],
  currentIndex: number
): number {
  // Look backwards until we find a player with different goals
  let position = currentIndex;

  while (
    position > 0 &&
    sortedScorers[position].goals === sortedScorers[position - 1].goals
  ) {
    position--;
  }

  // Position is 1-based, not 0-based
  return position + 1;
}
