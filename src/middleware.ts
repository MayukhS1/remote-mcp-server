const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 100;
const RATE_LIMIT_WINDOW_MS = 60000;

// KV keys are SHA-256 hex hashes of valid tokens; values are human labels.
async function isAuthorized(request: Request, env: Env): Promise<boolean> {
	// Access-Key exists because Claude connectors reserve the Authorization header for OAuth.
	const token =
		request.headers.get("authorization")?.match(/^Bearer (.+)$/)?.[1] ?? request.headers.get("access-key");
	if (!token) return false;
	const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(token));
	const hash = [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
	// ponytail: cacheTtl means a revoked token can keep working for up to ~60s.
	return (await env.AUTH_TOKENS.get(hash, { cacheTtl: 60 })) !== null;
}

export async function withMiddleware(
	request: Request,
	env: Env,
	handler: (req: Request) => Promise<Response> | Response
): Promise<Response> {
	const url = new URL(request.url);

	// 1. Force HTTPS (skip for localhost during development)
	if (url.protocol === "http:" && url.hostname !== "localhost" && url.hostname !== "127.0.0.1") {
		url.protocol = "https:";
		return Response.redirect(url.toString(), 301);
	}

	// 2. Bearer token auth (CORS preflights never carry Authorization)
	if (request.method !== "OPTIONS" && !(await isAuthorized(request, env))) {
		return new Response("Unauthorized", { status: 401, headers: { "WWW-Authenticate": "Bearer" } });
	}

	// 3. Simple Rate Limiting (per-isolate)
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

	// 4. Process the actual request
	const response = await handler(request);

	// 5. Add Security & Rate Limiting Headers
	const newResponse = new Response(response.body, response);
	
	// Add HSTS Header
	newResponse.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
	
	// Add Rate Limit Headers
	rateLimitHeaders.forEach((value, key) => {
		newResponse.headers.set(key, value);
	});

	return newResponse;
}
