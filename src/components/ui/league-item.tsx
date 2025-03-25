import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

type LeagueItemProps = {
  href: string;
  imageSrc: string;
  name: string;
};

export function LeagueItem({ href, imageSrc, name }: LeagueItemProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link href={href} className="flex items-center p-3 hover:bg-gray-50">
      <div className="w-6 h-6 relative flex items-center justify-center bg-gray-100 rounded-sm">
        {!imageError ? (
          <Image
            src={imageSrc}
            alt={name}
            fill
            className="object-contain"
            sizes="24px"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="text-xs font-bold text-gray-500">
            {name.substring(0, 2)}
          </span>
        )}
      </div>
      <span className="text-sm font-medium ml-3">{name}</span>
    </Link>
  );
}
