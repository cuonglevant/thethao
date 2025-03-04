import type { Team } from "./teamTypes";
import type { League } from "./leagueTypes";
import type { Category } from "./categoryTypes";
import type { Media } from "./mediaTypes";
import type { Content } from "./contentTypes";

export type Score = {
  home: number;
  away: number;
};

export type MatchStatus = "pending" | "playing" | "completed";

export type Match = {
  _id: string;
  date: Date;
  slug: string;
  homeTeam: Team;
  awayTeam: Team;
  league: League;
  category?: Category;
  media: Media[];
  score: Score;
  status: MatchStatus;
  content?: Content;
  views: number;
};
