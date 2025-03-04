import Link from "next/link";
import Image from "next/image";
import { Props } from "./article-card";

type GridArticleProps = Props;

export function GridArticle({ media, title, slug }: GridArticleProps) {
  return (
    <article className="space-y-3">
      <Link href={`/bai-viet/${slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={media[0]?.mediaURL || "/placeholder.jpg"}
            alt={title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h3 className="font-bold text-lg mt-3 hover:text-blue-600 line-clamp-2">
          {title}
        </h3>
      </Link>
    </article>
  );
}
