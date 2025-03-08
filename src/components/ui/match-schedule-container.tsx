"use client";

import { useState, useEffect } from "react";
import { MatchSchedule } from "./match-schedule";
import { useGetMatchesByDate } from "@/hooks/useGetMatchesByDate";
import { format, addDays } from "date-fns";
import { vi } from "date-fns/locale";

interface MatchScheduleContainerProps {
  title?: string;
  days?: number;
  teamId?: number;
}

export function MatchScheduleContainer({
  title = "LỊCH THI ĐẤU",
  days = 1,
  teamId,
}: MatchScheduleContainerProps) {
  // Store the dates in state to ensure stable rendering
  const [dateRange, setDateRange] = useState(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return {
      dateFrom: format(today, "yyyy-MM-dd"),
      dateTo: format(addDays(today, days), "yyyy-MM-dd"),
      formattedToday: format(today, "d/M"),
    };
  });

  // For team schedules, use a longer date range if no matches found
  const [extendedRange, setExtendedRange] = useState(false);

  // Fetch matches using your hook
  const { matchesByDate, loading, error } = useGetMatchesByDate(
    dateRange.dateFrom,
    extendedRange ? undefined : dateRange.dateTo, // Skip dateTo for extended range
    teamId
  );

  // Check if we found any matches
  const hasMatches = Object.keys(matchesByDate || {}).length > 0;

  // If teamId is provided and no matches found, try with extended range
  useEffect(() => {
    if (!loading && !error && teamId && !hasMatches && !extendedRange) {
      console.log(
        "No matches found for team in date range, extending search..."
      );
      setExtendedRange(true);
    }
  }, [loading, error, teamId, hasMatches, extendedRange]);

  // Convert to the format expected by MatchSchedule
  const matchDays = Object.entries(matchesByDate || {}).map(
    ([dateString, dateMatches]) => {
      const matchDate = new Date(dateString);
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
          <p>Đang tải lịch thi đấu...</p>
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
          <p>Lỗi: {error}</p>
        </div>
      </div>
    );
  }

  if (!hasMatches) {
    return (
      <div className="bg-white rounded shadow overflow-hidden">
        <div className="bg-blue-800 text-white p-3">
          <h2 className="font-bold text-sm sm:text-base">{title}</h2>
        </div>
        <div className="p-4 text-center text-gray-500">
          <p>
            Không tìm thấy trận đấu nào
            {teamId ? " cho đội bóng này" : ""} trong thời gian sắp tới
          </p>
        </div>
      </div>
    );
  }

  return <MatchSchedule title={title} matchDays={matchDays} />;
}
