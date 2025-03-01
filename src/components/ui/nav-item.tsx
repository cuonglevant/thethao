import Link from "next/link";

type NavItemProps = {
  href: string;
  icon?: React.ReactNode;
  label: string;
  badge?: string;
};

export function NavItem({ href, icon, label, badge }: NavItemProps) {
  return (
    <Link href={href} className="flex items-center p-3 hover:bg-gray-50">
      <div className="relative w-6 h-6">
        {badge && (
          <span
            className={`absolute -top-1 -right-1 text-[10px] font-bold text-red-500${
              badge === "count"
                ? " w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white"
                : ""
            }`}
          >
            {badge === "count" ? "75" : badge}
          </span>
        )}
        {icon}
      </div>
      <span className="text-sm font-medium ml-3">{label}</span>
    </Link>
  );
}
