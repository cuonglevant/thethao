"use client";

import { LeaguePageTemplate } from "@/components/ui/league-page-template";

export default function ChampionsLeaguePage() {
  return (
    <LeaguePageTemplate
      code="CL"
      name="UEFA Champions League"
      area="Europe"
      emblem="https://crests.football-data.org/CL.png"
    />
  );
}
