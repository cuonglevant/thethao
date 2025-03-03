import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MatchSchedule } from "@/components/ui/match-schedule";
import { LeagueStandings } from "@/components/ui/league-standings";
import { TopScorer } from "@/components/ui/top-scorer";
import { GridFeatureArticle } from "@/components/ui/grid-feature-article";
import { GridArticle } from "@/components/ui/grid-article";
// Force static generation
export const dynamic = "error";
export const dynamicParams = false;
export const revalidate = false;

// Get title based on slug
const titles = {
  "bong-da-quoc-te": "Bóng đá Quốc tế",
  "bong-da-viet-nam": "Bóng đá Việt Nam",
  "chuyen-nhuong": "Chuyển nhượng",
  "cup-c1": "Champions League",
  esports: "Esport",
  "lich-thi-dau": "Lịch thi đấu",
  "ngoai-hang-anh": "Ngoại hạng Anh",
  "nhan-dinh": "Nhận định",
  "the-thao": "Thể thao",
  xe: "Xe",
  "xu-huong": "Xu hướng",
  "ket-qua": "Kết quả bóng đá",
  latest: "Latest",
  highlight: "Highlight",
  livescore: "Livescore",
} as const;

type Slug = keyof typeof titles;

interface PageProps {
  params: Promise<{ slug: Slug }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  if (!(resolvedParams.slug in titles)) {
    return {
      title: "Trang không tồn tại",
      description: "Trang bạn đang tìm kiếm không tồn tại.",
    };
  }

  const title = titles[resolvedParams.slug];
  return {
    title,
    description: `Tin tức ${title.toLowerCase()} mới nhất`,
  };
}

const matchData = [
  {
    date: "01-03-2025",
    matches: [
      {
        time: "18:00",
        home: { name: "Sông Lam Nghệ An", logo: "/teams/slna.png" },
        away: { name: "Công An Hà Nội", logo: "/teams/cahn.png" },
      },
      {
        time: "18:00",
        home: { name: "Bình Định", logo: "/teams/binh-dinh.png" },
        away: { name: "Bình Dương", logo: "/teams/binh-duong.png" },
      },
    ],
  },
  {
    date: "02-03-2025",
    matches: [
      {
        time: "19:15",
        home: { name: "Hà Nội FC", logo: "/teams/hanoi-fc.png" },
        away: { name: "Đà Nẵng", logo: "/teams/danang.png" },
      },
      {
        time: "19:15",
        home: { name: "Hồ Chí Minh", logo: "/teams/hcm.png" },
        away: { name: "HAGL", logo: "/teams/hagl.png" },
      },
    ],
  },
];

const standingsData = [
  {
    position: 1,
    team: {
      name: "Nam Định",
      logo: "/teams/nam-dinh.png",
    },
    played: 15,
    won: 9,
    drawn: 3,
    lost: 3,
    gd: 16,
    points: 30,
  },
  {
    position: 2,
    team: {
      name: "Công An Hà Nội",
      logo: "/teams/cahn.png",
    },
    played: 15,
    won: 8,
    drawn: 4,
    lost: 3,
    gd: 12,
    points: 28,
  },
  {
    position: 3,
    team: {
      name: "Hà Nội FC",
      logo: "/teams/hanoi-fc.png",
    },
    played: 15,
    won: 8,
    drawn: 3,
    lost: 4,
    gd: 8,
    points: 27,
  },
  {
    position: 4,
    team: {
      name: "Bình Định",
      logo: "/teams/binh-dinh.png",
    },
    played: 15,
    won: 7,
    drawn: 5,
    lost: 3,
    gd: 6,
    points: 26,
  },
  {
    position: 5,
    team: {
      name: "Sông Lam Nghệ An",
      logo: "/teams/slna.png",
    },
    played: 15,
    won: 7,
    drawn: 4,
    lost: 4,
    gd: 4,
    points: 25,
  },
  {
    position: 6,
    team: {
      name: "Hồ Chí Minh",
      logo: "/teams/hcm.png",
    },
    played: 15,
    won: 6,
    drawn: 5,
    lost: 4,
    gd: 2,
    points: 23,
  },
  {
    position: 7,
    team: {
      name: "HAGL",
      logo: "/teams/hagl.png",
    },
    played: 15,
    won: 5,
    drawn: 4,
    lost: 6,
    gd: -2,
    points: 19,
  },
  {
    position: 8,
    team: {
      name: "Đà Nẵng",
      logo: "/teams/danang.png",
    },
    played: 15,
    won: 4,
    drawn: 5,
    lost: 6,
    gd: -4,
    points: 17,
  },
  {
    position: 9,
    team: {
      name: "Bình Dương",
      logo: "/teams/binh-duong.png",
    },
    played: 15,
    won: 3,
    drawn: 4,
    lost: 8,
    gd: -8,
    points: 13,
  },
];

const topScorersData = [
  {
    position: 1,
    player: {
      name: "Nguyễn Tiến Linh",
      image: "/players/tien-linh.jpg",
    },
    team: {
      name: "Bình Dương",
      logo: "/teams/binh-duong.png",
    },
    goals: 10,
    assists: 5,
    matches: 15,
  },
  {
    position: 2,
    player: {
      name: "Alan Grafite",
      image: "/players/grafite.jpg",
    },
    team: {
      name: "Công An Hà Nội",
      logo: "/teams/cahn.png",
    },
    goals: 8,
    assists: 4,
    matches: 14,
  },
  {
    position: 3,
    player: {
      name: "Leo Artur",
      image: "/players/leo-artur.jpg",
    },
    team: {
      name: "Công An Hà Nội",
      logo: "/teams/cahn.png",
    },
    goals: 7,
    assists: 3,
    matches: 15,
  },
  {
    position: 4,
    player: {
      name: "Goncalves da Silva",
      image: "/players/goncalves.jpg",
    },
    team: {
      name: "Nam Định",
      logo: "/teams/nam-dinh.png",
    },
    goals: 7,
    assists: 2,
    matches: 13,
  },
  {
    position: 5,
    player: {
      name: "Bezerra R.",
      image: "/players/bezerra.jpg",
    },
    team: {
      name: "Nam Định",
      logo: "/teams/nam-dinh.png",
    },
    goals: 7,
    assists: 2,
    matches: 15,
  },
];

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  if (!(resolvedParams.slug in titles)) {
    notFound();
  }

  const title = titles[resolvedParams.slug];
  return (
    <main className="container mx-auto px-4 py-4 sm:py-6 lg:py-8">
      <div className="text-2xl font-bold mb-4">{title}</div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
        {/* Left column - 8 columns on large screens, full width on mobile */}
        <div className="lg:col-span-8 space-y-4 sm:space-y-6">
          {/* Featured Article */}

          <GridFeatureArticle
            image="/phu-dong.jpg"
            title="Hoàng Đức cùng Phù Đổng có cơ hội vang danh toàn cầu"
            href="/phu-dong"
            description="Chiến thắng trước Trẻ TP.HCM đã giúp Phù Đổng Ninh Bình tạo nên một thành tích ấn tượng tại giải hạng Nhất Quốc gia."
          />
          {/* Grid of smaller articles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <GridArticle
              image="/phu-dong.jpg"
              title="Hoàng Đức cùng Phù Đổng có cơ hội vang danh toàn cầu"
              href="/phu-dong"
              description="Chiến thắng trước Trẻ TP.HCM đã giúp Phù Đổng Ninh Bình tạo nên một thành tích ấn tượng tại giải hạng Nhất Quốc gia."
            />
            <GridArticle
              image="/phu-dong.jpg"
              title="Hoàng Đức cùng Phù Đổng có cơ hội vang danh toàn cầu"
              href="/phu-dong"
              description="Chiến thắng trước Trẻ TP.HCM đã giúp Phù Đổng Ninh Bình tạo nên một thành tích ấn tượng tại giải hạng Nhất Quốc gia."
            />
            <GridArticle
              image="/phu-dong.jpg"
              title="Hoàng Đức cùng Phù Đổng có cơ hội vang danh toàn cầu"
              href="/phu-dong"
              description="Chiến thắng trước Trẻ TP.HCM đã giúp Phù Đổng Ninh Bình tạo nên một thành tích ấn tượng tại giải hạng Nhất Quốc gia."
            />
          </div>
          {/* Match Schedule */}
          <MatchSchedule matchDays={matchData} />
        </div>

        {/* Right column - 4 columns on large screens, full width on mobile */}
        <div className="lg:col-span-4 space-y-4 sm:space-y-6">
          <LeagueStandings teams={standingsData} />
          <TopScorer scorers={topScorersData} />
        </div>
      </div>
    </main>
  );
}

export function generateStaticParams(): Array<{ slug: Slug }> {
  return (Object.keys(titles) as Array<Slug>).map((slug) => ({
    slug,
  }));
}
