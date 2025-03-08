"use client";

import { useParams, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useGetTeamById } from "@/lib/useGetData";

const TEAM_TABS = [
  { id: "tom-tat", label: "TÓM TẮT" },
  { id: "live", label: "LIVE" },
  { id: "lich-thi-dau", label: "LỊCH THI ĐẤU" },
  { id: "ket-qua", label: "KẾT QUẢ" },
  { id: "chuyen-nhuong", label: "CHUYỂN NHƯỢNG" },
  { id: "doi-hinh", label: "ĐỘI HÌNH" },
];

// Helper function to render team content based on loading state
function TeamContent({ loading, error, team }) {
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h3 className="font-medium mb-2">Thông tin cơ bản</h3>
        <p>
          <span className="font-medium">Tên đầy đủ:</span> {team.name}
        </p>
        <p>
          <span className="font-medium">Tên ngắn:</span> {team.shortName}
        </p>
        <p>
          <span className="font-medium">Thành lập:</span> {team.founded}
        </p>
        <p>
          <span className="font-medium">Sân vận động:</span> {team.venue}
        </p>
      </div>
      <div>
        <h3 className="font-medium mb-2">Liên hệ</h3>
        <p>
          <span className="font-medium">Địa chỉ:</span> {team.address}
        </p>
        <p>
          <span className="font-medium">Website:</span> {team.website}
        </p>
        <p>
          <span className="font-medium">Màu sắc:</span> {team.clubColors}
        </p>
      </div>
    </div>
  );
}

export default function TeamPage() {
  const params = useParams();
  const pathname = usePathname();
  const slug = params.slug as string;

  // Extract team ID from the slug (format: "66-manchester-united")
  const teamId = Number(slug.split("-")[0]);

  // Fetch team data using the hook
  const { team, loading, error } = useGetTeamById(teamId);

  // Determine active tab
  const activeTab = TEAM_TABS.find(
    (tab) => pathname === `/teams/${slug}/${tab.id}`
  )
    ? pathname.split("/").pop()
    : "tom-tat";

  // Format team name from slug if team data isn't loaded yet
  const displayName =
    team?.name || slug.replace(/^\d+-/, "").replace(/-/g, " ");

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
            <h1 className="text-2xl font-bold uppercase">
              {team?.name || displayName}
            </h1>
            <p className="text-blue-600">
              {team?.area?.name || "Chưa có thông tin"} • Thành lập:{" "}
              {team?.founded || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b overflow-x-auto">
          <nav className="flex">
            {TEAM_TABS.map((tab) => (
              <Link
                key={tab.id}
                href={`/teams/${slug}/${tab.id}`}
                className={`px-3 py-3 text-sm font-medium whitespace-nowrap border-b-2 ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-700 hover:text-blue-600 hover:border-blue-300"
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Team overview section - only shows on the main route */}
        <div className="p-4">
          <h2 className="text-xl font-bold text-blue-600 mb-4">
            Tổng quan về {team?.name || displayName}
          </h2>

          <TeamContent loading={loading} error={error} team={team} />
        </div>
      </div>
    </div>
  );
}
