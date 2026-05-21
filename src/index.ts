import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { McpAgent } from "agents/mcp";
import { registerSkills } from "./skills";
import { registerPrompts } from "./prompts";
import { withMiddleware } from "./middleware";

// Define our MCP agent with tools
export class MyMCP extends McpAgent {
	server = new McpServer({
		name: "Agent Skills Server",
		version: "1.0.0",
	});

	async init() {
		registerSkills(this.server);
		registerPrompts(this.server);
	}
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext) {
		return withMiddleware(request, async (req) => {
			const url = new URL(req.url);
			if (url.pathname === "/mcp") {
				return MyMCP.serve("/mcp").fetch(req, env, ctx);
			}
			return new Response("Not found", { status: 404 });
		});
	},
};
