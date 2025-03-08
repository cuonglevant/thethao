"use client";

import { useState, useEffect } from "react";
import { MatchSchedule } from "./match-schedule";
import { useGetMatchesByDate } from "@/hooks/useGetMatchesByDate";
import { format, addDays } from "date-fns";
// Import the locale explicitly
import { vi } from "date-fns/locale";

interface MatchScheduleContainerProps {
  title?: string;
  days?: number;
  teamId?: number; // Add this property to the interface
}

export function MatchScheduleContainer({
  title = "LỊCH THI ĐẤU",
  days = 1,
  teamId, // Add the new prop
}: MatchScheduleContainerProps) {
  // Store the dates in state to ensure stable rendering
  const [dateRange, setDateRange] = useState(() => {
    const today = new Date();
    // Set time to start of day to avoid time zone issues
    today.setHours(0, 0, 0, 0);

    return {
      dateFrom: format(today, "yyyy-MM-dd"),
      dateTo: format(addDays(today, days), "yyyy-MM-dd"),
      // Store formatted dates to avoid hydration mismatches
      formattedToday: format(today, "d/M"),
    };
  });

  // Fetch matches using your hook with stable date values and teamId
  const { matchesByDate, loading, error } = useGetMatchesByDate(
    dateRange.dateFrom,
    dateRange.dateTo,
    teamId // Pass the teamId to the hook
  );

  // Convert to the format expected by MatchSchedule with stable formatting
  const matchDays = Object.entries(matchesByDate || {}).map(
    ([dateString, dateMatches]) => {
      const matchDate = new Date(dateString);
      // Set time to start of day to avoid time zone issues
      matchDate.setHours(0, 0, 0, 0);

      return {
        date: format(matchDate, "EEEE, dd/MM", { locale: vi }),
        matches: dateMatches.map((match) => {
          const matchTime = new Date(match.utcDate);

          return {
            time: format(matchTime, "HH:mm"),
            home: {
              name: match.homeTeam.name,
              logo: match.homeTeam.crest || "/placeholder.svg",
            },
            away: {
              name: match.awayTeam.name,
              logo: match.awayTeam.crest || "/placeholder.svg",
            },
          };
        }),
      };
    }
  );

  if (loading) {
    return (
      <div className="bg-white rounded shadow overflow-hidden">
        <div className="bg-blue-800 text-white p-3">
          <h2 className="font-bold text-sm sm:text-base">{title}</h2>
        </div>
        <div className="p-4 text-center text-gray-500">
          <p>Loading match schedule...</p>
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
          <p>Failed to load matches</p>
        </div>
      </div>
    );
  }

  return <MatchSchedule title={title} matchDays={matchDays} />;
}
