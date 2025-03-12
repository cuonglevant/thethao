"use client";

import { useState } from "react";
import { useGetTeamById } from "@/lib/api-client";
import { format, addDays, subDays } from "date-fns"; // Changed to use subDays instead of addMonths
import { vi } from "date-fns/locale";
import Image from "next/image";
import { MatchScheduleContainer } from "@/components/ui/match-schedule-container";

// Update the Competition interface to match RunningCompetition structure
interface Competition {
  id: number;
  name: string;
  code?: string | null;
  emblem?: string | null; // Changed from string to string | null
  type?: string | null;
  area?: {
    id: number;
    name: string;
    code?: string;
    flag?: string | null;
  } | null;
}

interface TeamScheduleProps {
  teamId: number;
  displayName: string;
}

function CompetitionsList({ competitions }: { competitions?: Competition[] }) {
  if (!competitions || competitions.length === 0) {
    return (
      <p className="text-sm text-gray-600">Không có thông tin về giải đấu</p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      {competitions.map((comp) => (
        <div key={comp.id} className="flex items-center gap-2">
          {comp.emblem && (
            <Image
              src={comp.emblem}
              alt={comp.name}
              width={24}
              height={24}
              className="object-contain"
            />
          )}
          <span className="text-sm">{comp.name}</span>
        </div>
      ))}
    </div>
  );
}

export default function TeamSchedule({
  teamId,
  displayName,
}: TeamScheduleProps) {
  // Fetch team data to get competitions
  const { team } = useGetTeamById(teamId);

  // Date tabs for upcoming and past matches
  const [dateView, setDateView] = useState<"upcoming" | "past">("upcoming");

  // Calculate dynamic date ranges based on the current date
  const today = new Date();
  const dateRanges = {
    upcoming: {
      // Next 30 days
      dateFrom: format(today, "yyyy-MM-dd"),
      dateTo: format(addDays(today, 30), "yyyy-MM-dd"),
      status: "SCHEDULED,TIMED,IN_PLAY,PAUSED",
    },
    past: {
      // Last 30 days
      dateFrom: format(subDays(today, 30), "yyyy-MM-dd"),
      dateTo: format(subDays(today, 1), "yyyy-MM-dd"), // Yesterday
      status: "FINISHED",
    },
  };

  // Log current state and dates for debugging
  console.log(`TeamSchedule - Current view: ${dateView}`, {
    ...dateRanges[dateView],
    currentDate: format(today, "yyyy-MM-dd"),
  });

  return (
    <div>
      <h2 className="text-xl font-bold text-blue-600 mb-4">
        Lịch thi đấu của {displayName}
      </h2>

      {/* Competition list if available */}
      {team?.runningCompetitions && team.runningCompetitions.length > 0 && (
        <div className="mb-4">
          <h3 className="font-medium text-sm mb-2">Giải đấu tham gia:</h3>
          <CompetitionsList
            competitions={team.runningCompetitions as Competition[]}
          />
        </div>
      )}

      {/* Date range tabs */}
      <div className="flex mb-4 border-b">
        <button
          onClick={() => setDateView("upcoming")}
          className={`px-4 py-2 font-medium ${
            dateView === "upcoming"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600"
          }`}
        >
          Sắp diễn ra
        </button>
        <button
          onClick={() => setDateView("past")}
          className={`px-4 py-2 font-medium ${
            dateView === "past"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600"
          }`}
        >
          Đã diễn ra
        </button>
      </div>

      <div className="space-y-6">
        {/* Add more specific key to force component re-render when tab changes */}
        <MatchScheduleContainer
          key={`matches-${dateView}-${teamId}`}
          title={
            dateView === "upcoming" ? "TRẬN ĐẤU SẮP TỚI" : "TRẬN ĐẤU ĐÃ DIỄN RA"
          }
          dateFrom={dateRanges[dateView].dateFrom}
          dateTo={dateRanges[dateView].dateTo}
          status={dateRanges[dateView].status}
          teamId={teamId}
        />
      </div>
    </div>
  );
}
