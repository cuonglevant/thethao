import React from "react";
import { TopScorerDisplay } from "./top-scorer-display";
import { fetchTopScorers } from "@/lib/api-client";

interface TopScorerProps {
  title?: string;
  competitionCode?: string;
  limit?: number;
}

export async function TopScorer({
  title = "Vua phá lưới",
  competitionCode = "CL",
  limit = 10,
}: TopScorerProps) {
  // Server-side data fetching
  let scorersWithPositions: Array<any> = [];
  let competition = null;
  let error = null;
  let isLoading = false;

  try {
    console.log(
      `Fetching top scorers for ${competitionCode} with limit ${limit}`
    );
    const data = await fetchTopScorers(competitionCode, limit);

    if (!data) {
      throw new Error("No data returned from API");
    }

    competition = data.competition;

    if (!data.scorers || !Array.isArray(data.scorers)) {
      console.error("Invalid scorers data:", data);
      throw new Error("Invalid scorers data structure");
    }

    // Format the data with positions
    scorersWithPositions = data.scorers.map((scorer: any, index: number) => ({
      ...scorer,
      position: index + 1,
    }));

    console.log(`Successfully fetched ${scorersWithPositions.length} scorers`);
  } catch (e) {
    console.error("Error in TopScorer component:", e);
    error = e instanceof Error ? e.message : "Failed to fetch top scorers";
  }

  // Pass the data to the client component
  return (
    <TopScorerDisplay
      title={title}
      scorersWithPositions={scorersWithPositions}
      competition={competition}
      isLoading={isLoading}
      error={error}
    />
  );
}
