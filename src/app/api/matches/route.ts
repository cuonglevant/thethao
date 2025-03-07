import { NextResponse } from "next/server";

const API_TOKEN = "587278a62d85417da12bfd8bccc0d284";
const BASE_URL = "https://api.football-data.org/v4";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dateFrom = searchParams.get("dateFrom");
    const dateTo = searchParams.get("dateTo");

    console.log(`🔍 DEBUG API ROUTE: Received request for matches:`, {
      dateFrom,
      dateTo,
      url: request.url,
    });

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (dateFrom && !dateRegex.test(dateFrom)) {
      return NextResponse.json(
        { error: `Invalid dateFrom format: ${dateFrom}. Expected YYYY-MM-DD` },
        { status: 400 }
      );
    }
    if (dateTo && !dateRegex.test(dateTo)) {
      return NextResponse.json(
        { error: `Invalid dateTo format: ${dateTo}. Expected YYYY-MM-DD` },
        { status: 400 }
      );
    }

    // Build query parameters
    const params = new URLSearchParams();
    if (dateFrom) params.append("dateFrom", dateFrom);
    if (dateTo) params.append("dateTo", dateTo);

    const apiUrl = `${BASE_URL}/matches?${params}`;
    console.log(`🔍 DEBUG API ROUTE: Calling external API:`, apiUrl);

    const response = await fetch(apiUrl, {
      headers: {
        "X-Auth-Token": API_TOKEN,
      },
      next: { revalidate: 60 }, // Cache for 1 minute during debug
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
