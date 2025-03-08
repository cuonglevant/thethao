// Team ID mapping for football-data.org API
export const TEAM_ID_MAP: Record<string, number> = {
  "manchester-united": 66,
  mu: 66,
  "manchester-city": 65,
  "man-city": 65,
  liverpool: 64,
  chelsea: 61,
  arsenal: 57,
  "tottenham-hotspur": 73,
  spurs: 73,
  "leicester-city": 338,
  "west-ham-united": 563,
  barcelona: 81,
  barca: 81,
  "real-madrid": 86,
  juventus: 109,
  "bayern-munich": 5,
  psg: 524,
  "borussia-dortmund": 4,
};

// Team data for navigation
export const POPULAR_TEAMS = [
  {
    id: 66,
    name: "Manchester United",
    shortName: "MU",
    logo: "/teams/manchester-united.png",
  },
  {
    id: 64,
    name: "Liverpool",
    shortName: "Liverpool",
    logo: "/teams/liverpool.png",
  },
  { id: 57, name: "Arsenal", shortName: "Arsenal", logo: "/teams/arsenal.svg" },
  {
    id: 65,
    name: "Manchester City",
    shortName: "Man City",
    logo: "/teams/manchester-city.svg",
  },
  { id: 61, name: "Chelsea", shortName: "Chelsea", logo: "/teams/chelsea.svg" },
  {
    id: 81,
    name: "Barcelona",
    shortName: "Barcelona",
    logo: "/teams/barcelona.svg",
  },
  {
    id: 86,
    name: "Real Madrid",
    shortName: "Real Madrid",
    logo: "/teams/real-madrid.png",
  },
];
