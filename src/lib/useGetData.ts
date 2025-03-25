"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Season,
  Match,
  MatchesResponse,
  TeamsResponse,
  TeamDetail,
  SquadPlayer,
  ScorersResponse,
  Scorer,
  TeamsListResponse,
  Team,
  TeamMatchesResponse,
  Competition,
  MatchesByDateResponse,
  HeadToHeadResponse,
} from "../types/Types";

// Import the utility functions we've moved
import {
  getFormattedMatchDate,
  getFormattedMatchTime,
  getMatchStatus,
} from "../utils/dateUtils";
import {
  groupMatchesByMatchday,
  groupMatchesByDate,
  sortMatchesByDateTime,
  groupMatchesByCompetition,
  divideMatchesByPastAndUpcoming,
} from "../utils/matchUtils";

import { fetchCompetition } from "./api-client";

const DATA_URL = process.env.NEXT_PUBLIC_API_URL;
//set headers
const headers = {
  "X-Auth-Token": process.env.NEXT_PUBLIC_API_TOKEN ?? "",
};

// Data fetching hooks
export function useGetSeasonData(competitionCode = "CL") {
  const [seasonData, setSeasonData] = useState<Season | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSeasonData = async () => {
      try {
        setLoading(true);
        const data = await fetchCompetition(competitionCode);
        setSeasonData(data.currentSeason);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        console.error("Error fetching season data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadSeasonData();
  }, [competitionCode]);

  return { seasonData, loading, error };
}

// Update your existing useGetStandingsData hook - add this if it's missing or update if needed

export function useGetStandingsData(competitionCode = "PL") {
  const [standingsData, setStandingsData] = useState(null);
  const [leagueTable, setLeagueTable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log(`Fetching standings for competition: ${competitionCode}`);

        // Get the base URL from environment or use default
        const baseUrl =
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

        // Create absolute URL for client-side fetching
        const url = new URL(
          `/api/competitions/${competitionCode}/standings`,
          baseUrl
        );

        console.log(`Fetching standings from: ${url.toString()}`);

        const response = await fetch(url.toString());

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Failed to fetch standings: ${response.status} - ${errorText}`
          );
        }

        const data = await response.json();
        console.log(`Received standings data:`, data);

        setStandingsData(data);

        if (data && data.standings && data.standings.length > 0) {
          // Usually the first item in the standings array is the total table
          setLeagueTable(data.standings[0].table || []);
          console.log(
            `Extracted league table with ${
              data.standings[0].table?.length || 0
            } teams`
          );
        } else {
          setLeagueTable([]);
          console.log(`No table data found in standings response`);
        }
      } catch (error) {
        console.error("Error fetching standings:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch standings"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, [competitionCode]);

  return { standingsData, leagueTable, loading, error };
}

export function useGetMatchData(competitionCode = "PL", matchday?: number) {
  const [matchData, setMatchData] = useState<MatchesResponse | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        setLoading(true);
        let url = `${DATA_URL}/competitions/${competitionCode}/matches`;
        if (matchday) {
          url += `?matchday=${matchday}`;
        }

        const response = await fetch(url, { headers });

        if (!response.ok) {
          throw new Error(`Failed to fetch matches: ${response.statusText}`);
        }

        const data: MatchesResponse = await response.json();
        setMatchData(data);
        setMatches(sortMatchesByDateTime(data.matches));
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        console.error("Error fetching match data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchData();
  }, [competitionCode, matchday]);

  const groupedByMatchday = groupMatchesByMatchday(matches);
  const groupedByDate = groupMatchesByDate(matches);

  return {
    matchData,
    matches,
    groupedByMatchday,
    groupedByDate,
    loading,
    error,
    competition: matchData?.competition,
    resultSet: matchData?.resultSet,
  };
}

export function useGetTeamsData(competitionCode = "PL") {
  const [teamsData, setTeamsData] = useState<TeamsResponse | null>(null);
  const [teams, setTeams] = useState<TeamDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamsData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${DATA_URL}/competitions/${competitionCode}/teams`,
          { headers }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch teams: ${response.statusText}`);
        }

        const data: TeamsResponse = await response.json();
        setTeamsData(data);
        setTeams(data.teams);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        console.error("Error fetching teams data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamsData();
  }, [competitionCode]);

  // Helper function to get a specific team by ID
  const getTeamById = useCallback(
    (id: number): TeamDetail | undefined => {
      return teams.find((team) => team.id === id);
    },
    [teams]
  );

  // Group teams by their country/area
  const teamsByArea = useMemo(() => {
    return teams.reduce((acc, team) => {
      const areaName = team.area.name;
      if (!acc[areaName]) {
        acc[areaName] = [];
      }
      acc[areaName].push(team);
      return acc;
    }, {} as Record<string, TeamDetail[]>);
  }, [teams]);

  // Group players by position
  const getPlayersByPosition = useCallback(
    (teamId: number) => {
      const team = getTeamById(teamId);
      if (!team) return {};

      return team.squad.reduce((acc, player) => {
        if (!acc[player.position]) {
          acc[player.position] = [];
        }
        acc[player.position].push(player);
        return acc;
      }, {} as Record<string, SquadPlayer[]>);
    },
    [teams, getTeamById]
  );

  return {
    teamsData,
    teams,
    loading,
    error,
    competition: teamsData?.competition,
    season: teamsData?.season,
    getTeamById,
    teamsByArea,
    getPlayersByPosition,
  };
}

// Additional hook to get a specific team's details
export function useGetTeamDetails(teamId?: number) {
  const { teams, loading: teamsLoading, error: teamsError } = useGetTeamsData();
  const [team, setTeam] = useState<TeamDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Don't do anything if teamId is undefined
    if (teamId === undefined) {
      setLoading(false);
      return;
    }

    // Wait for teams to load
    if (teamsLoading) return;
    if (teamsError) {
      setError(teamsError);
      setLoading(false);
      return;
    }

    // Find the team
    const foundTeam = teams.find((t) => t.id === teamId);
    if (!foundTeam) {
      setError(`Team with ID ${teamId} not found`);
      setLoading(false);
      return;
    }

    setTeam(foundTeam);
    setLoading(false);
  }, [teams, teamId, teamsLoading, teamsError]);

  // Group players by position
  const playersByPosition = useMemo(() => {
    if (!team) return {};

    return team.squad.reduce((acc, player) => {
      if (!acc[player.position]) {
        acc[player.position] = [];
      }
      acc[player.position].push(player);
      return acc;
    }, {} as Record<string, SquadPlayer[]>);
  }, [team]);

  return {
    team,
    loading,
    error,
    playersByPosition,
    coach: team?.coach,
    squad: team?.squad || [],
  };
}

// Add this hook after your existing hooks

export function useGetTopScorers(competitionCode = "PL", limit?: number) {
  const [scorersData, setScorersData] = useState<ScorersResponse | null>(null);
  const [scorers, setScorers] = useState<Scorer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopScorers = async () => {
      try {
        setLoading(true);
        let url = `${DATA_URL}/competitions/${competitionCode}/scorers`;
        if (limit) {
          url += `?limit=${limit}`;
        }

        const response = await fetch(url, { headers });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch top scorers: ${response.statusText}`
          );
        }

        const data: ScorersResponse = await response.json();
        setScorersData(data);
        setScorers(data.scorers);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        console.error("Error fetching top scorers data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopScorers();
  }, [competitionCode, limit]);

  // Get scorers sorted by goals
  const sortedByGoals = useMemo(() => {
    return [...scorers].sort((a, b) => {
      // First sort by goals (descending)
      if (a.goals !== b.goals) return b.goals - a.goals;
      // If goals are equal, sort by fewer matches played (efficiency)
      if (a.playedMatches !== b.playedMatches)
        return a.playedMatches - b.playedMatches;
      // If still equal, sort by more assists
      return (b.assists ?? 0) - (a.assists ?? 0);
    });
  }, [scorers]);

  // Calculate positions with tied ranks
  const scorersWithPositions = useMemo(() => {
    return sortedByGoals.map(
      (scorer, index): { position: number; [key: string]: any } => {
        // For position, if goals are the same as the previous player, use the same position
        const position: number =
          index > 0 && scorer.goals === sortedByGoals[index - 1].goals
            ? scorersWithPositions[index - 1].position
            : index + 1;

        return {
          ...scorer,
          position,
        };
      }
    );
  }, [sortedByGoals]);

  return {
    scorersData,
    scorers,
    sortedScorers: sortedByGoals,
    scorersWithPositions,
    loading,
    error,
    competition: scorersData?.competition,
    season: scorersData?.season,
  };
}

// Add this hook after your existing hooks

export function useGetTeamsList(
  limit = 10,
  offset = 0,
  permission = "TIER_ONE"
) {
  const [teamsListData, setTeamsListData] = useState<TeamsListResponse | null>(
    null
  );
  const [teamsList, setTeamsList] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    const fetchTeamsList = async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams({
          limit: limit.toString(),
          offset: offset.toString(),
        });

        if (permission) {
          queryParams.append("permission", permission);
        }

        const response = await fetch(`${DATA_URL}/teams?${queryParams}`, {
          headers,
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch teams list: ${response.statusText}`);
        }

        const data: TeamsListResponse = await response.json();
        setTeamsListData(data);
        setTeamsList(data.teams);
        setTotalCount(data.count);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        console.error("Error fetching teams list data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamsList();
  }, [limit, offset, permission]);

  // Calculate pagination data
  const pagination = useMemo(() => {
    const totalPages = Math.ceil(totalCount / limit);
    const currentPage = Math.floor(offset / limit) + 1;

    return {
      totalItems: totalCount,
      totalPages,
      currentPage,
      itemsPerPage: limit,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1,
    };
  }, [totalCount, limit, offset]);

  // Sort teams alphabetically
  const sortedTeams = useMemo(() => {
    return [...teamsList].sort((a, b) => a.name.localeCompare(b.name));
  }, [teamsList]);

  return {
    teamsListData,
    teams: teamsList,
    sortedTeams,
    loading,
    error,
    pagination,
    filters: teamsListData?.filters,
  };
}

// Add this hook after your existing hooks

export function useGetTeamById(teamId: number | undefined) {
  const [team, setTeam] = useState<TeamDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Don't fetch if no teamId is provided
    if (!teamId) {
      setLoading(false);
      return;
    }

    const fetchTeam = async () => {
      try {
        setLoading(true);
        // Use Next.js API route instead of direct API call
        const response = await fetch(`/api/teams/${teamId}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch team: ${response.statusText}`);
        }

        const data: TeamDetail = await response.json();
        setTeam(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        console.error("Error fetching team data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, [teamId]);

  // Keep the rest of the function the same with playersByPosition, competitions, etc.
  const playersByPosition = useMemo(() => {
    if (!team) return {};

    // Define position order for sorting
    const positionOrder: Record<string, number> = {
      Goalkeeper: 1,
      Defence: 2,
      "Centre-Back": 3,
      // ... rest of your position ordering
    };

    // Group players by position
    const grouped = team.squad.reduce((acc, player) => {
      if (!acc[player.position]) {
        acc[player.position] = [];
      }
      acc[player.position].push(player);
      return acc;
    }, {} as Record<string, SquadPlayer[]>);

    // ... rest of your existing code

    return Object.keys(grouped)
      .sort((a, b) => {
        const orderA = positionOrder[a] || 999;
        const orderB = positionOrder[b] || 999;
        return orderA - orderB;
      })
      .reduce((acc, position) => {
        acc[position] = grouped[position];
        return acc;
      }, {} as Record<string, SquadPlayer[]>);
  }, [team]);

  // Get competitions the team is participating in
  const competitions = useMemo(() => team?.runningCompetitions || [], [team]);

  return {
    team,
    loading,
    error,
    playersByPosition,
    competitions,
    coach: team?.coach,
    squad: team?.squad || [],
  };
}

// Add this hook after your existing hooks

export function useGetTeamMatches(
  teamId: number | undefined,
  limit = 10,
  competitions?: string[]
) {
  const [matchesData, setMatchesData] = useState<TeamMatchesResponse | null>(
    null
  );
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Don't fetch if no teamId is provided
    if (!teamId) {
      setLoading(false);
      return;
    }

    const fetchTeamMatches = async () => {
      try {
        setLoading(true);

        // Build query parameters
        const params = new URLSearchParams();
        params.append("teamId", teamId.toString());

        if (limit) params.append("limit", limit.toString());
        if (competitions?.length)
          params.append("competitions", competitions.join(","));

        // Use the generic matches endpoint with teamId as a query parameter
        const url = `/api/matches?${params.toString()}`;
        console.log(`Fetching team matches from: ${url}`);

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Failed to fetch matches: ${response.statusText}`);
        }

        const data: TeamMatchesResponse = await response.json();
        setMatchesData(data);
        setMatches(data.matches || []);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        console.error("Error fetching team matches:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMatches();
  }, [teamId, limit, competitions]);

  return {
    matches,
    matchesData,
    loading,
    error,
  };
}

// Add this hook to useGetData.ts

export function useGetMatch(matchId: number | undefined) {
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Don't fetch if no matchId is provided
    if (!matchId) {
      setLoading(false);
      return;
    }

    const fetchMatch = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${DATA_URL}/matches/${matchId}`, {
          headers,
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch match: ${response.statusText}`);
        }

        const data: Match = await response.json();
        setMatch(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        console.error("Error fetching match data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatch();
  }, [matchId]);

  // Calculate match status display
  const matchStatusDisplay = useMemo(() => {
    if (!match) return "";
    return getMatchStatus(match);
  }, [match]);

  // Calculate if the match is live
  const isLive = useMemo(() => {
    if (!match) return false;
    return match.status === "IN_PLAY" || match.status === "PAUSED";
  }, [match]);

  // Format match date and time
  const matchDateTime = useMemo(() => {
    if (!match) return { date: "", time: "" };
    return {
      date: getFormattedMatchDate(match.utcDate),
      time: getFormattedMatchTime(match.utcDate),
    };
  }, [match]);

  return {
    match,
    loading,
    error,
    matchStatusDisplay,
    isLive,
    matchDateTime,
    homeTeam: match?.homeTeam,
    awayTeam: match?.awayTeam,
    score: match?.score,
    competition: match?.competition,
  };
}

export function useGetMatchesByDate(dateFrom?: string, dateTo?: string) {
  const [matchesData, setMatchesData] = useState<MatchesByDateResponse | null>(
    null
  );
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Default to today's date if no dates provided
    const today = new Date().toISOString().split("T")[0];
    const actualDateFrom = dateFrom ?? today;
    const actualDateTo = dateTo ?? actualDateFrom;

    const fetchMatchesByDate = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          dateFrom: actualDateFrom,
          dateTo: actualDateTo,
        });

        const response = await fetch(`${DATA_URL}/matches?${params}`, {
          headers,
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch matches: ${response.statusText}`);
        }

        const data: MatchesByDateResponse = await response.json();
        setMatchesData(data);
        setMatches(sortMatchesByDateTime(data.matches));
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        console.error("Error fetching matches by date:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchesByDate();
  }, [dateFrom, dateTo]);

  // Group matches by competition
  const matchesByCompetition = useMemo(() => {
    return matches.reduce((acc, match) => {
      const competitionId = match.competition.id;
      if (!acc[competitionId]) {
        acc[competitionId] = {
          competition: match.competition,
          matches: [],
        };
      }
      acc[competitionId].matches.push(match);
      return acc;
    }, {} as Record<number, { competition: Competition; matches: Match[] }>);
  }, [matches]);

  // Group matches by date
  const matchesByDate = useMemo(() => {
    return groupMatchesByDate(matches);
  }, [matches]);

  return {
    matchesData,
    matches,
    matchesByCompetition,
    matchesByDate,
    resultSet: matchesData?.resultSet,
    loading,
    error,
    competitionCodes: matchesData?.resultSet?.competitions?.split(",") || [],
  };
}

// Add a new hook for head-to-head data
export function useGetHeadToHead(
  team1Id: number | undefined,
  team2Id: number | undefined,
  matchID: number | undefined,
  limit = 10
) {
  const [h2hData, setH2hData] = useState<HeadToHeadResponse | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Don't fetch if either team ID is missing
    if (!team1Id || !team2Id) {
      setLoading(false);
      return;
    }

    const fetchHeadToHead = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          limit: limit.toString(),
        });

        const response = await fetch(
          `${DATA_URL}/matches/${matchID}/head2head?${params}`,
          { headers }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch head-to-head data: ${response.statusText}`
          );
        }

        const data: HeadToHeadResponse = await response.json();
        setH2hData(data);
        setMatches(sortMatchesByDateTime(data.matches));
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        console.error("Error fetching head-to-head data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHeadToHead();
  }, [team1Id, team2Id, limit]);

  // Group matches by competition
  const matchesByCompetition = useMemo(() => {
    return groupMatchesByCompetition(matches);
  }, [matches]);

  // Group matches by date
  const matchesByDate = useMemo(() => {
    return groupMatchesByDate(matches);
  }, [matches]);

  // Get past and upcoming matches
  const { pastMatches, upcomingMatches } = useMemo(() => {
    return divideMatchesByPastAndUpcoming(matches);
  }, [matches]);

  // Calculate team statistics
  const teamStats = useMemo(() => {
    if (!h2hData?.aggregates) return null;

    const { homeTeam, awayTeam } = h2hData.aggregates;
    const totalMatches = h2hData.aggregates.numberOfMatches;

    return {
      [homeTeam.id]: {
        team: homeTeam,
        winPercentage:
          totalMatches > 0 ? (homeTeam.wins / totalMatches) * 100 : 0,
      },
      [awayTeam.id]: {
        team: awayTeam,
        winPercentage:
          totalMatches > 0 ? (awayTeam.wins / totalMatches) * 100 : 0,
      },
      drawPercentage:
        totalMatches > 0 ? (homeTeam.draws / totalMatches) * 100 : 0,
    };
  }, [h2hData]);

  return {
    h2hData,
    matches,
    matchesByCompetition,
    matchesByDate,
    pastMatches,
    upcomingMatches,
    aggregates: h2hData?.aggregates,
    resultSet: h2hData?.resultSet,
    teamStats,
    loading,
    error,
  };
}

// Add this new hook for fetching competitions
export function useGetCompetitions(plan = "TIER_ONE") {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use the Next.js API route instead of direct API call
        const baseUrl =
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const url = new URL("/api/competitions", baseUrl);

        if (plan) {
          url.searchParams.append("plan", plan);
        }

        console.log(`Fetching competitions from: ${url.toString()}`);

        const response = await fetch(url.toString());

        if (!response.ok) {
          throw new Error(
            `Failed to fetch competitions: ${response.statusText}`
          );
        }

        const data = await response.json();
        setCompetitions(data.competitions || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        console.error("Error fetching competitions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompetitions();
  }, [plan]);

  // Sort competitions by name
  const sortedCompetitions = useMemo(() => {
    return [...competitions].sort((a, b) => a.name.localeCompare(b.name));
  }, [competitions]);

  return {
    competitions: sortedCompetitions,
    loading,
    error,
  };
}
