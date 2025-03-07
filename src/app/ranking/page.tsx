"use client";

import { LeagueStandingsContainer } from "@/components/ui/league-standings-container";

export default function RankingsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-[1200px]">
      <h1 className="text-2xl font-bold mb-6">Bảng Xếp Hạng</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vietnamese League */}
        <div className="mb-6">
          <LeagueStandingsContainer
            competitionCode="CL"
            title="Champions League 2024"
            highlightPosition={[1, 2, 3]}
          />
        </div>

        {/* Premier League */}
        <div className="mb-6">
          <LeagueStandingsContainer
            competitionCode="PL"
            title="Premier League 2024"
            highlightPosition={[1, 2, 3, 4]}
          />
        </div>
      </div>

      {/* Additional Leagues */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {/* La Liga */}
        <LeagueStandingsContainer competitionCode="PD" title="La Liga" />

        {/* Bundesliga */}
        <LeagueStandingsContainer competitionCode="BL1" title="Bundesliga" />

        {/* Serie A */}
        <LeagueStandingsContainer competitionCode="SA" title="Serie A" />

        {/* Ligue 1 */}
        <LeagueStandingsContainer competitionCode="FL1" title="Ligue 1" />

        {/* Eredivisie */}
        <LeagueStandingsContainer competitionCode="DED" title="Eredivisie" />

        {/* Portuguese Liga */}
        <LeagueStandingsContainer competitionCode="PPL" title="Primeira Liga" />
      </div>
    </div>
  );
}
