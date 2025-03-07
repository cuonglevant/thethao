import { Match } from "../types/Types";

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
