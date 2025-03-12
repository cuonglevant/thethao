import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const dateFrom = searchParams.get("dateFrom");
    const dateTo = searchParams.get("dateTo");
    const teamId = searchParams.get("teamId");
    const status = searchParams.get("status");

    // Determine endpoint based on parameters
    let endpoint = `${API_URL}/matches`;
    if (teamId) {
      endpoint = `${API_URL}/teams/${teamId}/matches`;
    }

    // Build query parameters
    const apiParams = new URLSearchParams();

    // Add date filters
    if (dateFrom) apiParams.append("dateFrom", dateFrom);
    if (dateTo) apiParams.append("dateTo", dateTo);

    // Add status filter if provided
    if (status) apiParams.append("status", status);

    // Build final URL
    const url = apiParams.toString() ? `${endpoint}?${apiParams}` : endpoint;
    console.log(`Fetching matches from: ${url}`);

    // Make request to football data API
    const response = await fetch(url, {
      headers: {
        "X-Auth-Token": API_TOKEN ?? "",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.error(
        `Football API error: ${response.status} ${response.statusText}`
      );
      const errorText = await response.text();
      console.error(`Error response body: ${errorText}`);

      return NextResponse.json(
        { error: `Failed to fetch matches: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in matches API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch matches" },
      { status: 500 }
    );
  }
}
