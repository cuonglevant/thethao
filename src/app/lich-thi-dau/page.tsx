"use client";

import Image from "next/image";
import { useContext, useState, useMemo, useEffect } from "react";
import { SelectedDateContext } from "./context";

type Team = {
  _id: string;
  name: string;
  logo: string;
};

type League = {
  _id: string;
  name: string;
  logo: string;
};

type Category = {
  _id: string;
  name: string;
};

type Media = {
  _id: string;
  url: string;
};

type Content = {
  _id: string;
  text: string;
};

type Match = {
  _id: string;
  date: Date;
  slug: string;
  homeTeam: Team;
  awayTeam: Team;
  league: League;
  category?: Category;
  media: Media[];
  score: {
    home: number;
    away: number;
  };
  status: "pending" | "playing" | "completed";
  content?: Content;
  views: number;
};

// Example data
const matches: Match[] = [
  {
    _id: "1",
    date: new Date("2025-03-03T13:00:00Z"),
    slug: "esteghlal-vs-alnassr",
    homeTeam: {
      _id: "team1",
      name: "Esteghlal F.C.",
      logo: "/teams/esteghlal.png",
    },
    awayTeam: {
      _id: "team2",
      name: "Al Nassr",
      logo: "/teams/alnassr.png",
    },
    league: {
      _id: "league1",
      name: "UEFA Champions League",
      logo: "/competitions/acl.png",
    },
    media: [],
    score: {
      home: 0,
      away: 0,
    },
    status: "pending",
    views: 0,
  },
  {
    _id: "2",
    date: new Date("2025-03-03T12:00:00Z"),
    slug: "gloria-vs-uta",
    homeTeam: {
      _id: "team3",
      name: "Gloria Buzau",
      logo: "/teams/gloria-buzau.png",
    },
    awayTeam: {
      _id: "team4",
      name: "UTA Arad",
      logo: "/teams/uta-arad.png",
    },
    league: {
      _id: "league2",
      name: "Superliga",
      logo: "/competitions/superliga.png",
    },
    media: [],
    score: {
      home: 2,
      away: 1,
    },
    status: "playing",
    views: 500,
  },
  {
    _id: "3",
    date: new Date("2025-03-02T12:00:00Z"),
    slug: "gloria-vs-uta",
    homeTeam: {
      _id: "team3",
      name: "Gloria Buzau",
      logo: "/teams/gloria-buzau.png",
    },
    awayTeam: {
      _id: "team4",
      name: "UTA Arad",
      logo: "/teams/uta-arad.png",
    },
    league: {
      _id: "league2",
      name: "La Liga",
      logo: "/competitions/superliga.png",
    },
    media: [],
    score: {
      home: 2,
      away: 1,
    },
    status: "completed",
    views: 500,
  },
];

type Tab = {
  id: "all" | "pending" | "playing" | "completed";
  label: string;
  disableForPastDates?: boolean;
  disableForFutureDates?: boolean;
};

const tabs: Tab[] = [
  { id: "all", label: "TẤT CẢ" },
  { id: "pending", label: "SẮP DIỄN RA", disableForPastDates: true },
  {
    id: "playing",
    label: "ĐANG DIỄN RA",
    disableForPastDates: true,
    disableForFutureDates: true,
  },
  { id: "completed", label: "ĐÃ KẾT THÚC", disableForFutureDates: true },
];

type TabId = Tab["id"];

const isSameDay = (date1: Date, date2: Date) => {
  const d1 = convertToGMT7(date1);
  const d2 = convertToGMT7(date2);

  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
};

const convertToGMT7 = (date: Date) => {
  // Only for display purposes
  const newDate = new Date(date);
  const utc = newDate.getTime() + newDate.getTimezoneOffset() * 60000;
  return new Date(utc + 3600000 * 7);
};

const formatDate = (date: Date) => {
  const gmt7Date = convertToGMT7(date);
  const day = gmt7Date.getDate();
  const month = gmt7Date.getMonth() + 1;
  return `${day}/${month}`;
};

const formatTime = (date: Date) => {
  const gmt7Date = convertToGMT7(date);
  return gmt7Date.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export default function MatchSchedulePage() {
  const selectedDate = useContext(SelectedDateContext);
  const today = new Date();
  const [selectedLeague, setSelectedLeague] = useState<string>("all");

  // Compare only dates without time
  const isToday = isSameDay(today, selectedDate);

  // Get dates without time for comparison
  const getDateOnly = (date: Date) => {
    const d = convertToGMT7(date);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  };

  const isPastDate = getDateOnly(selectedDate) < getDateOnly(today);
  const isFutureDate = getDateOnly(selectedDate) > getDateOnly(today);

  const [selectedTab, setSelectedTab] = useState<TabId>("all");

  // Reset to "all" tab if we navigate to a date where the current tab should be disabled
  useEffect(() => {
    const currentTab = tabs.find((tab) => tab.id === selectedTab);
    if (!currentTab) return;

    const shouldDisable =
      (isPastDate && currentTab.disableForPastDates) ||
      (isFutureDate && currentTab.disableForFutureDates);

    if (shouldDisable) {
      setSelectedTab("all");
    }
  }, [isPastDate, isFutureDate, selectedTab]);

  const filteredMatches = useMemo(() => {
    console.log("Selected date:", selectedDate.toISOString());
    console.log(
      "Matches:",
      matches.map((m) => ({
        id: m._id,
        date: m.date.toISOString(),
        status: m.status,
      }))
    );

    return matches
      .filter((match) => {
        // Filter by league
        if (selectedLeague !== "all" && match.league.name !== selectedLeague) {
          return false;
        }

        // Only show matches from the selected date
        const isMatchDay = isSameDay(match.date, selectedDate);
        console.log(`Match ${match._id} on selected day?`, isMatchDay);

        if (!isMatchDay) return false;

        // Hide matches with "playing" status when not viewing today
        if (!isToday && match.status === "playing") return false;

        // Hide matches with "pending" status when viewing past dates
        if (isPastDate && match.status === "pending") return false;

        // Apply tab filters
        if (selectedTab === "all") return true;
        return match.status === selectedTab;
      })
      .sort(
        (a, b) =>
          convertToGMT7(a.date).getTime() - convertToGMT7(b.date).getTime()
      );
  }, [selectedTab, isToday, isPastDate, selectedDate, selectedLeague]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-800">
          {isToday
            ? "LỊCH THI ĐẤU BÓNG ĐÁ HÔM NAY"
            : `LỊCH THI ĐẤU BÓNG ĐÁ NGÀY ${formatDate(selectedDate)}`}
        </h1>
        <div className="flex items-center">
          <span className="text-gray-600 mr-2">
            {formatTime(new Date())} Giờ Việt Nam (GMT+7)
          </span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow mb-6">
        <div className="flex border-b">
          {tabs.map((tab) => {
            const isDisabled =
              (isPastDate && tab.disableForPastDates) ||
              (isFutureDate && tab.disableForFutureDates);
            return (
              <button
                key={tab.id}
                onClick={() => !isDisabled && setSelectedTab(tab.id)}
                disabled={isDisabled}
                className={`px-6 py-3 text-sm font-medium transition-colors ${
                  selectedTab === tab.id
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : isDisabled
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-500 hover:text-blue-600"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end mb-4">
        <select
          className="p-2 border rounded-lg text-sm min-w-[200px]"
          value={selectedLeague}
          onChange={(e) => setSelectedLeague(e.target.value)}
        >
          <option value="all">Tất cả giải đấu</option>
          {Array.from(
            new Set(
              matches
                .filter((m) => isSameDay(m.date, selectedDate))
                .map((m) => m.league.name)
            )
          ).map((leagueName) => (
            <option key={leagueName} value={leagueName}>
              {leagueName}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        {filteredMatches.map((match) => (
          <div key={match._id} className="bg-white rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Image
                src={match.league.logo}
                alt={match.league.name}
                width={20}
                height={20}
                className="object-contain"
              />
              <span className="text-sm font-medium">{match.league.name}</span>
              {match.status === "playing" && (
                <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                  Live
                </span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="relative w-8 h-8">
                  <Image
                    src={match.homeTeam.logo}
                    alt={match.homeTeam.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="font-medium text-sm">
                  {match.homeTeam.name}
                </span>
              </div>
              <div className="flex items-center gap-2 px-4">
                <span className="text-sm font-bold">
                  {match.status === "pending" ? "?" : match.score.home}
                </span>
                <span className="text-xs text-gray-400 mx-1">-</span>
                <span className="text-sm font-bold">
                  {match.status === "pending" ? "?" : match.score.away}
                </span>
              </div>
              <div className="flex items-center gap-3 flex-1 justify-end">
                <span className="font-medium text-sm">
                  {match.awayTeam.name}
                </span>
                <div className="relative w-8 h-8">
                  <Image
                    src={match.awayTeam.logo}
                    alt={match.awayTeam.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
            <div className="mt-2 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {formatTime(match.date)}
              </div>
              {match.views > 0 && (
                <div className="text-xs text-gray-500">
                  {match.views.toLocaleString()} lượt xem
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
