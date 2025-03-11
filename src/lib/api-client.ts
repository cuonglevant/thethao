"use client";
// Central API client to handle all football data requests

import { SquadPlayer, TeamDetail } from "@/types/Types";
import { useEffect, useMemo } from "react";

import { useState } from "react";

export async function fetchCompetition(code: string) {
  const response = await fetch(`/api/competitions/${code}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const errorMessage = errorData?.error || response.statusText;
    throw new Error(`Failed to fetch competition: ${errorMessage}`);
  }

  return response.json();
}

export async function fetchStandings(code: string) {
  const response = await fetch(`/api/competitions/${code}/standings`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const errorMessage = errorData?.error || response.statusText;
    throw new Error(`Failed to fetch standings: ${errorMessage}`);
  }

  return response.json();
}

// Update the fetchMatches function to handle date ranges

/**
 * Fetch matches based on various filters
 * @param options.code - Competition code (optional)
 * @param options.matchday - Matchday number (optional)
 * @param options.dateFrom - Start date in YYYY-MM-DD format (optional)
 * @param options.dateTo - End date in YYYY-MM-DD format (optional)
 * @param options.teamId - Team ID to filter matches for (optional)
 */
export async function fetchMatches(options: {
  code?: string;
  matchday?: number;
  dateFrom?: string;
  dateTo?: string;
  teamId?: number;
}) {
  const { code, matchday, dateFrom, dateTo, teamId } = options;
  const params = new URLSearchParams();

  // Add optional parameters if they exist
  if (matchday) params.append("matchday", matchday.toString());
  if (dateFrom) params.append("dateFrom", dateFrom);
  if (dateTo) params.append("dateTo", dateTo);

  // Determine the endpoint based on parameters
  let endpoint = "";

  if (teamId) {
    // Team-specific matches
    endpoint = `/api/teams/${teamId}/matches`;
  } else if (code) {
    // Competition-specific matches
    endpoint = `/api/competitions/${code}/matches`;
  } else {
    // Matches across all competitions
    endpoint = `/api/matches`;
  }

  // Append query parameters
  const url = params.toString() ? `${endpoint}?${params}` : endpoint;

  // Actually execute the fetch call
  console.log(`🔍 API-CLIENT: Fetching from ${url}`);

  const response = await fetch(url);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to fetch matches: ${response.status} ${response.statusText}. ${errorText}`
    );
  }

  return await response.json();
}

// Make fetchMatchesByDateRange use the proper date range
export async function fetchMatchesByDateRange(
  dateFrom: string,
  dateTo: string
) {
  console.log(
    `🔍 API-CLIENT: fetchMatchesByDateRange from ${dateFrom} to ${dateTo}`
  );
  return fetchMatches({ dateFrom, dateTo });
}

// Update the fetchTopScorers function to use absolute URLs

export async function fetchTopScorers(competitionCode: string, limit = 10) {
  // Get base URL from environment or use a default
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  // Create absolute URL for server-side fetching
  const url = new URL(`/api/competitions/${competitionCode}/scorers`, baseUrl);
  url.searchParams.append("limit", limit.toString());

  console.log(`Fetching top scorers from: ${url.toString()}`);

  const response = await fetch(url.toString());

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const errorMessage = errorData?.error || response.statusText;
    throw new Error(`Failed to fetch top scorers: ${errorMessage}`);
  }

  return response.json();
}

// Add more API functions as needed

// Updated function in useGetData.ts
export function useGetTeamById(teamId?: number) {
  const [team, setTeam] = useState<TeamDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Don't fetch if no teamId is provided
    if (!teamId) {
      setLoading(false);
      return;
    }

    const fetchTeam = async () => {
      try {
        setLoading(true);

        // IMPORTANT: Use the Next.js API route instead of direct API call
        // This is the key change - use your internal API route
        const response = await fetch(`/api/teams/${teamId}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch team: ${response.statusText}`);
        }

        const data: TeamDetail = await response.json();
        setTeam(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        console.error("Error fetching team data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, [teamId]);

  // Rest of your function remains the same...

  // Group players by position
  const playersByPosition = useMemo(() => {
    if (!team) return {};

    // Your existing code for playersByPosition
    // ...

    return {} as Record<string, SquadPlayer[]>; // Keep your existing code here
  }, [team]);

  // Get competitions the team is participating in
  const competitions = useMemo(() => team?.runningCompetitions || [], [team]);

  return {
    team,
    loading,
    error,
    playersByPosition,
    competitions,
    coach: team?.coach,
    squad: team?.squad || [],
  };
}
