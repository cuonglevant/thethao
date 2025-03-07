import { NextRequest, NextResponse } from "next/server";

// Get the API token from environment variables
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;
const BASE_URL = "https://api.football-data.org/v4";

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  // Get the limit from query params, default to 10
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit") || "10";

  console.log(
    `API route: Fetching top scorers for ${params.code} with limit ${limit}`
  );

  try {
    // Make request to the football data API
    const response = await fetch(
      `${BASE_URL}/competitions/${params.code}/scorers?limit=${limit}`,
      {
        headers: {
          "X-Auth-Token": API_TOKEN || "",
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    // Log the response status for debugging
    console.log(`API response status: ${response.status}`);

    if (!response.ok) {
      // Log detailed error for debugging
      const errorText = await response.text();
      console.error(`Error from football API: ${response.status}`, errorText);

      // Return appropriate error response
      return NextResponse.json(
        { error: `Football API error: ${response.status}` },
        { status: response.status }
      );
    }

    // Parse and return the data
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    // Log any unexpected errors
    console.error("Error fetching top scorers:", error);
    return NextResponse.json(
      { error: "Server error while fetching top scorers" },
      { status: 500 }
    );
  }
}
