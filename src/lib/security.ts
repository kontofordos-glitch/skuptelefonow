import { NextRequest, NextResponse } from "next/server";

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

function clientIp(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local"
  );
}

export function rateLimit(
  request: NextRequest,
  key: string,
  options: { limit: number; windowMs: number }
) {
  const now = Date.now();
  const bucketKey = `${key}:${clientIp(request)}`;
  const current = buckets.get(bucketKey);

  if (!current || current.resetAt < now) {
    buckets.set(bucketKey, { count: 1, resetAt: now + options.windowMs });
    return null;
  }

  current.count += 1;

  if (current.count > options.limit) {
    return NextResponse.json(
      { message: "Za dużo prób. Spróbuj ponownie za chwilę." },
      { status: 429 }
    );
  }

  return null;
}

export function assertSameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    const originUrl = new URL(origin);
    const allowedHosts = new Set([request.nextUrl.host]);

    for (const value of [process.env.NEXTAUTH_URL, process.env.NEXT_PUBLIC_SITE_URL]) {
      if (value) allowedHosts.add(new URL(value).host);
    }

    if (allowedHosts.has(originUrl.host)) return true;

    const requestPort = request.nextUrl.port || (request.nextUrl.protocol === "https:" ? "443" : "80");
    const originPort = originUrl.port || (originUrl.protocol === "https:" ? "443" : "80");
    const loopbackHosts = new Set(["localhost", "127.0.0.1", "::1"]);

    return loopbackHosts.has(originUrl.hostname) && loopbackHosts.has(request.nextUrl.hostname) && requestPort === originPort;
  } catch {
    return false;
  }
}

export function originGuard(request: NextRequest) {
  if (assertSameOrigin(request)) return null;

  return NextResponse.json(
    { message: "Żądanie pochodzi z niedozwolonego źródła." },
    { status: 403 }
  );
}

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ message }, { status });
}
