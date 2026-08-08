import Redis from "ioredis";

let redis: Redis | null = null;
let initAttempted = false;

/** Build connection URL from K8s-friendly env vars. */
export function resolveRedisUrl(): string | null {
  if (process.env.REDIS_URL?.trim()) {
    return process.env.REDIS_URL.trim();
  }

  const host = process.env.REDIS_HOST?.trim();
  if (!host) return null;

  const port = process.env.REDIS_PORT?.trim() || "6379";
  const password = process.env.REDIS_PASSWORD?.trim();
  const db = process.env.REDIS_DB?.trim() || "0";

  if (password) {
    return `redis://:${encodeURIComponent(password)}@${host}:${port}/${db}`;
  }

  return `redis://${host}:${port}/${db}`;
}

export function getRedis(): Redis | null {
  if (redis) return redis;
  if (initAttempted) return null;

  initAttempted = true;
  const url = resolveRedisUrl();
  if (!url) return null;

  try {
    redis = new Redis(url, {
      maxRetriesPerRequest: 1,
      enableReadyCheck: true,
      lazyConnect: false,
      connectTimeout: 3000,
      // Avoid crashing the Next process if Redis is briefly down
      retryStrategy: (times) => (times > 3 ? null : Math.min(times * 200, 1000)),
    });

    redis.on("error", (err) => {
      console.error("[redis]", err.message);
    });

    return redis;
  } catch (err) {
    console.error("[redis] init failed", err);
    redis = null;
    return null;
  }
}

export async function isRedisReady(): Promise<boolean> {
  const client = getRedis();
  if (!client) return false;

  try {
    const pong = await client.ping();
    return pong === "PONG";
  } catch {
    return false;
  }
}

export const VISIT_TOTAL_KEY = "visits:total";
export const VISIT_UNIQUE_KEY = "visits:unique";
