"use client";

import Link from "next/link";
import { useState } from "react";

export default function LatestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Format date as DD/MM/YYYY
  const formatDate = (date: Date) => {
    return `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(new Date(e.target.value));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-5xl px-4 py-4">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm mb-4">
          <Link href="/" className="text-gray-600 hover:text-blue-600">
            Trang chủ
          </Link>
          <span className="mx-2 text-gray-400">›</span>
          <span className="text-gray-900">Thể thao 24h</span>
        </div>

        {/* Date selection bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white rounded-lg shadow-sm p-4 mb-6 space-y-4 sm:space-y-0">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <input
              type="date"
              onChange={handleDateChange}
              value={selectedDate.toISOString().split("T")[0]}
              className="p-1.5 border rounded hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
            />
          </div>
          <div className="text-gray-600 w-full sm:w-auto text-left sm:text-right">
            Bạn đang xem tin ngày:{" "}
            <span className="text-red-600 font-medium">
              {formatDate(selectedDate)}
            </span>
          </div>
        </div>

        {/* Latest News Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="relative h-12">
            <div className="absolute top-0 left-0 bg-blue-600 text-white px-8 py-3 clip-path-latest">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="font-medium tracking-wide">LATEST</span>
              </div>
            </div>
          </div>
          <div className="p-4 sm:p-6">
            <div className="flex">
              {/* Timeline */}
              <div className="hidden sm:block flex-none w-2 relative">
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-[1px] h-full bg-gray-200"></div>
                <div className="sticky top-2">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full"></div>
                </div>
              </div>
              {/* Content */}
              <div className="flex-1 sm:pl-4">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
