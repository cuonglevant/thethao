import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Season,
  Match,
  MatchesResponse,
  StandingsResponse,
  StandingTable,
  TeamsResponse,
  TeamDetail,
  SquadPlayer,
  ScorersResponse,
  Scorer,
  TeamsListResponse,
  Team,
  TeamMatchesResponse,
  Competition,
} from "../types/Types";

// Match date/time formatting utilities
export const getFormattedMatchDate = (utcDate: string): string => {
  const date = new Date(utcDate);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const getFormattedMatchTime = (utcDate: string): string => {
  const date = new Date(utcDate);
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getMatchStatus = (match: Match): string => {
  switch (match.status) {
    case "FINISHED":
      return "FT";
    case "IN_PLAY":
      return "LIVE";
    case "PAUSED":
      return "HT";
    case "SCHEDULED":
      return getFormattedMatchTime(match.utcDate);
    default:
      return match.status;
  }
};

// Match grouping utilities
export const groupMatchesByMatchday = (
  matches: Match[]
): Record<number, Match[]> => {
  return matches.reduce((acc, match) => {
    const matchday = match.matchday;
    if (!acc[matchday]) {
      acc[matchday] = [];
    }
    acc[matchday].push(match);
    return acc;
  }, {} as Record<number, Match[]>);
};

export const groupMatchesByDate = (
  matches: Match[]
): Record<string, Match[]> => {
  return matches.reduce((acc, match) => {
    const dateKey = getFormattedMatchDate(match.utcDate);
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(match);
    return acc;
  }, {} as Record<string, Match[]>);
};

export const sortMatchesByDateTime = (matches: Match[]): Match[] => {
  return [...matches].sort(
    (a, b) => new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime()
  );
};

// Data fetching hooks
export function useGetSeasonData(competitionCode = "PL") {
  const [seasonData, setSeasonData] = useState<Season | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSeasonData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/competitions/${competitionCode}`);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch season data: ${response.statusText}`
          );
        }

        const data = await response.json();
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

    fetchSeasonData();
  }, [competitionCode]);

  return {
    seasonData,
    loading,
    error,
  };
}

export function useGetStandingsData(competitionCode = "PL") {
  const [standingsData, setStandingsData] = useState<StandingsResponse | null>(
    null
  );
  const [leagueTable, setLeagueTable] = useState<StandingTable[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStandingsData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/competitions/${competitionCode}/standings`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch standings: ${response.statusText}`);
        }

        const data: StandingsResponse = await response.json();
        setStandingsData(data);

        // Extract the league table from the first standings group
        if (data.standings && data.standings.length > 0) {
          setLeagueTable(data.standings[0].table);
        }

        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        console.error("Error fetching standings data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStandingsData();
  }, [competitionCode]);

  return {
    standingsData,
    leagueTable,
    loading,
    error,
    competition: standingsData?.competition,
    season: standingsData?.season,
  };
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
        let url = `/api/competitions/${competitionCode}/matches`;
        if (matchday) {
          url += `?matchday=${matchday}`;
        }

        const response = await fetch(url);

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
          `/api/competitions/${competitionCode}/teams`
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
    squad: team?.squad || [],
    coach: team?.coach,
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
        let url = `/api/competitions/${competitionCode}/scorers`;
        if (limit) {
          url += `?limit=${limit}`;
        }

        const response = await fetch(url);

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
      return b.assists - a.assists;
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

        const response = await fetch(`/api/teams?${queryParams}`);

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

  // Group players by position
  const playersByPosition = useMemo(() => {
    if (!team) return {};

    // Define position order for sorting
    const positionOrder: Record<string, number> = {
      Goalkeeper: 1,
      Defence: 2,
      "Centre-Back": 3,
      "Left-Back": 4,
      "Right-Back": 5,
      "Defensive Midfield": 6,
      "Central Midfield": 7,
      Midfield: 8,
      "Attacking Midfield": 9,
      "Left Winger": 10,
      "Right Winger": 11,
      "Right Midfield": 12,
      "Left Midfield": 13,
      Offence: 14,
      "Centre-Forward": 15,
    };

    // Group players by position
    const grouped = team.squad.reduce((acc, player) => {
      if (!acc[player.position]) {
        acc[player.position] = [];
      }
      acc[player.position].push(player);
      return acc;
    }, {} as Record<string, SquadPlayer[]>);

    // Sort players within each position by name
    Object.keys(grouped).forEach((position) => {
      grouped[position].sort((a, b) => a.name.localeCompare(b.name));
    });

    // Return positions in logical order
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

        // Build query params
        const params = new URLSearchParams();
        params.append("limit", limit.toString());

        if (competitions && competitions.length > 0) {
          params.append("competitions", competitions.join(","));
        }

        const response = await fetch(`/api/teams/${teamId}/matches?${params}`);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch team matches: ${response.statusText}`
          );
        }

        const data: TeamMatchesResponse = await response.json();
        setMatchesData(data);
        setMatches(sortMatchesByDateTime(data.matches));
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

  // Past and upcoming matches
  const { pastMatches, upcomingMatches } = useMemo(() => {
    const now = new Date();
    const past: Match[] = [];
    const upcoming: Match[] = [];

    matches.forEach((match) => {
      if (new Date(match.utcDate) < now) {
        past.push(match);
      } else {
        upcoming.push(match);
      }
    });

    return {
      pastMatches: past.reverse(), // Most recent first
      upcomingMatches: upcoming, // Soonest first
    };
  }, [matches]);

  return {
    matchesData,
    matches,
    matchesByCompetition,
    matchesByDate,
    pastMatches,
    upcomingMatches,
    resultSet: matchesData?.resultSet,
    loading,
    error,
  };
}
