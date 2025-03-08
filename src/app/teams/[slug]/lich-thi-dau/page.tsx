"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { MatchScheduleContainer } from "@/components/ui/match-schedule-container";
import { useGetTeamById } from "@/lib/useGetData";

// Updated interface to match the API response structure
interface Competition {
  id: number;
  name: string;
  code?: string | null;
  emblem?: string | null; // Changed to allow null values
  type?: string | null;
  area?: {
    id: number;
    name: string;
    code?: string;
    flag?: string | null;
  } | null;
}

// Helper component to render competitions with proper types
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
              width={20}
              height={20}
              className="object-contain"
            />
          )}
          <span className="text-sm">{comp.name}</span>
        </div>
      ))}
    </div>
  );
}

export default function TeamSchedulePage() {
  const params = useParams();
  const slug = params.slug as string;

  // Extract team ID from the slug (format: "66-manchester-united")
  const teamId = Number(slug.split("-")[0]);

  // Fetch team data using the hook
  const { team, loading } = useGetTeamById(teamId);

  // Format team name
  const displayName =
    team?.name || slug.replace(/^\d+-/, "").replace(/-/g, " ");

  return (
    <div className="space-y-4">
      {/* Team schedule heading */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-bold text-blue-600 mb-2">
          Lịch thi đấu: {displayName}
        </h2>
        <p className="text-sm text-gray-600">
          Lịch thi đấu sắp tới của đội bóng
        </p>
      </div>

      {/* Match Schedule */}
      <div className="bg-white rounded-lg shadow">
        <MatchScheduleContainer
          days={7}
          title={`Lịch thi đấu: ${displayName}`}
          teamId={teamId}
        />
      </div>

      {/* Additional information */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-medium mb-2">Thông tin giải đấu</h3>
        {loading ? (
          <p>Đang tải...</p>
        ) : (
          // Type assertion here to handle the compatibility
          <CompetitionsList
            competitions={
              team?.runningCompetitions as Competition[] | undefined
            }
          />
        )}
      </div>
    </div>
  );
}
