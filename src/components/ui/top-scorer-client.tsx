"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Scorer, Competition } from "@/types/Types";

interface TopScorerClientProps {
  title?: string;
  competitionCode?: string;
  limit?: number;
}

export function TopScorerClient({
  title = "Vua phá lưới",
  competitionCode = "PL", // Changed from CL to PL as default
  limit = 10,
}: TopScorerClientProps) {
  const [scorers, setScorers] = useState<Array<Scorer & { position: number }>>(
    []
  );
  const [competition, setCompetition] = useState<Competition | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScorers = async () => {
      try {
        setLoading(true);
        setError(null);

        // Log the request
        console.log(`Fetching top scorers for ${competitionCode}`);

        // Make request to our API endpoint
        const response = await fetch(
          `/api/competitions/${competitionCode}/scorers?limit=${limit}`
        );

        if (!response.ok) {
          throw new Error(
            `API returned ${response.status}: ${response.statusText}`
          );
        }

        const data = await response.json();

        if (!data || !data.scorers || !Array.isArray(data.scorers)) {
          throw new Error("Invalid data format returned from API");
        }

        // Format the data with positions
        const formattedScorers = data.scorers.map(
          (scorer: any, index: number) => ({
            ...scorer,
            position: index + 1,
          })
        );

        setCompetition(data.competition);
        setScorers(formattedScorers);
        console.log(`Successfully loaded ${formattedScorers.length} scorers`);
      } catch (e) {
        console.error("Error fetching top scorers:", e);
        setError(
          e instanceof Error ? e.message : "Failed to load scorers data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchScorers();
  }, [competitionCode, limit]);

  // Use competition name if title is generic
  const displayTitle =
    title === "Vua phá lưới" && competition
      ? `Vua phá lưới ${competition.name}`
      : title;

  if (loading) {
    return (
      <div className="bg-white rounded shadow overflow-hidden">
        <div className="bg-blue-800 text-white p-3">
          <h2 className="font-bold text-sm sm:text-base">{title}</h2>
        </div>
        <div className="p-4 text-center text-gray-500">
          <div className="flex justify-center items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-blue-600 animate-pulse"></div>
            <div className="w-4 h-4 rounded-full bg-blue-600 animate-pulse delay-75"></div>
            <div className="w-4 h-4 rounded-full bg-blue-600 animate-pulse delay-150"></div>
          </div>
          <p className="mt-2">Loading top scorers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded shadow overflow-hidden">
        <div className="bg-blue-800 text-white p-3">
          <h2 className="font-bold text-sm sm:text-base">{title}</h2>
        </div>
        <div className="p-4 text-center text-red-500">
          <p>Error loading data</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-sm text-blue-500 hover:underline"
          >
            Try refreshing the page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded shadow overflow-hidden">
      <div className="bg-blue-800 text-white p-3">
        <h2 className="font-bold text-sm sm:text-base">{displayTitle}</h2>
      </div>

      {scorers.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          No scorer data available
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {scorers.map((scorer) => (
            <div key={scorer.player.id} className="p-3 flex items-center">
              <div className="w-8 text-center font-bold text-gray-700">
                {scorer.position}
              </div>
              <div className="flex-1">
                <div className="font-medium">{scorer.player.name}</div>
                <div className="flex items-center text-sm text-gray-500">
                  {scorer.team.crest ? (
                    <Image
                      src={scorer.team.crest}
                      alt={scorer.team.name}
                      width={16}
                      height={16}
                      className="mr-1"
                    />
                  ) : (
                    <div className="w-4 h-4 bg-gray-200 rounded-full mr-1"></div>
                  )}
                  {scorer.team.name}
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold">{scorer.goals}</div>
                <div className="text-xs text-gray-500">
                  {scorer.playedMatches} matches
                  {scorer.assists != null &&
                    scorer.assists > 0 &&
                    `, ${scorer.assists} assist${
                      scorer.assists !== 1 ? "s" : ""
                    }`}
                  {scorer.penalties != null &&
                    scorer.penalties > 0 &&
                    `, ${scorer.penalties} pen`}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
