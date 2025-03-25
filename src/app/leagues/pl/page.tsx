"use client";

import { LeaguePageTemplate } from "@/components/ui/league-page-template";

export default function PremierLeaguePage() {
  return (
    <LeaguePageTemplate
      code="PL"
      name="Premier League"
      area="England"
      emblem="https://crests.football-data.org/PL.png"
    />
  );
}
