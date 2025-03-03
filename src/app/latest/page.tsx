import type { Metadata } from "next";
import {
  ArticleCard,
  Props as ArticleProps,
} from "@/components/ui/article-card";

export const metadata: Metadata = {
  title: "Tin mới nhất - Thể thao 247",
  description: "Tin tức thể thao mới nhất, cập nhật liên tục 24/7",
};

type Article = Omit<ArticleProps, "time"> & {
  timestamp: string;
};

const getRelativeTime = (timestamp: string): string => {
  const diff = Date.now() - new Date(timestamp).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} ngày trước`;
  if (hours > 0) return `${hours} giờ trước`;
  return `${minutes} phút trước`;
};

const articles: Article[] = [
  {
    timestamp: "2025-03-03T02:45:00Z",
    title: "Lịch thi đấu vòng 1/8 cúp C1 mới nhất",
    description:
      "(Lịch thi đấu bóng đá) Vòng 1/8 cúp C1 chính thức khởi tranh từ ngày 5/3 tới đây với các cặp đấu hấp dẫn của Real Madrid, Barca và Liverpool...",
    image: "/champions-league.jpg",
    href: "/latest/lich-thi-dau-vong-1-8-cup-c1",
  },
  {
    timestamp: "2025-03-03T02:30:00Z",
    title: "Lịch thi đấu vòng 1/8 cúp C1 mới nhất",
    description:
      "(Lịch thi đấu bóng đá) Vòng 1/8 cúp C1 chính thức khởi tranh từ ngày 5/3 tới đây với các cặp đấu hấp dẫn của Real Madrid, Barca và Liverpool...",
    image: "/champions-league.jpg",
    href: "/latest/lich-thi-dau-vong-1-8-cup-c1",
  },
  {
    timestamp: "2025-03-03T02:15:00Z",
    title: "Lịch thi đấu vòng 1/8 cúp C1 mới nhất",
    description:
      "(Lịch thi đấu bóng đá) Vòng 1/8 cúp C1 chính thức khởi tranh từ ngày 5/3 tới đây với các cặp đấu hấp dẫn của Real Madrid, Barca và Liverpool...",
    image: "/champions-league.jpg",
    href: "/latest/lich-thi-dau-vong-1-8-cup-c1",
  },
  // Add more articles here
];

const sortByTimestamp = (articles: Article[]) => {
  return [...articles].sort((a, b) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });
};

export default function LatestPage() {
  const sortedArticles = sortByTimestamp(articles);

  return (
    <div className="space-y-6">
      {sortedArticles.map((article, index) => (
        <ArticleCard
          key={index}
          {...article}
          time={getRelativeTime(article.timestamp)}
        />
      ))}
    </div>
  );
}
