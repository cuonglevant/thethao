import { useState, useEffect, useMemo } from "react";
import { Match, MatchesByDateResponse } from "../types/Types";
import { fetchMatchesByDateRange } from "../lib/api-client";
import {
  groupMatchesByDate,
  groupMatchesByCompetition,
  divideMatchesByPastAndUpcoming,
} from "../utils/matchUtils";

// Define an interface for the debug info
interface DebugInfo {
  requestStarted?: string;
  requestCompleted?: string;
  dates?: { dateFrom: string; dateTo: string };
  matchesCount?: number;
  resultSetCount?: number;
  error?: string;
  errorTime?: string;
}

// Add teamId parameter and pass it to the API call
export function useGetMatchesByDate(
  dateFrom?: string,
  dateTo?: string,
  teamId?: number
) {
  const [matchesData, setMatchesData] = useState<MatchesByDateResponse | null>(
    null
  );
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Add debug flag with proper typing
  const [debugInfo, setDebugInfo] = useState<DebugInfo>({});

  useEffect(() => {
    // Default to today's date if no dateFrom provided
    const today = new Date().toISOString().split("T")[0];
    const actualDateFrom = dateFrom ?? today;

    // If no dateTo provided, set it to the next day after dateFrom
    let actualDateTo: string;

    if (dateTo) {
      actualDateTo = dateTo;
    } else {
      // Create a new date from actualDateFrom and add 1 day
      const nextDay = new Date(actualDateFrom);
      nextDay.setDate(nextDay.getDate() + 1);
      // Format it back to YYYY-MM-DD
      actualDateTo = nextDay.toISOString().split("T")[0];
    }

    console.log(
      `🔍 DEBUG: Fetching matches from ${actualDateFrom} to ${actualDateTo}`
    );

    let isMounted = true; // Flag to prevent state updates after unmount

    const loadMatchesByDate = async () => {
      try {
        setLoading(true);

        console.log(
          `🔍 DEBUG: About to call fetchMatchesByDateRange with dates:`,
          {
            dateFrom: actualDateFrom,
            dateTo: actualDateTo,
          }
        );

        // Store request info for debugging
        setDebugInfo((prev: DebugInfo) => ({
          ...prev,
          requestStarted: new Date().toISOString(),
          dates: { dateFrom: actualDateFrom, dateTo: actualDateTo },
        }));

        const data = await fetchMatchesByDateRange(
          actualDateFrom,
          actualDateTo
        );

        console.log(`🔍 DEBUG: Fetch completed successfully. Received data:`, {
          matches: data?.matches?.length,
          resultSetCount: data?.resultSet?.count,
          firstMatch: data?.matches?.[0],
        });

        // Update debug info
        setDebugInfo((prev: DebugInfo) => ({
          ...prev,
          requestCompleted: new Date().toISOString(),
          matchesCount: data?.matches?.length,
          resultSetCount: data?.resultSet?.count,
        }));

        if (isMounted) {
          setMatchesData(data);
          setMatches(data.matches || []);
          setError(null);
        }
      } catch (err) {
        console.error("❌ DEBUG ERROR fetching matches by date:", err);

        // Detailed error logging
        if (err instanceof Error) {
          console.error(`❌ Error name: ${err.name}, message: ${err.message}`);
          console.error(`❌ Error stack:`, err.stack);
        }

        // Update debug info with error
        setDebugInfo((prev: DebugInfo) => ({
          ...prev,
          error: err instanceof Error ? err.message : String(err),
          errorTime: new Date().toISOString(),
        }));

        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "An unknown error occurred"
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }

        console.log(`🔍 DEBUG: Request completed (success or error)`);
      }
    };

    loadMatchesByDate();

    // Cleanup function to avoid setting state after unmount
    return () => {
      isMounted = false;
    };
  }, [dateFrom, dateTo, teamId]); // Add teamId as dependency

  // Debug output on each render
  console.log(`🔍 DEBUG RENDER: ${new Date().toISOString()}`, {
    hasMatchesData: !!matchesData,
    matchesCount: matches.length,
    isLoading: loading,
    hasError: !!error,
    debugInfo,
  });

  // Group matches by competition
  const matchesByCompetition = useMemo(() => {
    return groupMatchesByCompetition(matches);
  }, [matches]);

  // Group matches by date
  const matchesByDate = useMemo(() => {
    return groupMatchesByDate(matches);
  }, [matches]);

  // Get past and upcoming matches
  const { pastMatches, upcomingMatches } = useMemo(() => {
    return divideMatchesByPastAndUpcoming(matches);
  }, [matches]);

  return {
    matchesData,
    matches,
    matchesByCompetition,
    matchesByDate,
    pastMatches,
    upcomingMatches,
    resultSet: matchesData?.resultSet,
    loading,
    error,
    debugInfo,
  };
}
