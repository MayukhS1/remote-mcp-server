import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export function registerPrompts(server: McpServer) {
	server.registerPrompt(
		"is-prod-ready",
		{
			description: "Act as a release manager and systematically run core check tools to evaluate production readiness.",
			argsSchema: {
				repository_url: z.string().describe("URL of the repository to evaluate"),
				branch_name: z.string().optional().describe("Optional branch name to evaluate"),
			}
		},
		(args) => {
			const repoStr = args.branch_name 
				? `${args.repository_url} on branch ${args.branch_name}` 
				: args.repository_url;
				
			return {
				description: "Evaluate if code is ready for production",
				messages: [
					{
						role: "user",
						content: {
							type: "text",
							text: `Act as a Release Gatekeeper. Please evaluate if the code at ${repoStr} is ready for production. To do this, sequentially use the trigger_code_review and trigger_security_review tools. Once complete, summarize any critical blockers and give a final Go/No-Go decision.`
						}
					}
				]
			};
		}
	);

	server.registerPrompt(
		"build-new-mcp-skill",
		{
			description: "Self-Referential Builder prompt to allow an agent to construct a new MCP skill.",
			argsSchema: {
				desired_skill_functionality: z.string().describe("What the new skill should do"),
			}
		},
		(args) => {
			return {
				description: "Create a new MCP skill",
				messages: [
					{
						role: "user",
						content: {
							type: "text",
							text: `I want to add a new skill to this MCP server that does: ${args.desired_skill_functionality}. First, run list_available_skills to ensure it doesn't duplicate existing work. Then, call get_write_a_skill_guidelines. Provide the exact Python/TypeScript code required to implement this new tool according to our standards.`
						}
					}
				]
			};
		}
	);
}
