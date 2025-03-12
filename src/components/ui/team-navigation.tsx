"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGetTeamById } from "@/lib/api-client";

// Define popular team IDs
const POPULAR_TEAM_IDS = [
  65, // Manchester City
  66, // Manchester United
  57, // Arsenal
  61, // Chelsea
  64, // Liverpool
  67, // Newcastle
  73, // Tottenham
  81, // Barcelona
  86, // Real Madrid
  98, // AC Milan
  108, // Inter
  505, // PSG
  5, // Bayern Munich
];

// Helper function to slugify team names
const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

// Interface for cached team data
interface CachedTeam {
  id: number;
  name: string;
  shortName: string;
  crest: string;
  slug: string;
}

export function TeamNavigation() {
  const [teams, setTeams] = useState<CachedTeam[]>([]);
  const [loading, setLoading] = useState(true);

  // Attempt to load teams from localStorage on component mount
  useEffect(() => {
    const cachedTeams = localStorage.getItem("popularTeams");
    if (cachedTeams) {
      try {
        const parsedTeams = JSON.parse(cachedTeams);
        // Check if cache is fresh (less than 24 hours old)
        const cacheTime = localStorage.getItem("popularTeamsTime");
        const now = Date.now();
        if (cacheTime && now - parseInt(cacheTime) < 86400000) {
          // 24 hours
          setTeams(parsedTeams);
          setLoading(false);
          return;
        }
      } catch (e) {
        console.error("Error parsing cached teams:", e);
      }
    }

    // If we reach here, we either have no cache or it's expired
    fetchAllTeams();
  }, []);

  // Function to fetch all teams
  const fetchAllTeams = async () => {
    setLoading(true);
    const fetchedTeams: CachedTeam[] = [];

    try {
      // Fetch teams in parallel with Promise.all
      const teamPromises = POPULAR_TEAM_IDS.map(async (teamId) => {
        try {
          const response = await fetch(`/api/teams/${teamId}`);
          if (!response.ok) throw new Error(`Failed to fetch team ${teamId}`);

          const team = await response.json();
          return {
            id: team.id,
            name: team.name,
            shortName: team.shortName || team.tla || team.name,
            crest: team.crest || "/placeholder.svg",
            slug: slugify(team.name),
          };
        } catch (error) {
          console.error(`Error fetching team ${teamId}:`, error);
          return null;
        }
      });

      const results = await Promise.all(teamPromises);
      const validTeams = results.filter(Boolean) as CachedTeam[];

      // Update state and cache
      setTeams(validTeams);
      localStorage.setItem("popularTeams", JSON.stringify(validTeams));
      localStorage.setItem("popularTeamsTime", Date.now().toString());
    } catch (error) {
      console.error("Error fetching teams:", error);
    } finally {
      setLoading(false);
    }
  };

  // Show loading placeholder or actual team navigation
  return (
    <div className="bg-white py-2 border-b">
      <div className="container mx-auto px-2">
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-2 sm:gap-4">
          {loading
            ? // Loading placeholders
              Array(8)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="flex items-center animate-pulse">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-200 rounded-full mr-2"></div>
                    <div className="w-12 h-4 bg-gray-200 rounded"></div>
                  </div>
                ))
            : // Actual team navigation
              teams.map((team) => (
                <Link
                  key={team.id}
                  href={`/teams/${team.id}-${team.slug}`}
                  className="flex items-center"
                >
                  <Image
                    src={team.crest}
                    alt={team.name}
                    width={25}
                    height={25}
                    className="mr-2 object-contain w-5 h-5 sm:w-6 sm:h-6"
                  />
                  <span className="text-sm sm:text-base hover:text-pink-800">
                    {team.shortName}
                  </span>
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
}
