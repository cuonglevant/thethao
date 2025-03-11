"use client";

import Image from "next/image";
import { TeamDetail } from "@/types/Types";

interface TeamOverviewProps {
  loading: boolean;
  error: string | null;
  team: TeamDetail | null;
  displayName: string;
}

export default function TeamOverview({
  loading,
  error,
  team,
  displayName,
}: TeamOverviewProps) {
  if (loading) {
    return <p>Đang tải thông tin đội bóng...</p>;
  }

  if (error) {
    return <p className="text-red-500">Lỗi: {error}</p>;
  }

  if (!team) {
    return <p>Không có thông tin chi tiết về đội bóng.</p>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-blue-600 mb-4">
        Tổng quan về {team.name || displayName}
      </h2>

      {/* Basic Team Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-bold text-lg mb-2">Thông tin cơ bản</h3>
          <div className="space-y-1">
            <p>
              <span className="font-medium">Tên đầy đủ:</span>{" "}
              {team.name || "N/A"}
            </p>
            <p>
              <span className="font-medium">Tên ngắn:</span>{" "}
              {team.shortName || "N/A"}
            </p>
            <p>
              <span className="font-medium">Thành lập:</span>{" "}
              {team.founded || "N/A"}
            </p>
            <p>
              <span className="font-medium">Sân vận động:</span>{" "}
              {team.venue || "N/A"}
            </p>
            {team.coach && (
              <p>
                <span className="font-medium">HLV:</span> {team.coach.name}
              </p>
            )}
          </div>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2">Liên hệ</h3>
          <div className="space-y-1">
            <p>
              <span className="font-medium">Địa chỉ:</span>{" "}
              {team.address || "N/A"}
            </p>
            <p>
              <span className="font-medium">Website:</span>{" "}
              {team.website ? (
                <a
                  href={team.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {team.website}
                </a>
              ) : (
                "N/A"
              )}
            </p>
            <p>
              <span className="font-medium">Màu sắc:</span>{" "}
              {team.clubColors || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Competitions */}
      <div>
        <h3 className="font-bold text-lg mb-2">Giải đấu tham gia</h3>
        <CompetitionsList competitions={team.runningCompetitions} />
      </div>

      {/* Squad Summary */}
      {team.squad && team.squad.length > 0 && (
        <div>
          <h3 className="font-bold text-lg mb-2">
            Đội hình ({team.squad.length} cầu thủ)
          </h3>
          <p className="text-sm text-gray-600">
            Đội {team.name} hiện có {team.squad.length} cầu thủ trong đội hình
            chính thức.
          </p>
          <p className="text-sm text-blue-600 mt-1">
            Xem chi tiết trong tab "ĐỘI HÌNH".
          </p>
        </div>
      )}
    </div>
  );
}

// Helper component to render competitions
function CompetitionsList({ competitions }: { competitions?: any[] }) {
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
