"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navigationItems = {
  "Bóng đá Việt Nam": {
    items: [
      "U20 Châu Á",
      "V-League",
      "Asian Cup 2027",
      "Đội tuyển Quốc gia",
      "U19 Việt Nam",
    ],
  },
  "Ngoại hạng Anh": {
    items: ["Tin tức", "Lịch thi đấu", "Bảng xếp hạng"],
  },
  "Serie A": {
    items: ["Tin tức", "Lịch thi đấu", "Bảng xếp hạng"],
  },
  Pháp: {
    items: ["Tin tức", "Lịch thi đấu", "Bảng xếp hạng"],
  },
  "Tây Ban Nha": {
    items: ["Tin tức", "Lịch thi đấu", "Bảng xếp hạng"],
  },
};

const secondRowItems = {
  "Cúp C1 châu Âu": {
    items: ["Tin tức", "Lịch thi đấu", "Bảng xếp hạng"],
  },
  "Cúp C2 Europa League": {
    items: ["Tin tức", "Lịch thi đấu", "Bảng xếp hạng"],
  },
  "World Cup": {
    items: ["Tin tức", "Lịch thi đấu", "Bảng xếp hạng"],
  },
  Euro: {
    items: ["Tin tức", "Lịch thi đấu", "Bảng xếp hạng"],
  },
  Đức: {
    items: ["Tin tức", "Lịch thi đấu", "Bảng xếp hạng"],
  },
};

const utilities = [
  { name: "Livescore", icon: "monitor" },
  { name: "Lịch thi đấu", icon: "calendar" },
  { name: "Kết quả", icon: "trophy" },
  { name: "BXH", icon: "bar-chart-2" },
  { name: "Trực tiếp", icon: "radio", live: true },
];

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-white hover:bg-blue-800 rounded-lg"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-1 w-screen bg-white shadow-lg z-50">
            <div className="max-w-7xl mx-auto p-6">
              <div className="grid grid-cols-6 gap-8">
                {/* First Row */}
                <div className="col-span-5 grid grid-cols-5 gap-8 pb-6 border-b">
                  {Object.entries(navigationItems).map(
                    ([category, { items }]) => (
                      <div key={category}>
                        <h3 className="font-bold text-blue-600 mb-3">
                          <Link href="#" className="hover:underline">
                            {category}
                          </Link>
                        </h3>
                        <ul className="space-y-2">
                          {items.map((item) => (
                            <li key={item}>
                              <Link
                                href="#"
                                className="text-sm text-gray-600 hover:text-blue-600"
                              >
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  )}
                </div>

                {/* Utilities Column */}
                <div className="border-l pl-6">
                  <h3 className="font-bold text-blue-600 mb-3">
                    Tiện ích bóng đá
                  </h3>
                  <ul className="space-y-3">
                    {utilities.map((item) => (
                      <li key={item.name}>
                        <Link
                          href="#"
                          className="flex items-center text-sm text-gray-600 hover:text-blue-600"
                        >
                          <span className="w-6 h-6 flex items-center justify-center mr-2">
                            {item.live && (
                              <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                              </span>
                            )}
                          </span>
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Second Row */}
                <div className="col-span-5 grid grid-cols-5 gap-8 pt-6">
                  {Object.entries(secondRowItems).map(
                    ([category, { items }]) => (
                      <div key={category}>
                        <h3 className="font-bold text-blue-600 mb-3">
                          <Link href="#" className="hover:underline">
                            {category}
                          </Link>
                        </h3>
                        <ul className="space-y-2">
                          {items.map((item) => (
                            <li key={item}>
                              <Link
                                href="#"
                                className="text-sm text-gray-600 hover:text-blue-600"
                              >
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Sports Section */}
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-bold text-blue-600 mb-3">
                  <Link href="#" className="hover:underline">
                    Thể Thao
                  </Link>
                </h3>
                <div className="grid grid-cols-5 gap-8">
                  <ul className="space-y-2">
                    {[
                      "Tennis - Quần vợt",
                      "Bóng rổ",
                      "Cầu lông",
                      "Bóng chuyền",
                      "Võ thuật",
                    ].map((sport) => (
                      <li key={sport}>
                        <Link
                          href="#"
                          className="text-sm text-gray-600 hover:text-blue-600"
                        >
                          {sport}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
