import { NextRequest, NextResponse } from "next/server";

const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const competitionCode = await Promise.resolve(params.code);

    console.log(`API route: Fetching standings for ${competitionCode}`);

    const response = await fetch(
      `${BASE_URL}/competitions/${competitionCode}/standings`,
      {
        headers: {
          "X-Auth-Token": API_TOKEN || "",
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    console.log(`API response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error from football API: ${response.status}`, errorText);
      return NextResponse.json(
        { error: `Football API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching standings:", error);
    return NextResponse.json(
      { error: "Server error while fetching standings" },
      { status: 500 }
    );
  }
}
