/**
 * This is an example of an in memory rate limiter you can explicitly use
 * in your server actions or RSC routes.
 *
 * As a reminder, this type of rate limiter only works when deploying to a single VPS instance.
 * The moment you scale up, you'll need to use a distributed rate limiter such as redis (or use upstash).
 */
import { getIP } from "@/utils/get-ip";

const trackers: Record<string, { count: number; expiresAt: number }> = {};

const pruneExpiredTrackers = () => {
  const now = Date.now();

  for (const key in trackers) {
    if (trackers[key].expiresAt < now) {
      delete trackers[key];
    }
  }
};

// prune expired trackers every minute
setInterval(pruneExpiredTrackers, 60 * 1000);

export class RateLimitError extends Error {
  limit: number;
  remaining: number;
  reset: number;

  constructor({
    limit,
    remaining,
    reset,
  }: {
    limit: number;
    remaining: number;
    reset: number;
  }) {
    super("Too many requests");
    this.name = "RateLimitError";
    this.limit = limit;
    this.remaining = remaining;
    this.reset = reset;
  }
}

export const rateLimitByKey = ({
  key = "global",
  limit = 1,
  window = 10000, // 10 seconds
  throwError = false,
}: {
  key?: string;
  limit?: number;
  window?: number;
  throwError?: boolean;
}) => {
  const tracker = trackers[key] || { count: 0, expiresAt: 0 };

  if (!trackers[key]) {
    trackers[key] = tracker;
  }

  if (tracker.expiresAt < Date.now()) {
    tracker.count = 0;
    tracker.expiresAt = Date.now() + window;
  }

  tracker.count++;

  if (tracker.count > limit) {
    if (throwError) {
      throw new RateLimitError({
        limit,
        remaining: limit - tracker.count,
        reset: Math.ceil((tracker.expiresAt - Date.now()) / 1000),
      });
    }

    return {
      success: false,
      limit,
      remaining: 0,
      reset: Math.ceil((tracker.expiresAt - Date.now()) / 1000),
    };
  }

  return {
    success: true,
    limit,
    remaining: limit - tracker.count,
    reset: Math.ceil((tracker.expiresAt - Date.now()) / 1000),
  };
};

export const rateLimitByIP = async ({
  key = "global",
  limit = 1,
  window = 10000, // 10 seconds
  throwError = false,
}: {
  key?: string;
  limit?: number;
  window?: number;
  throwError?: boolean;
}) => {
  const ip = await getIP();

  return rateLimitByKey({
    key: `${key}-${ip}`,
    limit,
    window,
    throwError,
  });
};
