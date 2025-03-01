import Link from "next/link";
import Image from "next/image";

type FeaturedArticleProps = {
  image: string;
  category: string;
  title: string;
  excerpt: string;
  categoryHref: string;
};

export function FeaturedArticle({
  image,
  category,
  title,
  excerpt,
  categoryHref,
}: FeaturedArticleProps) {
  return (
    <article className="article-container h-[500px] flex flex-col justify-between">
      <div className="relative h-[300px]">
        <Link
          href={categoryHref}
          className="absolute top-0 left-0 text-xs bg-white/90 px-2 py-1 rounded-tl z-10"
        >
          {category}
        </Link>
        <Image
          src={image}
          alt={title}
          width={600}
          height={350}
          className="w-full h-full object-cover rounded"
          priority
        />
      </div>
      <div className="py-4">
        <h1 className="text-2xl font-bold line-clamp-2">{title}</h1>
        <p className="text-base text-gray-600 line-clamp-3 mt-3">{excerpt}</p>
      </div>
    </article>
  );
}
