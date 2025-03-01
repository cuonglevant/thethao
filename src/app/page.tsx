import { MainNav } from "@/components/ui/main-nav";
import { Sidebar } from "@/components/ui/sidebar";
import { RightSidebar } from "@/components/ui/right-sidebar";
import { MainContent } from "@/components/ui/main-content";
import { MatchSchedule } from "@/components/ui/match-schedule";
import { LeagueStandings } from "@/components/ui/league-standings";
import { NormalArticle } from "@/components/ui/normal-article";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <MainNav />
      <main className="container mx-auto px-4 py-4 max-w-[1200px]">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_300px] gap-4 mb-4">
          {/* Sidebar - hidden on mobile, shown as overlay on tablet, normal on desktop */}
          <div className="hidden lg:block">
            <Sidebar />
          </div>

          {/* Main Content */}
          <div className="space-y-4">
            <div className="bg-white rounded shadow p-4">
              <MainContent.Featured />
            </div>
            <MatchSchedule />
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <NormalArticle
                image="/placeholder.svg?height=250&width=400"
                title="Thắng đậm U20 Malaysia, U20 Việt Nam vào chung kết"
                category="U20 VIỆT NAM"
                categoryHref="/u20-viet-nam"
                date="2 giờ trước"
              />
              <NormalArticle
                image="/placeholder.svg?height=250&width=400"
                title="HLV Troussier tiết lộ lý do gọi cầu thủ HAGL"
                category="ĐỘI TUYỂN"
                categoryHref="/doi-tuyen"
                date="3 giờ trước"
              />
            </div> */}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4">
            <RightSidebar />
            <LeagueStandings />
          </div>
        </div>

        {/* Grid Articles */}
        <div className="bg-white rounded shadow p-4">
          <MainContent.Grid />
        </div>
      </main>
    </div>
  );
}
