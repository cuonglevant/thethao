import Image from "next/image";
import Link from "next/link";
import { Props } from "./article-card";

type GridFeatureArticleProps = Props;

export function GridFeatureArticle({
  image,
  title,
  href = "#",
  description,
}: // time,
GridFeatureArticleProps) {
  return (
    <Link href={href}>
      <article className="flex gap-6 items-start bg-gray-50 rounded-lg overflow-hidden group h-[180px]">
        <div className="relative flex-shrink-0">
          <Image
            src={image}
            alt={title}
            width={300}
            height={180}
            className="w-[300px] h-[180px] object-cover"
          />
        </div>
        <div className="flex-1 py-6 pr-6">
          <h2 className="text-xl font-bold group-hover:text-blue-600">
            {title}
          </h2>
          {description && (
            <p className="text-gray-600 mt-2 text-base leading-relaxed line-clamp-2">
              {description}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
}
