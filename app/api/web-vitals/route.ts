import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const metric = await request.json();
		// TODO: forward this metric to your analytics service
		console.log("[Web Vitals]", metric);
		return NextResponse.json({ ok: true });
	} catch (error) {
		console.error("Error parsing web-vitals metric", error);
		return NextResponse.json({ ok: false }, { status: 400 });
	}
}
