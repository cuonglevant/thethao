import { NextRequest, NextResponse } from "next/server";

const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;
const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.football-data.org/v4";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // Get params from query string
  const dateFrom = searchParams.get("dateFrom");
  const dateTo = searchParams.get("dateTo");
  const teamId = searchParams.get("team"); // Add team parameter

  console.log(`🔍 DEBUG API ROUTE: Received request for matches:`, {
    dateFrom,
    dateTo,
    teamId,
    url: request.url,
  });

  try {
    // Build the URL with query parameters
    let url;
    const queryParams = new URLSearchParams();

    // If teamId is provided, use team-specific matches endpoint
    if (teamId) {
      // Use teamId directly with the teams endpoint
      url = `${BASE_URL}/teams/${teamId}/matches`;

      // For team matches, you may want to expand the date range if no specific dates provided
      if (!dateFrom) {
        // If no date provided, get matches from today
        const today = new Date();
        queryParams.append("dateFrom", today.toISOString().split("T")[0]);
      } else {
        queryParams.append("dateFrom", dateFrom);
      }

      if (dateTo) {
        queryParams.append("dateTo", dateTo);
      } else if (dateFrom) {
        // If dateFrom is provided but not dateTo, use a 30-day window
        // This helps ensure we get some matches even if the immediate schedule is empty
        queryParams.append("limit", "10");
      }

      // You can add a status filter to get upcoming matches
      queryParams.append("status", "SCHEDULED,TIMED,IN_PLAY");
    } else {
      // General matches endpoint
      url = `${BASE_URL}/matches`;

      // Add date filters for general matches query
      if (dateFrom) queryParams.append("dateFrom", dateFrom);
      if (dateTo) queryParams.append("dateTo", dateTo);
    }

    // Add the query string to the URL
    if (queryParams.toString()) {
      url += `?${queryParams.toString()}`;
    }

    console.log(`🔍 DEBUG API ROUTE: Calling external API: ${url}`);

    const response = await fetch(url, {
      headers: {
        "X-Auth-Token": API_TOKEN || "",
        Accept: "application/json",
      },
      next: { revalidate: 60 }, // Reduce cache time for debugging
    });

    console.log(`Response status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      let errorText;
      try {
        errorText = await response.text();
      } catch (e) {
        errorText = "Could not read error response";
      }

      console.error(`❌ API Error: ${response.status}`, errorText);
      return NextResponse.json(
        { error: `API error: ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log(
      `✅ API Success. Found ${
        data.matches?.length || 0
      } matches for team ${teamId}`
    );

    // If no matches found but we have a teamId, try a broader search
    if ((!data.matches || data.matches.length === 0) && teamId) {
      console.log(
        "No matches found for the specified dates, trying with broader parameters"
      );
      return NextResponse.json({
        matches: [],
        message:
          "No upcoming matches found for this team in the specified date range",
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in matches API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch matches", details: String(error) },
      { status: 500 }
    );
  }
}
