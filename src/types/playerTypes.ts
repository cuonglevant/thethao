import type { Team } from "./teamTypes";
import type { Media } from "./mediaTypes";
import type { Nation } from "./nationTypes";

export type Player = {
  _id: string;
  name: string;
  position: string;
  slug: string;
  team: Team;
  image: Media;
  nation: Nation;
  pointsScored: number;
};
