"use client";

import { useState, useEffect, useMemo } from "react";
import { Match, MatchesByDateResponse } from "@/types/Types";
import { groupMatchesByDate, sortMatchesByDateTime } from "@/utils/matchUtils";

interface DebugInfo {
  requestStarted?: string;
  requestCompleted?: string;
  dates?: { dateFrom: string; dateTo: string };
  matchesCount?: number;
  resultSetCount?: number;
  error?: string;
  errorTime?: string;
}

export function useGetMatchesByDate(
  dateFrom?: string,
  dateTo?: string,
  teamId?: number,
  status?: string
) {
  const [matchesData, setMatchesData] = useState<MatchesByDateResponse | null>(
    null
  );
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<DebugInfo>({});

  useEffect(() => {
    // Always use provided dates, don't default to today
    if (!dateFrom || !dateTo) {
      console.warn("Missing date parameters in useGetMatchesByDate");
      setLoading(false);
      return;
    }

    const loadMatchesByDate = async () => {
      try {
        setLoading(true);

        // Enhanced debugging
        console.log(`Fetching matches with params:`, {
          dateFrom,
          dateTo,
          teamId,
          status,
        });

        // Build query parameters
        const params = new URLSearchParams();
        params.append("dateFrom", dateFrom);
        params.append("dateTo", dateTo);

        if (teamId) params.append("teamId", teamId.toString());
        if (status) params.append("status", status);

        // Use correct API endpoint based on whether we have a teamId
        const endpoint = teamId
          ? `/api/teams/${teamId}/matches`
          : "/api/matches";
        const url = `${endpoint}?${params}`;
        console.log(`Making request to: ${url}`);

        const response = await fetch(url);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `Failed to fetch matches: ${response.status} ${
              response.statusText
            }. ${JSON.stringify(errorData)}`
          );
        }

        const data: MatchesByDateResponse = await response.json();
        console.log(`Received matches data:`, {
          matchCount: data.matches?.length,
          firstMatch: data.matches?.[0],
        });

        setMatchesData(data);
        setMatches(sortMatchesByDateTime(data.matches || []));
        setError(null);
      } catch (err) {
        console.error("Error fetching matches:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    loadMatchesByDate();
  }, [dateFrom, dateTo, teamId, status]);

  // Group matches by date
  const matchesByDate = useMemo(() => {
    return groupMatchesByDate(matches);
  }, [matches]);

  return {
    matchesData,
    matches,
    matchesByDate,
    resultSet: matchesData?.resultSet,
    loading,
    error,
    debugInfo,
  };
}
