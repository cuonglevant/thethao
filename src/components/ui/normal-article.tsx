import Link from "next/link";
import Image from "next/image";

type NormalArticleProps = {
  image: string;
  title: string;
  category: string;
  categoryHref: string;
  date: string;
};

export function NormalArticle({
  image,
  title,
  category,
  categoryHref,
  date,
}: NormalArticleProps) {
  return (
    <article className="bg-white rounded shadow p-4">
      <div className="relative">
        <Image
          src={image}
          alt={title}
          width={400}
          height={250}
          className="w-full h-[180px] object-cover rounded"
        />
        <Link
          href={categoryHref}
          className="absolute top-2 left-2 text-xs bg-white/90 px-2 py-1 rounded"
        >
          {category}
        </Link>
      </div>
      <div className="mt-3">
        <span className="text-xs text-gray-500">{date}</span>
        <h3 className="font-medium text-base mt-1 line-clamp-2 hover:text-blue-600">
          <Link href="#">{title}</Link>
        </h3>
      </div>
    </article>
  );
}
