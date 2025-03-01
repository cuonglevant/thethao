import Link from "next/link";
import Image from "next/image";

type GridArticleProps = {
  image: string;
  title: string;
  date: string;
  category: string;
  categoryHref: string;
};

export function GridArticle({
  image,
  title,
  date,
  category,
  categoryHref,
}: GridArticleProps) {
  return (
    <article className="flex gap-4 items-start border-b border-gray-100 pb-4">
      <div className="relative flex-shrink-0">
        <Image
          src={image}
          alt={title}
          width={200}
          height={120}
          className="w-[200px] h-[120px] object-cover rounded"
        />
        <Link
          href={categoryHref}
          className="absolute top-2 left-2 text-xs bg-white/90 px-2 py-1 rounded"
        >
          {category}
        </Link>
      </div>
      <div className="flex-grow">
        <span className="text-xs text-gray-500">{date}</span>
        <h3 className="font-medium text-base mt-1 line-clamp-2 hover:text-blue-600">
          <Link href="#">{title}</Link>
        </h3>
      </div>
    </article>
  );
}
