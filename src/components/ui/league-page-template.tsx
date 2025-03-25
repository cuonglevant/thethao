"use client";

import { LeagueStandingsContainer } from "./league-standings-container";
import { MatchScheduleContainer } from "./match-schedule-container";
import Image from "next/image";
import { useState } from "react";

interface LeaguePageTemplateProps {
  code: string;
  name: string;
  area: string;
  emblem: string;
}

export function LeaguePageTemplate({
  code,
  name,
  area,
  emblem,
}: LeaguePageTemplateProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* League Header */}
      <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow mb-8">
        <div className="relative w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
          {!imageError ? (
            <Image
              src={emblem}
              alt={name}
              fill
              className="object-contain"
              sizes="64px"
              priority
              onError={() => setImageError(true)}
              unoptimized
            />
          ) : (
            <span className="text-2xl font-bold text-gray-500">
              {name.substring(0, 2)}
            </span>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-gray-600">{area}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Standings Section - Takes up 2/3 of the space on large screens */}
        <div className="lg:col-span-2">
          <LeagueStandingsContainer
            competitionCode={code}
            title={`${name} Standings`}
            highlightPosition={[1, 2, 3, 4]}
          />
        </div>

        {/* Schedule Section - Takes up 1/3 of the space on large screens */}
        <div className="lg:col-span-1">
          <MatchScheduleContainer
            title="Upcoming Matches"
            days={7}
            status="SCHEDULED,TIMED"
            competitionCode={code}
          />
        </div>
      </div>
    </div>
  );
}
