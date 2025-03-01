import Image from "next/image";

type Props = {
  image: string;
  title: string;
  description?: string;
  imageHeight?: string;
  titleSize?: "sm" | "xl";
  showDescription?: boolean;
  isFeatured?: boolean;
};

export const ArticleCard = ({
  image,
  title,
  description,
  imageHeight = "h-36",
  titleSize = "sm",
  showDescription = false,
  isFeatured = false,
}: Props) => (
  <div
    className={`bg-white rounded-lg shadow-md overflow-hidden ${
      isFeatured ? "h-auto lg:h-[400px]" : ""
    }`}
  >
    <div className={`relative ${imageHeight}`}>
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
    <div className="p-2 sm:p-3">
      <h3
        className={`font-bold ${
          titleSize === "xl" ? "text-lg sm:text-xl" : "text-sm"
        } line-clamp-2`}
      >
        {title}
      </h3>
      {showDescription && description && (
        <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 mt-2">
          {description}
        </p>
      )}
    </div>
  </div>
);
