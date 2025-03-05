import Image from "next/image";
import Link from "next/link";
import type { Content } from "@/types/contentTypes";

export type Props = Omit<Content, "_id" | "comment">;

export const ArticleCard = ({
  title,
  content,
  publishDate,
  author,
  media,
  category,
  numOfViews,
  slug,
}: Props) => (
  <article className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start mb-4 sm:mb-6 last:mb-0">
    <div className="w-full sm:w-auto order-2 sm:order-1 flex-1">
      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
        <span>
          {publishDate
            ? new Date(publishDate).toLocaleDateString("vi-VN")
            : "N/A"}
        </span>
        <span>•</span>
        <span>{author[0]?.username || "Unknown Author"}</span>
        <span>•</span>
        <span>{category.name || "Uncategorized"}</span>
        <span>•</span>
        <span>{numOfViews.toLocaleString()} lượt xem</span>
      </div>
      <Link href={`/bai-viet/${slug}`} className="group">
        <h2 className="text-base sm:text-xl font-bold mt-1.5 sm:mt-2 group-hover:text-blue-600 line-clamp-2">
          {title}
        </h2>
        <p className="hidden sm:block text-gray-600 mt-2 text-base leading-relaxed line-clamp-2">
          {content}
        </p>
      </Link>
    </div>
    <div className="w-full sm:w-[300px] h-[140px] sm:h-[200px] relative order-1 sm:order-2">
      <Image
        src={media[0]?.mediaURL || "/placeholder.jpg"}
        alt={title}
        fill
        className="object-cover rounded"
        sizes="(max-width: 640px) 100vw, 300px"
      />
    </div>
  </article>
);
