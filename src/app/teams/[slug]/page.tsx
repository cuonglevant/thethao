import Image from "next/image";
import Link from "next/link";
// import { Team } from "@/types/teamTypes";
// import { getTeamBySlug } from "@/lib/api";

interface TeamPageProps {
  params: {
    slug: string;
  };
}

const TEAM_TABS = [
  { id: "tom-tat", label: "TÓM TẮT" },
  { id: "live", label: "LIVE" },
  { id: "lich-thi-dau", label: "LỊCH THI ĐẤU" },
  { id: "ket-qua", label: "KẾT QUẢ" },
  { id: "chuyen-nhuong", label: "CHUYỂN NHƯỢNG" },
  { id: "doi-hinh", label: "ĐỘI HÌNH" },
];

export default async function TeamPage({ params }: TeamPageProps) {
  // const team: Team = await getTeamBySlug(params.slug);
  const teamName = params.slug;

  return (
    <div className="space-y-4">
      {/* Team Header */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center gap-4">
          <Image
            // src={`/teams/${team.name}.png`}
            src={`/teams/${teamName}.png`}
            alt={teamName}
            width={80}
            height={80}
            className="object-contain"
          />
          <div>
            <h1 className="text-2xl font-bold uppercase">
              {teamName.replace(/-/g, " ")}
            </h1>
            <p className="text-blue-600">Khu vực: Anh</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b">
          <nav className="flex">
            {TEAM_TABS.map((tab) => (
              <Link
                key={tab.id}
                href={`/teams/${teamName}/${tab.id}`}
                className="px-3 py-3 text-sm font-medium text-gray-700 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600"
              >
                {tab.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* News Feed Section */}
        <div className="p-4">
          <h2 className="text-xl font-bold text-blue-600 mb-4">{teamName}</h2>

          <div className="space-y-4">
            {/* Featured News */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
                <Image
                  src="/news/featured-news.jpg"
                  alt="Featured news"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-bold">
                  Nhận định Real Sociedad vs MU: Cơ hội cuối cùng, 0h45 ngày
                  7/3/2025
                </h3>
                <p className="text-gray-600 text-sm">
                  (Nhận định, dự đoán) – MU vừa bị loại khỏi vòng 1/8 cúp FA khi
                  thua trên chấm luân lưu đầy nghiệt ngã trước Fulham...
                </p>
              </div>
            </div>

            {/* News List */}
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <Image
                  src="/news/news-1.jpg"
                  alt="News thumbnail"
                  width={100}
                  height={60}
                  className="rounded object-cover"
                />
                <h4 className="font-medium">
                  Thay thế Onana, MU săn sáng chiêu mộ ngôi sao hay mắc lỗi
                </h4>
              </div>
              <div className="flex gap-4 items-start">
                <Image
                  src="/news/news-2.jpg"
                  alt="News thumbnail"
                  width={100}
                  height={60}
                  className="rounded object-cover"
                />
                <h4 className="font-medium">
                  Bruno Fernandes: 'MU vẫn sẽ cố gắng giành cúp mùa này'
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
