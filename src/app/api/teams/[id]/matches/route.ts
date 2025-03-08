import { NextRequest, NextResponse } from "next/server";

const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;
const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.football-data.org/v4";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const teamId = params.id;
    const { searchParams } = new URL(request.url);

    // Get parameters from request
    const dateFrom = searchParams.get("dateFrom");
    const dateTo = searchParams.get("dateTo");
    const status = searchParams.get("status");

    console.log(`Fetching team matches for team ID: ${teamId}`, {
      dateFrom,
      dateTo,
      status,
    });

    // Build the URL with query parameters
    const apiParams = new URLSearchParams();

    // Add parameters if they exist
    if (dateFrom) apiParams.append("dateFrom", dateFrom);
    if (dateTo) apiParams.append("dateTo", dateTo);
    if (status) apiParams.append("status", status);

    // Construct the final URL
    const url = `${BASE_URL}/teams/${teamId}/matches${
      apiParams.toString() ? "?" + apiParams.toString() : ""
    }`;

    console.log(`Calling football-data.org API: ${url}`);

    const response = await fetch(url, {
      headers: {
        "X-Auth-Token": API_TOKEN || "",
        Accept: "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error from football API: ${response.status}`, errorText);
      return NextResponse.json(
        { error: `Football API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log(
      `Retrieved ${data.matches?.length || 0} matches for team ${teamId}`
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching team matches:", error);
    return NextResponse.json(
      { error: "Server error while fetching matches" },
      { status: 500 }
    );
  }
}
