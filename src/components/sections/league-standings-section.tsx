"use client";

import React from "react";
import { LeagueStandingsContainer } from "../ui/league-standings-container";

export function LeagueStandingsSection() {
  return (
    <div className="space-y-4">
      <LeagueStandingsContainer competitionCode="PL" title="Premier League" />
      <LeagueStandingsContainer competitionCode="CL" title="Champions League" />
      {/* Add more leagues as needed */}
    </div>
  );
}
