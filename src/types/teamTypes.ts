import { League } from "./leagueTypes";
import { Category } from "./categoryTypes";
import { Media } from "./mediaTypes";
import { Player } from "./playerTypes";
import { Nation } from "./nationTypes";

export type Team = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  league: League;
  points: number;
  category?: Category;
  media: Media[];
  player: Player[];
  nation: Nation;
  flag: string;
  shortName: string;
  logo: string;
};

export type LeagueStanding = {
  position: number;
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gd?: number;
  points: number;
};
