"use client";

import React from "react";
import { LeagueStandingsContainer } from "./league-standings-container";

export function ClientLeagueStandingsWrapper() {
  return (
    <div className="space-y-6">
      <LeagueStandingsContainer
        competitionCode="CL"
        title="UEFA CHAMPIONS LEAGUE"
        highlightPosition={[1, 2]}
      />
      <LeagueStandingsContainer
        competitionCode="PL"
        title="BẢNG XẾP HẠNG NGOẠI HẠNG ANH"
        highlightPosition={[1, 2, 3, 4]}
      />
      <LeagueStandingsContainer competitionCode="BL1" title="BUNDESLIGA" />
    </div>
  );
}
