import { NextRequest, NextResponse } from "next/server";

const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;
const BASE_URL = "https://api.football-data.org/v4";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // Get params from query string
  const dateFrom = searchParams.get("dateFrom");
  const dateTo = searchParams.get("dateTo");

  console.log(`🔍 DEBUG API ROUTE: Received request for matches:`, {
    dateFrom,
    dateTo,
    url: request.url,
  });

  try {
    // Build the URL with query parameters
    let url = `${BASE_URL}/matches`;
    const queryParams = new URLSearchParams();

    if (dateFrom) queryParams.append("dateFrom", dateFrom);
    if (dateTo) queryParams.append("dateTo", dateTo);

    // Add more parameters as needed

    // Add the query string to the URL
    if (queryParams.toString()) {
      url += `?${queryParams.toString()}`;
    }

    console.log(`🔍 DEBUG API ROUTE: Calling external API: ${url}`);

    const response = await fetch(url, {
      headers: {
        "X-Auth-Token": API_TOKEN || "",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    console.log(`🔍 DEBUG API ROUTE: External API response:`, {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `❌ DEBUG API ROUTE ERROR: API Error: ${response.status} ${response.statusText}`
      );
      console.error(`❌ DEBUG API ROUTE ERROR: Response body: ${errorText}`);

      return NextResponse.json(
        {
          error: `API error: ${response.status} ${response.statusText}. ${errorText}`,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log(
      `🔍 DEBUG API ROUTE: Success. Returning ${data.matches?.length} matches`
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ DEBUG API ROUTE: Error in matches API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch matches data", details: String(error) },
      { status: 500 }
    );
  }
}
