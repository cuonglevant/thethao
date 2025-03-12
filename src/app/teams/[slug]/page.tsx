"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useGetTeamById } from "@/lib/api-client";
import TeamOverview from "./components/TeamOverview";
import TeamSchedule from "./components/TeamSchedule";
import TeamSquad from "./components/TeamSquad";
import TeamStanding from "./components/TeamStanding";

const TEAM_TABS = [
  { id: "tom-tat", label: "TÓM TẮT" },
  { id: "live", label: "LIVE" },
  { id: "lich-thi-dau", label: "LỊCH THI ĐẤU" },
  { id: "ket-qua", label: "KẾT QUẢ" },
  { id: "chuyen-nhuong", label: "CHUYỂN NHƯỢNG" },
  { id: "doi-hinh", label: "ĐỘI HÌNH" },
];

export default function TeamPage() {
  const params = useParams();
  const slug = params.slug as string;
  const teamId = Number(slug.split("-")[0]);
  const { team, loading, error } = useGetTeamById(teamId);
  const displayName =
    team?.name || slug.replace(/^\d+-/, "").replace(/-/g, " ");

  // Use state to track the active tab instead of URL
  const [activeTab, setActiveTab] = useState("tom-tat");

  return (
    <div className="space-y-4">
      {/* Team Header */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 relative bg-gray-100 rounded-full overflow-hidden">
            <Image
              src={team?.crest || "/placeholder.svg"}
              alt={displayName}
              fill
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold uppercase">{displayName}</h1>
            <p className="text-blue-600">
              {team?.area?.name || "Chưa có thông tin"} • Thành lập:{" "}
              {team?.founded || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <nav className="flex">
            {TEAM_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-3 text-sm font-medium whitespace-nowrap border-b-2 ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-700 hover:text-blue-600 hover:border-blue-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-4">
          {activeTab === "tom-tat" && (
            <TeamOverview
              loading={loading}
              error={error}
              team={team}
              displayName={displayName}
            />
          )}

          {activeTab === "lich-thi-dau" && (
            <TeamSchedule teamId={teamId} displayName={displayName} />
          )}

          {activeTab === "doi-hinh" && (
            <TeamSquad
              team={team}
              loading={loading}
              error={error}
              displayName={displayName}
            />
          )}

          {activeTab === "ket-qua" && (
            <TeamStanding teamId={teamId} displayName={displayName} />
          )}

          {/* Default message for tabs not yet implemented */}
          {!["tom-tat", "lich-thi-dau", "doi-hinh", "ket-qua"].includes(
            activeTab
          ) && (
            <div>
              <h2 className="text-xl font-bold text-blue-600 mb-4">
                {TEAM_TABS.find((t) => t.id === activeTab)?.label} -{" "}
                {displayName}
              </h2>
              <p>Nội dung đang được xây dựng.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
