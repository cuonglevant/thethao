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
  ranking: "Bảng xếp hạng",
  "truc-tiep": "Trực tiếp",
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
    _id: "1",
    name: "Nam Định",
    slug: "nam-dinh",
    description: "Nam Định FC",
    league: {
      _id: "1",
      name: "V-League",
      slug: "v-league",
      description: "",
      logo: "/leagues/vleague1.png",
      nation: {
        _id: "1",
        name: "Việt Nam",
        flag: "",
        slug: "viet-nam",
        league: [],
      },
      matches: [],
    },
    points: 30,
    category: {
      _id: "1",
      name: "Bóng đá",
      description: "",
      slug: "bong-da",
      nation: {
        _id: "1",
        name: "Việt Nam",
        flag: "",
        slug: "viet-nam",
        league: [],
      },
      matches: [],
    },
    media: [],
    player: [],
    nation: {
      _id: "1",
      name: "Việt Nam",
      flag: "",
      slug: "viet-nam",
      league: [],
    },
    flag: "",
    shortName: "ND",
    logo: "/teams/nam-dinh.png",
    position: 1,
    played: 15,
    won: 9,
    drawn: 3,
    lost: 3,
    gd: 16,
  },
  {
    _id: "2",
    name: "Công An Hà Nội",
    slug: "cong-an-ha-noi",
    description: "Công An Hà Nội FC",
    league: {
      _id: "1",
      name: "V-League",
      slug: "v-league",
      description: "",
      logo: "/leagues/vleague1.png",
      nation: {
        _id: "1",
        name: "Việt Nam",
        flag: "",
        slug: "viet-nam",
        league: [],
      },
      matches: [],
    },
    points: 28,
    category: {
      _id: "1",
      name: "Bóng đá",
      description: "",
      slug: "bong-da",
      nation: {
        _id: "1",
        name: "Việt Nam",
        flag: "",
        slug: "viet-nam",
        league: [],
      },
      matches: [],
    },
    media: [],
    player: [],
    nation: {
      _id: "1",
      name: "Việt Nam",
      flag: "",
      slug: "viet-nam",
      league: [],
    },
    flag: "",
    shortName: "CAHN",
    logo: "/teams/cahn.png",
    position: 2,
    played: 15,
    won: 8,
    drawn: 4,
    lost: 3,
    gd: 12,
  },
  {
    _id: "3",
    name: "Hà Nội FC",
    slug: "ha-noi-fc",
    description: "Hà Nội FC",
    league: {
      _id: "1",
      name: "V-League",
      slug: "v-league",
      description: "",
      logo: "/leagues/vleague1.png",
      nation: {
        _id: "1",
        name: "Việt Nam",
        flag: "",
        slug: "viet-nam",
        league: [],
      },
      matches: [],
    },
    points: 27,
    category: {
      _id: "1",
      name: "Bóng đá",
      description: "",
      slug: "bong-da",
      nation: {
        _id: "1",
        name: "Việt Nam",
        flag: "",
        slug: "viet-nam",
        league: [],
      },
      matches: [],
    },
    media: [],
    player: [],
    nation: {
      _id: "1",
      name: "Việt Nam",
      flag: "",
      slug: "viet-nam",
      league: [],
    },
    flag: "",
    shortName: "HNFC",
    logo: "/teams/hanoi-fc.png",
    position: 3,
    played: 15,
    won: 8,
    drawn: 3,
    lost: 4,
    gd: 8,
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
            media={[
              {
                _id: "1",
                mediaType: "image",
                mediaURL: "/phu-dong.jpg",
                mediaCaption: "Phù Đổng",
              },
            ]}
            title="Hoàng Đức cùng Phù Đổng có cơ hội vang danh toàn cầu"
            content="Chiến thắng trước Trẻ TP.HCM đã giúp Phù Đổng Ninh Bình tạo nên một thành tích ấn tượng tại giải hạng Nhất Quốc gia."
            description="Chiến thắng trước Trẻ TP.HCM đã giúp Phù Đổng Ninh Bình tạo nên một thành tích ấn tượng tại giải hạng Nhất Quốc gia."
            slug="phu-dong"
            publishDate={new Date()}
            author={[
              {
                _id: "1",
                username: "Admin",
                dob: new Date(),
                email: "admin@example.com",
                password: "hashed_password",
                phoneNumber: "0123456789",
                idCard: "123456789",
                userImage: "/avatars/admin.jpg",
              },
            ]}
            category={{
              _id: "1",
              name: "Bóng đá",
              description: "",
              slug: "bong-da",
              nation: {
                _id: "1",
                name: "Việt Nam",
                flag: "",
                slug: "viet-nam",
                league: [],
              },
              matches: [],
            }}
            numOfViews={0}
          />
          {/* Grid of smaller articles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <GridArticle
              media={[
                {
                  _id: "1",
                  mediaType: "image",
                  mediaURL: "/phu-dong.jpg",
                  mediaCaption: "Phù Đổng",
                },
              ]}
              title="Hoàng Đức cùng Phù Đổng có cơ hội vang danh toàn cầu"
              content="Chiến thắng trước Trẻ TP.HCM đã giúp Phù Đổng Ninh Bình tạo nên một thành tích ấn tượng tại giải hạng Nhất Quốc gia."
              description="Chiến thắng trước Trẻ TP.HCM đã giúp Phù Đổng Ninh Bình tạo nên một thành tích ấn tượng tại giải hạng Nhất Quốc gia."
              slug="phu-dong"
              publishDate={new Date()}
              author={[
                {
                  _id: "1",
                  username: "Admin",
                  dob: new Date(),
                  email: "admin@example.com",
                  password: "hashed_password",
                  phoneNumber: "0123456789",
                  idCard: "123456789",
                  userImage: "/avatars/admin.jpg",
                },
              ]}
              category={{
                _id: "1",
                name: "Bóng đá",
                description: "",
                slug: "bong-da",
                nation: {
                  _id: "1",
                  name: "Việt Nam",
                  flag: "",
                  slug: "viet-nam",
                  league: [],
                },
                matches: [],
              }}
              numOfViews={0}
            />
            <GridArticle
              media={[
                {
                  _id: "1",
                  mediaType: "image",
                  mediaURL: "/phu-dong.jpg",
                  mediaCaption: "Phù Đổng",
                },
              ]}
              title="Hoàng Đức cùng Phù Đổng có cơ hội vang danh toàn cầu"
              content="Chiến thắng trước Trẻ TP.HCM đã giúp Phù Đổng Ninh Bình tạo nên một thành tích ấn tượng tại giải hạng Nhất Quốc gia."
              description="Chiến thắng trước Trẻ TP.HCM đã giúp Phù Đổng Ninh Bình tạo nên một thành tích ấn tượng tại giải hạng Nhất Quốc gia."
              slug="phu-dong"
              publishDate={new Date()}
              author={[
                {
                  _id: "1",
                  username: "Admin",
                  dob: new Date(),
                  email: "admin@example.com",
                  password: "hashed_password",
                  phoneNumber: "0123456789",
                  idCard: "123456789",
                  userImage: "/avatars/admin.jpg",
                },
              ]}
              category={{
                _id: "1",
                name: "Bóng đá",
                description: "",
                slug: "bong-da",
                nation: {
                  _id: "1",
                  name: "Việt Nam",
                  flag: "",
                  slug: "viet-nam",
                  league: [],
                },
                matches: [],
              }}
              numOfViews={0}
            />
            <GridArticle
              media={[
                {
                  _id: "1",
                  mediaType: "image",
                  mediaURL: "/phu-dong.jpg",
                  mediaCaption: "Phù Đổng",
                },
              ]}
              title="Hoàng Đức cùng Phù Đổng có cơ hội vang danh toàn cầu"
              content="Chiến thắng trước Trẻ TP.HCM đã giúp Phù Đổng Ninh Bình tạo nên một thành tích ấn tượng tại giải hạng Nhất Quốc gia."
              description="Chiến thắng trước Trẻ TP.HCM đã giúp Phù Đổng Ninh Bình tạo nên một thành tích ấn tượng tại giải hạng Nhất Quốc gia."
              slug="phu-dong"
              publishDate={new Date()}
              author={[
                {
                  _id: "1",
                  username: "Admin",
                  dob: new Date(),
                  email: "admin@example.com",
                  password: "hashed_password",
                  phoneNumber: "0123456789",
                  idCard: "123456789",
                  userImage: "/avatars/admin.jpg",
                },
              ]}
              category={{
                _id: "1",
                name: "Bóng đá",
                description: "",
                slug: "bong-da",
                nation: {
                  _id: "1",
                  name: "Việt Nam",
                  flag: "",
                  slug: "viet-nam",
                  league: [],
                },
                matches: [],
              }}
              numOfViews={0}
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
