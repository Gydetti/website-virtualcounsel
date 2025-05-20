import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Skip parsing if no payload to prevent JSON parse errors
  const contentLength = request.headers.get('content-length');
  if (!contentLength || Number.parseInt(contentLength, 10) === 0) {
    return NextResponse.json({ ok: true });
  }
  try {
    const metric = await request.json();
    // TODO: forward this metric to your analytics service
    console.log('[Web Vitals]', metric);
  } catch {
    // Ignore JSON parsing errors for web-vitals pings without body
  }
  return NextResponse.json({ ok: true });
}
