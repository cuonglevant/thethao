"use client";

import { NavItem } from "./nav-item";
import { LeagueItem } from "./league-item";
import Image from "next/image";

const navigationItems = [
  {
    href: "/latest",
    label: "LATEST",
    icon: (
      <Image
        src="/latest.png"
        alt="Latest"
        width={20}
        height={20}
        className="w-5 h-5"
      />
    ),
  },
  {
    href: "/video",
    label: "VIDEO",
    icon: (
      <svg
        className="w-5 h-5 text-red-500"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M4 8H2v12a2 2 0 002 2h12v-2H4V8z" />
        <path d="M20 2H8a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2zm-9 12V6l7 4-7 4z" />
      </svg>
    ),
  },
  {
    href: "/livescore",
    label: "LIVESCORE",
    icon: (
      <svg
        className="w-5 h-5 text-red-500"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H6v-2h6v2zm4-4H6v-2h10v2zm0-4H6V7h10v2z" />
      </svg>
    ),
  },
  {
    href: "/lich-thi-dau",
    label: "LỊCH THI ĐẤU",
    icon: (
      <svg
        className="w-5 h-5 text-red-500"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 002 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z" />
      </svg>
    ),
  },
  {
    href: "/ket-qua",
    label: "KẾT QUẢ",
    icon: (
      <svg
        className="w-5 h-5 text-red-500"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM7 10.82C5.84 10.4 5 9.3 5 8V7h2v3.82zM19 8c0 1.3-.84 2.4-2 2.82V7h2v1z" />
      </svg>
    ),
  },
  {
    href: "/bxh",
    label: "BXH",
    icon: (
      <svg
        className="w-5 h-5 text-red-500"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M7 21h2v-2H7v2zm0-8h2v-2H7v2zm4 0h2v-2h-2v2zm0 8h2v-2h-2v2zm-8-4h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2v-2H3v2zm0-4h2V7H3v2zm8 8h2v-2h-2v2zm8-8h2V7h-2v2zm0 4h2v-2h-2v2zM3 3v2h18V3H3zm16 14h2v-2h-2v2zm-4 4h2v-2h-2v2zM11 9h2V7h-2v2zm8 12h2v-2h-2v2zm-4-8h2v-2h-2v2z" />
      </svg>
    ),
  },
  {
    href: "/truc-tiep",
    label: "TRỰC TIẾP",
    icon: (
      <svg
        className="w-5 h-5 text-red-500"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
        <circle cx="12" cy="12" r="5" />
      </svg>
    ),
    badge: "LIVE",
  },
];

const leagueItems = [
  {
    href: "/v-league-1",
    imageSrc: "/leagues/vleague1.png",
    name: "V.LEAGUE 1",
  },
  {
    href: "/ngoai-hang-anh",
    imageSrc: "/leagues/premier-league.png",
    name: "NGOẠI HẠNG ANH",
  },
  {
    href: "/v-league-2",
    imageSrc: "/leagues/vleague2.png",
    name: "V.LEAGUE 2",
  },
  {
    href: "/cup-c1",
    imageSrc: "/leagues/champions-league.png",
    name: "CUP C1",
  },
  {
    href: "/la-liga",
    imageSrc: "/leagues/laliga.png",
    name: "LA LIGA",
  },
  {
    href: "/ligue-1",
    imageSrc: "/leagues/ligue1.png",
    name: "LIGUE 1",
  },
  {
    href: "/bundesliga",
    imageSrc: "/leagues/bundesliga.png",
    name: "BUNDESLIGA",
  },
  {
    href: "/serie-a",
    imageSrc: "/leagues/serie-a.png",
    name: "SERIE A",
  },
  {
    href: "/cup-c2",
    imageSrc: "/leagues/europa-league.png",
    name: "CUP C2",
  },
  {
    href: "/afc-champions-league",
    imageSrc: "/leagues/afc-champions.png",
    name: "AFC CHAMPIONS LEAGUE",
  },
  {
    href: "/efl-cup",
    imageSrc: "/leagues/efl-cup.png",
    name: "EFL CUP",
  },
  {
    href: "/mls",
    imageSrc: "/leagues/mls.png",
    name: "MLS",
  },
  {
    href: "/fa-cup",
    imageSrc: "/leagues/fa-cup.png",
    name: "FA CUP",
  },
  {
    href: "/saudi-pro-league",
    imageSrc: "/leagues/saudi-league.png",
    name: "SAUDI PRO LEAGUE",
  },
  {
    href: "/world-cup-2026",
    imageSrc: "/leagues/world-cup.png",
    name: "WORLD CUP 2026",
  },
  {
    href: "/asian-cup",
    imageSrc: "/leagues/asian-cup.png",
    name: "ASIAN CUP",
  },
];

export function Sidebar() {
  return (
    <div className="bg-white rounded shadow h-[850px] overflow-y-auto">
      {/* Top Navigation */}
      <div className="border-b">
        {navigationItems.map((item) => (
          <NavItem key={item.href} {...item} />
        ))}
      </div>

      {/* League Navigation */}
      <div className="py-2">
        {leagueItems.map((item) => (
          <LeagueItem key={item.href} {...item} />
        ))}
      </div>
    </div>
  );
}
