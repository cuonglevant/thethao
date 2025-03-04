import type { Nation } from "./nationTypes";
import type { Match } from "./matchTypes";

export type Category = {
  _id: string;
  name: string;
  description: string;
  slug: string;
  nation: Nation;
  matches: Match[];
};
