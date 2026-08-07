import { createClient } from "redis";
import { NextResponse } from "next/server";

export async function GET() {
  const client = createClient({
    url: process.env.REDIS_URL,
  });

  try {
    await client.connect();

    await client.ping();

    await client.quit();

    return NextResponse.json({
      status: "healthy",
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "unhealthy",
      },
      { status: 500 }
    );
  }
}
