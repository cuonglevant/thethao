// Central API client to handle all football data requests

export async function fetchCompetition(code: string) {
  const response = await fetch(`/api/competitions/${code}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const errorMessage = errorData?.error || response.statusText;
    throw new Error(`Failed to fetch competition: ${errorMessage}`);
  }

  return response.json();
}

export async function fetchStandings(code: string) {
  const response = await fetch(`/api/competitions/${code}/standings`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const errorMessage = errorData?.error || response.statusText;
    throw new Error(`Failed to fetch standings: ${errorMessage}`);
  }

  return response.json();
}

export async function fetchMatches(code: string, matchday?: number) {
  const params = new URLSearchParams();
  if (matchday) params.append("matchday", matchday.toString());

  const response = await fetch(`/api/competitions/${code}/matches?${params}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const errorMessage = errorData?.error || response.statusText;
    throw new Error(`Failed to fetch matches: ${errorMessage}`);
  }

  return response.json();
}

// Add more API functions as needed
