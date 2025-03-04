import type { Metadata } from "next";
import {
  ArticleCard,
  Props as ArticleProps,
} from "@/components/ui/article-card";

export const metadata: Metadata = {
  title: "Tin mới nhất - Thể thao 247",
  description: "Tin tức thể thao mới nhất, cập nhật liên tục 24/7",
};

const articles: ArticleProps[] = [
  {
    title: "Lịch thi đấu vòng 1/8 cúp C1 mới nhất",
    content:
      "(Lịch thi đấu bóng đá) Vòng 1/8 cúp C1 chính thức khởi tranh từ ngày 5/3 tới đây với các cặp đấu hấp dẫn của Real Madrid, Barca và Liverpool...",
    description:
      "(Lịch thi đấu bóng đá) Vòng 1/8 cúp C1 chính thức khởi tranh từ ngày 5/3 tới đây với các cặp đấu hấp dẫn của Real Madrid, Barca và Liverpool...",
    publishDate: new Date("2025-03-03T02:45:00Z"),
    media: [
      {
        _id: "1",
        mediaCaption: "Champions League",
        mediaType: "image",
        mediaURL: "/champions-league.jpg",
      },
    ],
    author: [
      {
        _id: "1",
        username: "Admin",
        dob: new Date("1990-01-01"),
        email: "admin@example.com",
        password: "hashed_password",
        phoneNumber: "0123456789",
        idCard: "123456789",
        userImage: "/avatars/admin.jpg",
      },
    ],
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
    numOfViews: 0,
    slug: "lich-thi-dau-vong-1-8-cup-c1",
  },
  {
    title: "Lịch thi đấu vòng 1/8 cúp C1 mới nhất",
    content:
      "(Lịch thi đấu bóng đá) Vòng 1/8 cúp C1 chính thức khởi tranh từ ngày 5/3 tới đây với các cặp đấu hấp dẫn của Real Madrid, Barca và Liverpool...",
    description:
      "(Lịch thi đấu bóng đá) Vòng 1/8 cúp C1 chính thức khởi tranh từ ngày 5/3 tới đây với các cặp đấu hấp dẫn của Real Madrid, Barca và Liverpool...",
    publishDate: new Date("2025-03-03T02:30:00Z"),
    media: [
      {
        _id: "1",
        mediaCaption: "Champions League",
        mediaType: "image",
        mediaURL: "/champions-league.jpg",
      },
    ],
    author: [
      {
        _id: "1",
        username: "Admin",
        dob: new Date("1990-01-01"),
        email: "admin@example.com",
        password: "hashed_password",
        phoneNumber: "0123456789",
        idCard: "123456789",
        userImage: "/avatars/admin.jpg",
      },
    ],
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
    numOfViews: 0,
    slug: "lich-thi-dau-vong-1-8-cup-c1",
  },
];

const sortByDate = (articles: ArticleProps[]) => {
  return [...articles].sort(
    (a, b) => b.publishDate.getTime() - a.publishDate.getTime()
  );
};

export default function LatestPage() {
  const sortedArticles = sortByDate(articles);

  return (
    <div className="space-y-6">
      {sortedArticles.map((article, index) => (
        <ArticleCard key={index} {...article} />
      ))}
    </div>
  );
}
