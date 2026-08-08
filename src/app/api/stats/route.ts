import { NextResponse } from "next/server";
import {
  getRedis,
  isRedisReady,
  VISIT_TOTAL_KEY,
  VISIT_UNIQUE_KEY,
} from "@/lib/redis";

export const runtime = "nodejs";

export async function GET() {
  const ready = await isRedisReady();
  if (!ready) {
    return NextResponse.json({
      total: 0,
      unique: 0,
      configured: false,
    });
  }

  const redis = getRedis()!;
  const [total, unique] = await Promise.all([
    redis.get(VISIT_TOTAL_KEY),
    redis.scard(VISIT_UNIQUE_KEY),
  ]);

  return NextResponse.json({
    total: Number(total ?? 0),
    unique: Number(unique ?? 0),
    configured: true,
  });
}
