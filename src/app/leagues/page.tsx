"use client";

import { useGetCompetitions } from "@/lib/useGetData";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Competition } from "@/types/Types";

function LeagueCard({ league }: { league: Competition }) {
  const [imageError, setImageError] = useState(false);

  // Log the emblem URL when component mounts
  useEffect(() => {
    console.log(`League ${league.name}:`, {
      emblem: league.emblem,
      code: league.code,
      area: league.area.name,
    });
  }, [league]);

  return (
    <Link
      href={`/leagues/${league.code.toLowerCase()}`}
      className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
    >
      <div className="flex flex-col items-center">
        <div className="relative w-16 h-16 mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          {!imageError ? (
            <Image
              src={league.emblem}
              alt={league.name}
              fill
              className="object-contain"
              sizes="64px"
              priority
              onError={(e) => {
                console.error(`Error loading image for ${league.name}:`, {
                  error: e,
                  emblem: league.emblem,
                });
                setImageError(true);
              }}
              unoptimized
            />
          ) : (
            <span className="text-sm font-bold text-gray-500">
              {league.name.substring(0, 2)}
            </span>
          )}
        </div>
        <h2 className="text-lg font-semibold text-center">{league.name}</h2>
        <p className="text-sm text-gray-600 mt-1">{league.area.name}</p>
      </div>
    </Link>
  );
}

export default function LeaguesPage() {
  const { competitions, loading, error } = useGetCompetitions();

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow p-4 animate-pulse"
            >
              <div className="h-16 w-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Error loading leagues: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Football Leagues</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {competitions.map((league) => (
          <LeagueCard key={league.code} league={league} />
        ))}
      </div>
    </div>
  );
}
