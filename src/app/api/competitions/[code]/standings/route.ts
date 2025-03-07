import { NextResponse } from "next/server";

const API_TOKEN = "587278a62d85417da12bfd8bccc0d284";

export async function GET(
  request: Request,
  { params }: { params: { code: string } }
) {
  try {
    const code = params.code;

    console.log(
      `Proxying request to football-data.org for ${code} standings...`
    );

    const response = await fetch(
      `https://api.football-data.org/v4/competitions/${code}/standings`,
      {
        headers: {
          "X-Auth-Token": API_TOKEN,
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error: ${response.status} ${response.statusText}`);
      console.error(`Error body: ${errorText}`);

      return NextResponse.json(
        { error: `API error: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in standings API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch standings data" },
      { status: 500 }
    );
  }
}
