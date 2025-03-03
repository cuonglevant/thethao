import Image from "next/image";
import Link from "next/link";

export type Props = {
  image: string;
  title: string;
  description?: string;
  time?: string;
  href?: string;
};

export const ArticleCard = ({
  image,
  title,
  description,
  time,
  href = "#",
}: Props) => (
  <article className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start mb-4 sm:mb-6 last:mb-0">
    <div className="w-full sm:w-auto order-2 sm:order-1 flex-1">
      <div className="text-xs sm:text-sm text-gray-500">{time}</div>
      <Link href={href} className="group">
        <h2 className="text-base sm:text-xl font-bold mt-1.5 sm:mt-2 group-hover:text-blue-600 line-clamp-2">
          {title}
        </h2>
        {description && (
          <p className="hidden sm:block text-gray-600 mt-2 text-base leading-relaxed line-clamp-2">
            {description}
          </p>
        )}
      </Link>
    </div>
    <div className="w-full sm:w-[300px] h-[140px] sm:h-[200px] relative order-1 sm:order-2">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover rounded"
        sizes="(max-width: 640px) 100vw, 300px"
      />
    </div>
  </article>
);
