"use client";

import { useState, useEffect } from "react";
import { MatchSchedule } from "./match-schedule";
import { useGetMatchesByDate } from "@/hooks/useGetMatchesByDate";
import { format, addDays, subDays } from "date-fns";
import { vi } from "date-fns/locale";

interface MatchScheduleContainerProps {
  title?: string;
  days?: number; // Keep for backward compatibility
  teamId?: number;
  dateFrom?: string; // Add explicit date parameters
  dateTo?: string; // Add explicit date parameters
  status?: string; // Add explicit status parameter
}

export function MatchScheduleContainer({
  title = "LỊCH THI ĐẤU",
  days = 1,
  teamId,
  dateFrom: explicitDateFrom,
  dateTo: explicitDateTo,
  status: explicitStatus,
}: Readonly<MatchScheduleContainerProps>) {
  // Calculate date range state
  const [dateRange, setDateRange] = useState(() => {
    // Use explicit dates if provided
    if (explicitDateFrom && explicitDateTo) {
      return {
        dateFrom: explicitDateFrom,
        dateTo: explicitDateTo,
        formattedToday: format(new Date(), "d/M"),
      };
    }

    // Otherwise calculate from days parameter
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (days >= 0) {
      // For upcoming matches (from today to N days in future)
      return {
        dateFrom: format(today, "yyyy-MM-dd"),
        dateTo: format(addDays(today, days), "yyyy-MM-dd"),
        formattedToday: format(today, "d/M"),
      };
    } else {
      // For past matches (from N days ago to yesterday)
      const pastDays = Math.abs(days);
      return {
        dateFrom: format(subDays(today, pastDays), "yyyy-MM-dd"),
        dateTo: format(subDays(today, 1), "yyyy-MM-dd"), // Yesterday
        formattedToday: format(today, "d/M"),
      };
    }
  });

  // Track if we've already tried extending the range
  const [extendedRange, setExtendedRange] = useState(false);

  // Use explicit status if provided, otherwise calculate from days
  const status =
    explicitStatus ||
    (days >= 0
      ? "SCHEDULED,TIMED,IN_PLAY,PAUSED" // For upcoming matches
      : "FINISHED"); // For past matches

  // Fetch matches using your hook with the corrected parameters
  const { matchesByDate, loading, error } = useGetMatchesByDate(
    dateRange.dateFrom,
    dateRange.dateTo,
    teamId,
    status // Pass the appropriate status
  );

  // Check if we found any matches
  const hasMatches = Object.keys(matchesByDate || {}).length > 0;

  // Debug logging
  useEffect(() => {
    console.log("MatchScheduleContainer params:", {
      dateFrom: dateRange.dateFrom,
      dateTo: dateRange.dateTo,
      teamId,
      status,
      hasMatches,
      loading,
      error,
    });
  }, [
    dateRange.dateFrom,
    dateRange.dateTo,
    teamId,
    status,
    hasMatches,
    loading,
    error,
  ]);

  // Extend search range if no matches found
  useEffect(() => {
    if (!loading && !error && teamId && !hasMatches && !extendedRange) {
      console.log(
        "No matches found for team in date range, extending search..."
      );

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Don't extend if using explicit dates
      if (explicitDateFrom && explicitDateTo) {
        setExtendedRange(true);
        return;
      }

      // Extend the range
      if (days >= 0) {
        // For upcoming, look further into the future (next 90 days)
        const newDateRange = {
          dateFrom: format(today, "yyyy-MM-dd"),
          dateTo: format(addDays(today, 90), "yyyy-MM-dd"),
          formattedToday: format(today, "d/M"),
        };
        console.log("Extending upcoming range to:", newDateRange);
        setDateRange(newDateRange);
      } else {
        // For past, look further back (last 90 days)
        const newDateRange = {
          dateFrom: format(subDays(today, 90), "yyyy-MM-dd"),
          dateTo: format(subDays(today, 1), "yyyy-MM-dd"),
          formattedToday: format(today, "d/M"),
        };
        console.log("Extending past range to:", newDateRange);
        setDateRange(newDateRange);
      }

      setExtendedRange(true);
    }
  }, [
    loading,
    error,
    teamId,
    hasMatches,
    extendedRange,
    days,
    explicitDateFrom,
    explicitDateTo,
  ]);

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
          <p className="text-xs mt-2">
            Thử lại sau hoặc chọn khoảng thời gian khác.
          </p>
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
            {teamId ? " cho đội bóng này" : ""} trong thời gian đã chọn
          </p>
          <p className="text-xs mt-2">
            {dateRange.dateFrom} đến {dateRange.dateTo}
          </p>
        </div>
      </div>
    );
  }

  return <MatchSchedule title={title} matchDays={matchDays} />;
}
