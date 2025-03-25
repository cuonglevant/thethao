"use client";

import { LeaguePageTemplate } from "@/components/ui/league-page-template";

export default function BundesligaPage() {
  return (
    <LeaguePageTemplate
      code="BL1"
      name="Bundesliga"
      area="Germany"
      emblem="https://crests.football-data.org/BL1.png"
    />
  );
}
