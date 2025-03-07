// Existing types (keeping them as they are)
export type Team = {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  address?: string;
  website?: string;
  founded?: number;
  clubColors?: string;
  venue?: string;
  lastUpdated?: string;
};

export type LeaguePosition = {
  position: number;
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gd?: number;
  points: number;
};

export type Season = {
  id: number;
  startDate: string;
  endDate: string;
  currentMatchday: number;
  winner?: Team | null;
};

export type Area = {
  id: number;
  name: string;
  code: string;
  flag: string;
};

export type Competition = {
  id: number;
  name: string;
  code: string;
  type: string;
  emblem: string;
};

// New types for match data
export type ResultSet = {
  count: number;
  first: string;
  last: string;
  played: number;
  competitions?: string;
  wins?: number;
  draws?: number;
  losses?: number;
};

export type Score = {
  winner: "HOME_TEAM" | "AWAY_TEAM" | "DRAW" | null;
  duration: "REGULAR" | "EXTRA_TIME" | "PENALTY_SHOOTOUT";
  fullTime: {
    home: number;
    away: number;
  };
  halfTime: {
    home: number;
    away: number;
  };
  extraTime?: {
    home: number | null;
    away: number | null;
  };
  penalties?: {
    home: number | null;
    away: number | null;
  };
};

export type Odds = {
  msg: string;
  // Add additional odds properties if needed
};

export type Referee = {
  id: number;
  name: string;
  type: string;
  nationality: string;
};

export type Match = {
  area: Area;
  competition: Competition;
  season: Season;
  id: number;
  utcDate: string;
  status:
    | "SCHEDULED"
    | "TIMED"
    | "IN_PLAY"
    | "PAUSED"
    | "FINISHED"
    | "SUSPENDED"
    | "POSTPONED"
    | "CANCELLED"
    | "AWARDED";
  venue: string | null; // Add this field
  matchday: number;
  stage: string;
  group: string | null;
  lastUpdated: string;
  homeTeam: Team;
  awayTeam: Team;
  score: Score;
  odds: Odds;
  referees: Referee[];
};

// Response types
export type MatchesResponse = {
  filters: {
    season: string;
    matchday?: string;
  };
  resultSet: ResultSet;
  competition: Competition;
  matches: Match[];
};

export type StandingTable = {
  position: number;
  team: Team;
  playedGames: number;
  form: string | null;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
};

export type Standing = {
  stage: string;
  type: string;
  group: string;
  table: StandingTable[];
};

export type StandingsResponse = {
  filters: {
    season: string;
  };
  area: Area;
  competition: Competition;
  season: Season;
  standings: Standing[];
};

// Add these types to your existing Types.ts file

// Types for team details
export type RunningCompetition = {
  id: number;
  name: string;
  code: string;
  type: string;
  emblem: string;
};

export type Contract = {
  start: string;
  until: string;
};

export type Coach = {
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  dateOfBirth: string;
  nationality: string;
  contract: Contract;
};

export type SquadPlayer = {
  id: number;
  name: string;
  position: string;
  dateOfBirth: string;
  nationality: string;
};

export type TeamDetail = {
  area: Area;
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  address: string;
  website: string;
  founded: number;
  clubColors: string;
  venue: string;
  runningCompetitions: RunningCompetition[];
  coach: Coach;
  squad: SquadPlayer[];
  staff: any[]; // You could define a more specific type if needed
  lastUpdated: string;
};

export type TeamsResponse = {
  count: number;
  filters: {
    season: string;
  };
  competition: Competition;
  season: Season;
  teams: TeamDetail[];
};

// Add these types for the top scorers data

export type DetailedPlayer = {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  section: string;
  position: string | null;
  shirtNumber: number | null;
  lastUpdated: string;
};

export type Scorer = {
  player: DetailedPlayer;
  team: Team;
  playedMatches: number;
  goals: number;
  assists: number;
  penalties: number;
};

export type ScorersResponse = {
  count: number;
  filters: {
    season: string;
    limit?: number;
  };
  competition: Competition;
  season: Season;
  scorers: Scorer[];
};

// Add these types for the paginated teams response

export type TeamsFilter = {
  limit?: number;
  offset?: number;
  permission?: string;
};

export type TeamsListResponse = {
  count: number;
  filters: TeamsFilter;
  teams: Team[];
};

export type TeamMatchesResponse = {
  filters: {
    competitions?: string;
    permission?: string;
    limit?: number;
  };
  resultSet: ResultSet;
  matches: Match[];
};

export type MatchesByDateResponse = {
  filters: {
    dateFrom: string;
    dateTo: string;
    permission: string;
  };
  resultSet: {
    count: number;
    competitions: string;
    first: string;
    last: string;
    played: number;
  };
  matches: Match[];
};

// Head-to-head team statistics
export type TeamH2HStats = {
  id: number;
  name: string;
  wins: number;
  draws: number;
  losses: number;
};

// Aggregated statistics for head-to-head matches
export type H2HAggregates = {
  numberOfMatches: number;
  totalGoals: number;
  homeTeam: TeamH2HStats;
  awayTeam: TeamH2HStats;
};

// Head-to-head response from the API
export type HeadToHeadResponse = {
  filters: {
    limit?: string;
    permission?: string;
  };
  resultSet: {
    count: number;
    competitions: string;
    first: string;
    last: string;
  };
  aggregates: H2HAggregates;
  matches: Match[];
};
