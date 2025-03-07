import { Match } from "../types/Types";
import { getFormattedMatchDate } from "./dateUtils";

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

export const groupMatchesByCompetition = (
  matches: Match[]
): Record<
  number,
  { competition: import("../types/Types").Competition; matches: Match[] }
> => {
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
  }, {} as Record<number, { competition: import("../types/Types").Competition; matches: Match[] }>);
};

export const divideMatchesByPastAndUpcoming = (matches: Match[]) => {
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
};
