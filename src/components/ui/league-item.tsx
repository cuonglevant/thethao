import Link from "next/link";
import Image from "next/image";

type LeagueItemProps = {
  href: string;
  imageSrc: string;
  name: string;
};

export function LeagueItem({ href, imageSrc, name }: LeagueItemProps) {
  return (
    <Link href={href} className="flex items-center p-3 hover:bg-gray-50">
      <div className="w-6 h-6 relative">
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="object-contain"
          sizes="24px"
        />
      </div>
      <span className="text-sm font-medium ml-3">{name}</span>
    </Link>
  );
}
