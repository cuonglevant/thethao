"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { add, format, isSameDay } from "date-fns";
import { vi } from "date-fns/locale";

// Create simple context for date selection
import { createContext } from "react";
export const DateContext = createContext({
  selectedDate: "",
  setSelectedDate: (date: string) => {},
});

// Add this interface at the top of your file
interface DateTab {
  date: Date;
  key: string;
  label: string;
  dayName: string;
  isToday: boolean;
}

// Component that renders only on the client side
function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-1 mb-6">
        <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
        <div className="grid grid-cols-3 sm:grid-cols-7 gap-1 flex-1">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 rounded"></div>
          ))}
        </div>
        <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
      </div>
    );
  }

  return <>{children}</>;
}

export default function MatchScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Use server-safe initial values
  const [selectedDate, setSelectedDate] = useState("");
  const [dateTabs, setDateTabs] = useState<DateTab[]>([]);
  const [visibleRange, setVisibleRange] = useState([0, 7]); // [start, end) indexes

  // Generate week view centered on today
  useEffect(() => {
    const today = new Date();
    const dates = Array.from({ length: 15 }, (_, i) => {
      const date = add(today, { days: i - 4 });
      const isToday = isSameDay(date, today);
      return {
        date,
        key: format(date, "yyyy-MM-dd"),
        label: format(date, "dd/MM"),
        dayName: format(date, "EEEE", { locale: vi }),
        isToday,
      };
    });

    setVisibleRange([4, 11]);
    setDateTabs(dates);
    setSelectedDate(format(today, "yyyy-MM-dd"));
  }, []);

  // Handle navigation
  const handlePrevDay = () => {
    if (!selectedDate || dateTabs.length === 0) return;

    // Find the current selected date in the tabs
    const currentIndex = dateTabs.findIndex((tab) => tab.key === selectedDate);
    if (currentIndex > 0) {
      // Select the previous date
      setSelectedDate(dateTabs[currentIndex - 1].key);

      // If we're at the edge of visibility, shift the window
      if (currentIndex === visibleRange[0]) {
        setVisibleRange([visibleRange[0] - 1, visibleRange[1] - 1]);
      }
    }
  };

  const handleNextDay = () => {
    if (!selectedDate || dateTabs.length === 0) return;

    // Find the current selected date in the tabs
    const currentIndex = dateTabs.findIndex((tab) => tab.key === selectedDate);
    if (currentIndex < dateTabs.length - 1) {
      // Select the next date
      setSelectedDate(dateTabs[currentIndex + 1].key);

      // If we're at the edge of visibility, shift the window
      if (currentIndex === visibleRange[1] - 1) {
        setVisibleRange([visibleRange[0] + 1, visibleRange[1] + 1]);
      }
    }
  };

  // Get visible date tabs
  const visibleTabs = dateTabs.slice(visibleRange[0], visibleRange[1]);

  return (
    <DateContext.Provider value={{ selectedDate, setSelectedDate }}>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm mb-4">
            <Link href="/" className="text-gray-600 hover:text-blue-600">
              Trang chủ
            </Link>
            <span className="mx-2 text-gray-400">›</span>
            <span className="text-gray-900">Lịch thi đấu</span>
          </div>

          {/* Date tabs - only rendered client-side to prevent hydration mismatch */}
          <ClientOnly>
            <div className="flex items-center gap-1 mb-6">
              <button
                onClick={handlePrevDay}
                className="p-2 rounded hover:bg-gray-100"
                aria-label="Previous day"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>

              <div className="grid grid-cols-3 sm:grid-cols-7 gap-1 flex-1">
                {visibleTabs.map((tab) => {
                  const isSelected = selectedDate === tab.key;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setSelectedDate(tab.key)}
                      className={`flex flex-col items-center px-3 py-2 rounded ${
                        isSelected
                          ? tab.isToday
                            ? "bg-red-600 text-white"
                            : "bg-blue-600 text-white"
                          : tab.isToday
                          ? "bg-red-50 text-red-600"
                          : "bg-white hover:bg-gray-50"
                      }`}
                    >
                      <div className="text-sm font-medium">
                        {tab.isToday ? "Hôm nay" : tab.label}
                      </div>
                      <div className="text-xs mt-0.5 capitalize">
                        {tab.dayName}
                      </div>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleNextDay}
                className="p-2 rounded hover:bg-gray-100"
                aria-label="Next day"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          </ClientOnly>

          {/* Child page content */}
          {children}
        </div>
      </div>
    </DateContext.Provider>
  );
}
