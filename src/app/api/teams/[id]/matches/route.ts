import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const teamId = params.id;
    const { searchParams } = new URL(request.url);

    // Get query parameters
    const dateFrom = searchParams.get("dateFrom");
    const dateTo = searchParams.get("dateTo");

    // Handle status parameter correctly
    // The Football API expects status as a single value or comma-separated without spaces
    const status = searchParams.get("status");

    // Build API URL with query parameters
    const endpoint = `${API_URL}/teams/${teamId}/matches`;
    const apiParams = new URLSearchParams();

    if (dateFrom) apiParams.append("dateFrom", dateFrom);
    if (dateTo) apiParams.append("dateTo", dateTo);

    // Football-data.org API expects "status" not "statuses", fix if needed
    if (status) apiParams.append("status", status);

    // Append parameters if any exist
    const url = apiParams.toString() ? `${endpoint}?${apiParams}` : endpoint;

    console.log(`Fetching team matches from: ${url}`);

    // Make request to football data API
    const response = await fetch(url, {
      headers: {
        "X-Auth-Token": API_TOKEN || "",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.error(
        `Football API error: ${response.status} ${response.statusText}`
      );
      return NextResponse.json(
        { error: `Failed to fetch team matches: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in team matches API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch team matches" },
      { status: 500 }
    );
  }
}
