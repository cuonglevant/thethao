import { NextRequest, NextResponse } from "next/server";

// Get the API token from environment variables
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    // Create a promise to handle the params asynchronously
    const competitionCode = await Promise.resolve(params.code);
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit") || "10";

    console.log(
      `API route: Fetching top scorers for ${competitionCode} with limit ${limit}`
    );

    // Make request to the football data API
    const response = await fetch(
      `${BASE_URL}/competitions/${competitionCode}/scorers?limit=${limit}`,
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
