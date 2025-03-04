import type { League } from "./leagueTypes";

export type Nation = {
  _id: string;
  name: string;
  flag: string;
  slug: string;
  league: League[];
};
