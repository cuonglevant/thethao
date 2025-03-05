import { Team } from "@/types/teamTypes"; // Ensure this path is correct
import { League } from "@/types/leagueTypes";
import { Player } from "@/types/playerTypes";
import { Category } from "@/types/categoryTypes";
import { Match } from "@/types/matchTypes";
import { Nation } from "@/types/nationTypes";

const BASE_URL = process.env.BASE_URL;

export async function getTeamBySlug(slug: string): Promise<Team> {
  const response = await fetch(`${BASE_URL}/teams/${slug}`);

  if (!response.ok) {
    throw new Error(`Error fetching team data: ${response.statusText}`);
  }

  const team: Team = await response.json();
  return team;
}

export async function getLeagueBySlug(slug: string): Promise<League> {
  const response = await fetch(`${BASE_URL}/leagues/${slug}`);

  if (!response.ok) {
    throw new Error(`Error fetching league data: ${response.statusText}`);
  }
  const league: League = await response.json();
  return league;
}

export async function getTopTeamsByPoints(slug: string): Promise<Team[]> {
  const response = await fetch(`${BASE_URL}/leagues/${slug}/top-teams`);

  if (!response.ok) {
    throw new Error(
      `Error fetching top teams by points: ${response.statusText}`
    );
  }

  const teams: Team[] = await response.json();
  return teams;
}

export async function getTopPlayersByPoints(slug: string): Promise<Player[]> {
  const response = await fetch(`${BASE_URL}/leagues/${slug}/top-players`);

  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }

  const players: Player[] = await response.json();
  return players;
}

export async function getCategoryBySlug(slug: string): Promise<Category> {
  const response = await fetch(`${BASE_URL}/categories/${slug}`);

  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }

  const category: Category = await response.json();
  return category;
}

export async function getMatchesByDate(date: string): Promise<Match[]> {
  const response = await fetch(`${BASE_URL}/matches/date/${date}`);

  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }

  const matches: Match[] = await response.json();
  return matches;
}

export async function getMatchBySlug(slug: string): Promise<Match> {
  const response = await fetch(`${BASE_URL}/matches/${slug}`);

  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }

  const match: Match = await response.json();
  return match;
}

export async function getTopMatches(leagueId: string): Promise<Match[]> {
  const response = await fetch(`${BASE_URL}/matches/top/views`);

  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }

  const matches: Match[] = await response.json();
  return matches;
}

export async function getNationBySlug(slug: string): Promise<Nation> {
  const response = await fetch(`${BASE_URL}/nations/${slug}`);

  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }

  const nation: Nation = await response.json();
  return nation;
}

export async function getPlayerBySlug(slug: string): Promise<Player> {
  const response = await fetch(`${BASE_URL}/players/${slug}`);

  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }

  const player: Player = await response.json();
  return player;
}
