"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  Home,
  User,
  UserPlus,
  Monitor,
  Trophy,
  Calendar,
  BarChart2,
  Radio,
} from "lucide-react";
import { useState } from "react";
import { slugify } from "@/utils/utils";

interface LeagueItems {
  [key: string]: string[];
}

interface LeagueSection {
  title: string;
  items: LeagueItems;
}

interface LeagueSectionProps {
  title: string;
  items: LeagueItems;
}

const LEAGUES: {
  main: LeagueSection;
  other: LeagueSection;
} = {
  main: {
    title: "Giải đấu chính",
    items: {
      "Bóng đá Việt Nam": [
        "U20 Châu Á",
        "V-League",
        "Asian Cup 2027",
        "Đội tuyển Quốc gia",
        "U19 Việt Nam",
      ],
      "Ngoại hạng Anh": ["Tin tức", "Lịch thi đấu", "Bảng xếp hạng"],
      "Serie A": ["Tin tức", "Lịch thi đấu", "Bảng xếp hạng"],
      Pháp: ["Tin tức", "Lịch thi đấu", "Bảng xếp hạng"],
      "Tây Ban Nha": ["Tin tức", "Lịch thi đấu", "Bảng xếp hạng"],
    },
  },
  other: {
    title: "Giải đấu khác",
    items: {
      "Cúp C1 châu Âu": ["Tin tức", "Lịch thi đấu", "Bảng xếp hạng"],
      "Cúp C2 Europa League": ["Tin tức", "Lịch thi đấu", "Bảng xếp hạng"],
      "World Cup": ["Tin tức", "Lịch thi đấu", "Bảng xếp hạng"],
      Euro: ["Tin tức", "Lịch thi đấu", "Bảng xếp hạng"],
      Đức: ["Tin tức", "Lịch thi đấu", "Bảng xếp hạng"],
    },
  },
};

const UTILITIES = [
  {
    name: "Livescore",
    icon: "monitor",
    Component: Monitor,
    href: "/livescore",
  },
  {
    name: "Lịch thi đấu",
    icon: "calendar",
    Component: Calendar,
    href: "/lich-thi-dau",
  },
  {
    name: "Kết quả",
    icon: "trophy",
    Component: Trophy,
    href: "/ket-qua",
  },
  {
    name: "BXH",
    icon: "bar-chart-2",
    Component: BarChart2,
    href: "/ranking",
  },
  {
    name: "Trực tiếp",
    icon: "radio",
    Component: Radio,
    href: "/truc-tiep",
    live: true,
  },
];

const TEAMS = [
  { name: "MU", logo: "/manchester-united.png" },
  { name: "Liverpool", logo: "/liver.png" },
  { name: "Arsenal", logo: "/arsenal.svg" },
  { name: "Man City", logo: "/man-city.svg" },
  { name: "Chelsea", logo: "/chelsea.svg" },
  { name: "Barcelona", logo: "/barca.svg" },
  { name: "Real Madrid", logo: "/real-madrid.png" },
];

const MAIN_NAV_ITEMS = [
  "LỊCH THI ĐẤU",
  "BÓNG ĐÁ VIỆT NAM",
  "NGOẠI HẠNG ANH",
  "BÓNG ĐÁ QUỐC TẾ",
  "NHẬN ĐỊNH",
  "CÚP C1",
  "CHUYỂN NHƯỢNG",
  "THỂ THAO",
  "ESPORTS",
  "XE",
  "XU HƯỚNG",
];

const LeagueSection = ({ title, items }: LeagueSectionProps) => (
  <div className="mb-6">
    <h3 className="font-semibold mb-3 text-blue-800 border-b pb-2 text-center">
      {title}
    </h3>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {Object.entries(items).map(([title, subitems]) => (
        <div key={title} className="text-center">
          <h4 className="font-medium mb-2">{title}</h4>
          <ul className="space-y-1">
            {subitems.map((item) => (
              <li key={item}>
                <Link
                  href={`/${slugify(title)}/${slugify(item)}`}
                  className="text-sm hover:text-blue-600 block"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-2 flex flex-col sm:flex-row items-center justify-between w-full md:w-10/12 lg:w-7/12">
          <Link href="/" title="Thể thao 247" className="mb-4 sm:mb-0">
            <Image
              src="/logo.svg"
              alt="Thể thao 247"
              width={282}
              height={73}
              priority
            />
          </Link>
          <div className="flex flex-wrap justify-center sm:flex-nowrap items-center gap-[0.1rem] sm:space-x-4">
            {[
              { href: "/quang-cao", icon: "/marketing.png", text: "QUẢNG CÁO" },
              { href: "/gui-bai", icon: "/pen.png", text: "Gửi bài" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center text-gray-600 hover:text-blue-700"
              >
                <Image
                  src={item.icon}
                  alt={item.text}
                  width={20}
                  height={20}
                  className="mr-2 [filter:_brightness(0)_saturate(100%)_invert(24%)_sepia(89%)_saturate(1640%)_hue-rotate(213deg)_brightness(91%)_contrast(101%)]"
                />
                <span className="text-xs sm:text-sm font-medium">
                  {item.text}
                </span>
              </Link>
            ))}
            {[
              { icon: User, text: "Đăng nhập" },
              { icon: UserPlus, text: "Đăng ký" },
            ].map((item) => (
              <button
                key={item.text}
                className="flex items-center px-2 sm:px-3 py-1 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
              >
                <item.icon size={16} className="mr-1 sm:mr-2" />
                <span className="text-xs sm:text-sm font-medium">
                  {item.text}
                </span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Navigation */}
      <nav className="bg-[#1a3b7d] text-white flex items-center py-2 h-auto sm:h-10">
        <div className="container mx-auto px-4 w-full md:w-10/12 lg:w-7/12">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 sm:space-x-3">
            <div className="flex items-center space-x-1 overflow-x-auto w-full sm:w-auto scrollbar-hide">
              <Link
                href="/"
                className="flex items-center hover:bg-blue-800 px-2 py-1 rounded"
              >
                <Home size={16} className="mr-1" />
              </Link>
              {MAIN_NAV_ITEMS.map((item) => (
                <Link
                  key={item}
                  href={`/${slugify(item)}`}
                  className="whitespace-nowrap hover:bg-blue-800 px-1 py-1 rounded text-xs"
                >
                  #{item}
                </Link>
              ))}
            </div>
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-white hover:bg-blue-800 rounded-lg"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
                {isOpen && (
                  <>
                    <div
                      className="fixed inset-0 bg-black/50 z-40"
                      onClick={() => setIsOpen(false)}
                    />
                    <div className="fixed inset-x-0 top-[4rem] sm:absolute sm:right-0 sm:top-full sm:inset-x-auto mt-2 w-full sm:w-[600px] bg-white text-gray-800 shadow-lg rounded-lg z-50 p-4 max-h-[80vh] overflow-y-auto">
                      <LeagueSection
                        title={LEAGUES.main.title}
                        items={LEAGUES.main.items}
                      />
                      <LeagueSection
                        title={LEAGUES.other.title}
                        items={LEAGUES.other.items}
                      />
                      <div>
                        <h3 className="font-semibold mb-3 text-blue-800 border-b pb-2 text-center">
                          Tiện ích
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                          {UTILITIES.map(({ name, Component, live, href }) => (
                            <Link
                              key={name}
                              href={href}
                              className="flex items-center justify-center space-x-2 hover:text-blue-600"
                            >
                              <Component size={16} />
                              <span className="text-sm">{name}</span>
                              {live && (
                                <span className="px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full animate-pulse">
                                  Live
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Team Navigation */}
      <div className="bg-white py-2 border-b">
        <div className="container mx-auto px-2">
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-2 sm:gap-4">
            {TEAMS.map((team) => (
              <Link
                key={team.name}
                href={`/teams/${slugify(team.name)}`}
                className="flex items-center"
              >
                <Image
                  src={team.logo}
                  alt={team.name}
                  width={25}
                  height={25}
                  className="mr-2 object-contain w-5 h-5 sm:w-6 sm:h-6"
                />
                <span className="text-sm sm:text-base hover:text-pink-800">
                  {team.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
