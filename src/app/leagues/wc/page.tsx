"use client";

import { LeaguePageTemplate } from "@/components/ui/league-page-template";

export default function WorldCupPage() {
  return (
    <LeaguePageTemplate
      code="WC"
      name="FIFA World Cup"
      area="World"
      emblem="https://crests.football-data.org/WC.png"
    />
  );
}
