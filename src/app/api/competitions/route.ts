import { NextRequest, NextResponse } from "next/server";
import { Competition } from "@/types/Types";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://api.football-data.org/v4";
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const plan = searchParams.get("plan") || "TIER_ONE"; // Default to TIER_ONE

    console.log(`API route: Fetching competitions with plan ${plan}`);

    // Build API URL with query parameters
    const endpoint = `${API_URL}/competitions`;
    const apiParams = new URLSearchParams();

    if (plan) apiParams.append("plan", plan);

    const url = apiParams.toString() ? `${endpoint}?${apiParams}` : endpoint;

    console.log(`Fetching competitions from: ${url}`);

    // Make request to football data API
    const response = await fetch(url, {
      headers: {
        "X-Auth-Token": API_TOKEN || "",
      },
      next: { revalidate: 86400 }, // Cache for 24 hours since competitions rarely change
    });

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

    // Log the first few competitions to check emblem URLs
    console.log(
      "Sample competition data:",
      data.competitions?.slice(0, 3).map((c: Competition) => ({
        name: c.name,
        emblem: c.emblem,
        code: c.code,
      }))
    );

    // Log the total number of competitions
    console.log(
      `Total competitions received: ${data.competitions?.length || 0}`
    );

    return NextResponse.json(data);
  } catch (error) {
    // Log any unexpected errors
    console.error("Error fetching competitions:", error);
    return NextResponse.json(
      { error: "Server error while fetching competitions" },
      { status: 500 }
    );
  }
}
