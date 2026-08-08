import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  getRedis,
  isRedisReady,
  VISIT_TOTAL_KEY,
  VISIT_UNIQUE_KEY,
} from "@/lib/redis";

export const runtime = "nodejs";

function makeVid(): string {
  return crypto.randomUUID();
}

export async function POST() {
  const ready = await isRedisReady();
  if (!ready) {
    return NextResponse.json({
      total: 0,
      unique: 0,
      configured: false,
    });
  }

  const redis = getRedis()!;
  const cookieStore = await cookies();
  let vid = cookieStore.get("vid")?.value;
  const isNew = !vid;

  if (!vid) {
    vid = makeVid();
  }

  const total = await redis.incr(VISIT_TOTAL_KEY);
  await redis.sadd(VISIT_UNIQUE_KEY, vid);
  const unique = await redis.scard(VISIT_UNIQUE_KEY);

  const res = NextResponse.json({
    total,
    unique,
    configured: true,
    isNew,
  });

  if (isNew) {
    res.cookies.set("vid", vid, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  return res;
}
