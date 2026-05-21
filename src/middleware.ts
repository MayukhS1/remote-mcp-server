const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 100;
const RATE_LIMIT_WINDOW_MS = 60000;

export async function withMiddleware(
	request: Request, 
	handler: (req: Request) => Promise<Response> | Response
): Promise<Response> {
	const url = new URL(request.url);

	// 1. Force HTTPS (skip for localhost during development)
	if (url.protocol === "http:" && url.hostname !== "localhost" && url.hostname !== "127.0.0.1") {
		url.protocol = "https:";
		return Response.redirect(url.toString(), 301);
	}

	// 2. Simple Rate Limiting (per-isolate)
	const ip = request.headers.get("cf-connecting-ip") || "unknown";
	const now = Date.now();
	let rl = rateLimitMap.get(ip);
	
	if (!rl || rl.resetTime < now) {
		rl = { count: 0, resetTime: now + RATE_LIMIT_WINDOW_MS };
	}
	
	rl.count++;
	rateLimitMap.set(ip, rl);

	const rateLimitHeaders = new Headers();
	rateLimitHeaders.set("X-RateLimit-Limit", RATE_LIMIT_MAX.toString());
	rateLimitHeaders.set("X-RateLimit-Remaining", Math.max(0, RATE_LIMIT_MAX - rl.count).toString());
	rateLimitHeaders.set("X-RateLimit-Reset", Math.ceil(rl.resetTime / 1000).toString());

	if (rl.count > RATE_LIMIT_MAX) {
		return new Response("Rate limit exceeded", { 
			status: 429, 
			headers: rateLimitHeaders 
		});
	}

	// 3. Process the actual request
	const response = await handler(request);

	// 4. Add Security & Rate Limiting Headers
	const newResponse = new Response(response.body, response);
	
	// Add HSTS Header
	newResponse.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
	
	// Add Rate Limit Headers
	rateLimitHeaders.forEach((value, key) => {
		newResponse.headers.set(key, value);
	});

	return newResponse;
}
