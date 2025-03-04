"use client";

import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { SelectedDateContext } from "./context";

const DAYS = [
  "Chủ nhật",
  "Thứ hai",
  "Thứ ba",
  "Thứ tư",
  "Thứ năm",
  "Thứ sáu",
  "Thứ bảy",
];

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

const getWeekDates = (currentDate: Date, today: Date) => {
  const dates = [];
  const startDate = new Date(currentDate);
  const day = startDate.getDay();
  startDate.setDate(startDate.getDate() - day + (day === 0 ? -6 : 1));

  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    dates.push({
      date,
      dayName: DAYS[date.getDay()],
      isToday: date.toDateString() === today.toDateString(),
      dayNumber: date.getDate(),
      month: date.getMonth() + 1,
    });
  }
  return dates;
};

export default function MatchScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const today = useMemo(() => new Date(), []);
  const { width } = useWindowSize();
  const weekDates = useMemo(
    () => getWeekDates(selectedDate, today),
    [selectedDate, today]
  );

  const handlePrevDay = () => {
    setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 1)));
  };

  const handleNextDay = () => {
    setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 1)));
  };

  const visibleDates = useMemo(() => {
    if (width >= 640) {
      // sm breakpoint
      return weekDates;
    }

    // Find the index of the selected date
    const selectedIndex = weekDates.findIndex(
      (date) => date.date.toDateString() === selectedDate.toDateString()
    );

    // Calculate the start index to keep selected date centered
    let startIndex = selectedIndex - 1;
    if (startIndex < 0) startIndex = 0;
    if (startIndex > 4) startIndex = 4;

    return weekDates.slice(startIndex, startIndex + 3);
  }, [weekDates, selectedDate, width]);

  return (
    <SelectedDateContext.Provider value={selectedDate}>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto max-w-5xl px-4 py-4">
          <div className="flex items-center text-sm mb-4">
            <Link href="/" className="text-gray-600 hover:text-blue-600">
              Trang chủ
            </Link>
            <span className="mx-2 text-gray-400">›</span>
            <span className="text-gray-900">Lịch thi đấu</span>
          </div>

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
              {visibleDates.map((date, index) => {
                const isSelected =
                  date.date.toDateString() === selectedDate.toDateString();
                return (
                  <button
                    key={index}
                    className={`flex flex-col items-center p-2 rounded ${
                      isSelected
                        ? date.isToday
                          ? "bg-red-600 text-white"
                          : "bg-blue-600 text-white"
                        : "bg-white hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedDate(new Date(date.date))}
                  >
                    <div className="text-sm font-medium">
                      {date.isToday
                        ? "Hôm nay"
                        : `${date.dayNumber}/${date.month}`}
                    </div>
                    <div className="text-xs mt-0.5">{date.dayName}</div>
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

          {children}
        </div>
      </div>
    </SelectedDateContext.Provider>
  );
}
