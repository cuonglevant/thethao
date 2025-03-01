import Link from "next/link";

type LeagueItemProps = {
  href: string;
  imageSrc: string;
  name: string;
};

export function LeagueItem({ href, imageSrc, name }: LeagueItemProps) {
  return (
    <Link href={href} className="flex items-center p-3 hover:bg-gray-50">
      <div className="w-6 h-6">
        <img src={imageSrc} alt={name} className="w-5 h-5 object-contain" />
      </div>
      <span className="text-sm font-medium ml-3">{name}</span>
    </Link>
  );
}
