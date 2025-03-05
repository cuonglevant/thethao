import { Content } from "@/types/contentTypes";
import { FeaturedArticle } from "./featured-article";

const gridArticles: Content[] = [];

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

export const MainContent = {
  Featured,
};
