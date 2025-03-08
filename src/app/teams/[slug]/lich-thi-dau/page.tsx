"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { format, addDays } from "date-fns";
import { vi } from "date-fns/locale";
import { MatchSchedule } from "@/components/ui/match-schedule";
import { useGetTeamById } from "@/lib/useGetData";

// Updated interface to match the API response structure
interface Competition {
  id: number;
  name: string;
  code?: string | null;
  emblem?: string | null;
  type?: string | null;
  area?: {
    id: number;
    name: string;
    code?: string;
    flag?: string | null;
  } | null;
}

// Helper component to render competitions
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
  const teamId = Number(slug.split("-")[0]);

  // Team data
  const { team, loading: teamLoading } = useGetTeamById(teamId);
  const displayName =
    team?.name || slug.replace(/^\d+-/, "").replace(/-/g, " ");

  // Matches data state
  const [matchDays, setMatchDays] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTeamMatches() {
      try {
        setLoading(true);

        // Get today's date for filtering
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dateFrom = format(today, "yyyy-MM-dd");

        // Set dateTo to 60 days in future to get more matches
        const future = new Date(today);
        future.setDate(future.getDate() + 60);
        const dateTo = format(future, "yyyy-MM-dd");

        // Use the next API route to proxy the Football API request
        const baseUrl =
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

        // Properly encode status values and include dateTo parameter
        const status = encodeURIComponent("SCHEDULED,TIMED,IN_PLAY,PAUSED");
        const url = `${baseUrl}/api/teams/${teamId}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}&status=${status}`;

        console.log(`Fetching team matches from: ${url}`);
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error fetching matches: ${response.status}`);
        }

        const data = await response.json();
        console.log(`Received ${data.matches?.length || 0} team matches`);

        // Group matches by date
        const matchesByDate: Record<string, any[]> = {};
        data.matches?.forEach((match: any) => {
          const matchDate = match.utcDate.split("T")[0];
          if (!matchesByDate[matchDate]) {
            matchesByDate[matchDate] = [];
          }
          matchesByDate[matchDate].push(match);
        });

        // Convert to MatchSchedule format
        const formattedMatchDays = Object.entries(matchesByDate).map(
          ([dateString, dateMatches]) => {
            const matchDate = new Date(dateString);
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

        setMatchDays(formattedMatchDays);
        setError(null);
      } catch (err) {
        console.error("Error fetching team matches:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch matches"
        );
      } finally {
        setLoading(false);
      }
    }

    if (teamId) {
      fetchTeamMatches();
    }
  }, [teamId]);

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
        {loading ? (
          <div className="p-4 text-center">Đang tải lịch thi đấu...</div>
        ) : error ? (
          <div className="p-4 text-center text-red-500">{error}</div>
        ) : matchDays.length === 0 ? (
          <div className="p-4 text-center">
            Không tìm thấy trận đấu nào cho đội bóng này
          </div>
        ) : (
          <MatchSchedule
            title={`Lịch thi đấu: ${displayName}`}
            matchDays={matchDays}
          />
        )}
      </div>

      {/* Additional information */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-medium mb-2">Thông tin giải đấu</h3>
        {teamLoading ? (
          <p>Đang tải...</p>
        ) : (
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
