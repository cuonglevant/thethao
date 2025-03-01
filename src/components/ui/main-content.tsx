import { FeaturedArticle } from "./featured-article";
import { GridArticle } from "./grid-article";

const gridArticles = [
  {
    image: "/placeholder.svg?height=200&width=300",
    title: "NGUYỄN THÙY LINH LỌT BÁN KẾT ĐỨC MỞ RỘNG 2025",
    date: "1 giờ trước",
    category: "ĐỘI TUYỂN",
    categoryHref: "/doi-tuyen",
  },
  {
    image: "/placeholder.svg?height=200&width=300",
    title: "NAM ĐỊNH XÂY CHẮC NGÔI ĐẦU SAU CHIẾN THẮNG TRƯỚC VIETTEL",
    date: "2 giờ trước",
    category: "BÓNG ĐÁ VIỆT NAM",
    categoryHref: "/bong-da-viet-nam",
  },
  {
    image: "/placeholder.svg?height=200&width=300",
    title: "NINH BÌNH TOÀN THẮNG TRẬN THỨ 10 LIÊN TIẾP",
    date: "3 giờ trước",
    category: "BÓNG ĐÁ VIỆT NAM",
    categoryHref: "/bong-da-viet-nam",
  },
];

function Featured() {
  return (
    <FeaturedArticle
      image="/liver.png"
      category="BÓNG ĐÁ QUỐC TẾ"
      categoryHref="/bong-da-quoc-te"
      title="RONALDO BẤT LỰC, AL NASSR THUA ĐAU ĐỚN"
      excerpt="(Kết quả bóng đá Al Nassr vs Al Orubah) - Cristiano Ronaldo và các đồng đội đã thất bại đau đớn trước Al Orubah trong trận đấu thuộc vòng 23 Saudi League, qua đó càng rời xa cuộc đua vô địch."
    />
  );
}

function Grid() {
  return (
    <>
      <h2 className="text-xl font-bold mb-4">TIN MỚI NHẤT</h2>
      <div className="space-y-4">
        {gridArticles.map((article, index) => (
          <GridArticle key={index} {...article} />
        ))}
      </div>
    </>
  );
}

export const MainContent = {
  Featured,
  Grid,
};
