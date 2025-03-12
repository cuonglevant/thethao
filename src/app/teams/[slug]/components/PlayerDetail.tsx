"use client";

import Image from "next/image";
import { format, parseISO, differenceInYears } from "date-fns";

interface PlayerDetailProps {
  player: {
    id: number;
    name: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    nationality: string;
    section?: string;
    position: string;
    shirtNumber?: number;
    lastUpdated?: string;
    currentTeam?: {
      area?: {
        id: number;
        name: string;
        code: string;
        flag?: string;
      };
      id: number;
      name: string;
      shortName?: string;
      tla?: string;
      crest?: string;
      contract?: {
        start?: string;
        until?: string | null;
      };
    };
  };
}

export default function PlayerDetail({ player }: PlayerDetailProps) {
  // Calculate age if date of birth is available
  const age = player.dateOfBirth
    ? differenceInYears(new Date(), parseISO(player.dateOfBirth))
    : null;

  // Format date of birth
  const formattedDateOfBirth = player.dateOfBirth
    ? format(parseISO(player.dateOfBirth), "dd/MM/yyyy")
    : "N/A";

  // Get player initial for displaying
  const playerInitial = player.name.charAt(0).toUpperCase();

  console.log(player);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="bg-blue-600 text-white p-4">
        <h2 className="text-xl font-bold">{player.name}</h2>
        <p className="text-sm opacity-90">{player.position}</p>
      </div>

      <div className="p-4 flex flex-col md:flex-row">
        {/* Left column with player photo */}
        <div className="md:w-1/3 flex justify-center mb-4 md:mb-0">
          <div className="relative w-48 h-48 bg-gray-100 rounded-full overflow-hidden border-4 border-blue-100">
            <Image
              src="/placeholder.png"
              alt={player.name}
              fill
              className="object-cover"
            />
            {/* Display player initial */}
            {/* <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-blue-600">
              {playerInitial}
            </div> */}
            {player.shirtNumber && (
              <div className="absolute bottom-0 right-0 bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                {player.shirtNumber}
              </div>
            )}
          </div>
        </div>

        {/* Right column with player details */}
        <div className="md:w-2/3 md:pl-4">
          <h3 className="font-bold text-lg mb-2">Thông tin cá nhân</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <p>
                <span className="font-medium">Quốc tịch:</span>{" "}
                {player.nationality}
              </p>
              <p>
                <span className="font-medium">Ngày sinh:</span>{" "}
                {formattedDateOfBirth}
                {age && (
                  <span className="text-gray-500 text-sm ml-1">
                    ({age} tuổi)
                  </span>
                )}
              </p>
              <p>
                <span className="font-medium">Vị trí:</span> {player.position}
              </p>
              {player.shirtNumber && (
                <p>
                  <span className="font-medium">Số áo:</span>{" "}
                  {player.shirtNumber}
                </p>
              )}
            </div>

            {player.currentTeam && (
              <div>
                <p>
                  <span className="font-medium">Câu lạc bộ hiện tại:</span>{" "}
                  {player.currentTeam.name}
                </p>
                {player.currentTeam.contract && (
                  <p>
                    <span className="font-medium">Hợp đồng:</span>{" "}
                    {player.currentTeam.contract.start || "N/A"}
                    {player.currentTeam.contract.until
                      ? ` đến ${player.currentTeam.contract.until}`
                      : " (không xác định)"}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Current team details */}
          {player.currentTeam && player.currentTeam.crest && (
            <div className="mt-4">
              <h3 className="font-bold text-lg mb-2">Đội bóng hiện tại</h3>
              <div className="flex items-center gap-3">
                <Image
                  src={player.currentTeam.crest}
                  alt={player.currentTeam.name}
                  width={40}
                  height={40}
                  className="object-contain"
                  unoptimized
                />
                <div>
                  <p className="font-medium">{player.currentTeam.name}</p>
                  {player.currentTeam.area && (
                    <p className="text-sm text-gray-600">
                      {player.currentTeam.area.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
