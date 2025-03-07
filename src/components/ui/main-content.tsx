import React from "react";
import { Content } from "@/types/contentTypes";
import { FeaturedArticle } from "./featured-article";

const gridArticles: Content[] = [];

// Option 2: Convert it to a proper React component
export function Featured() {
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

// Option 3: Call the function directly
export function MainContent() {
  const featuredContent = Featured();
  return <div>{featuredContent}</div>;
}
