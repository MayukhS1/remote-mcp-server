import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { McpAgent } from "agents/mcp";
import { z } from "zod";

import frontendDesignSkill from "../.agents/skills/frontend-design/SKILL.md";
import webDesignGuidelinesSkill from "../.agents/skills/web-design-guidelines/SKILL.md";
import writeASkillSkill from "../.agents/skills/write-a-skill/SKILL.md";
import seoAuditSkill from "../.agents/skills/seo-audit/SKILL.md";
import grillMeSkill from "../.agents/skills/grill-me/SKILL.md";
import humanWriterSkill from "../.agents/skills/human-writer/SKILL.md";

// Define our MCP agent with tools
export class MyMCP extends McpAgent {
	server = new McpServer({
		name: "Agent Skills Server",
		version: "1.0.0",
	});

	async init() {
		// Frontend Design Skill tool
		this.server.registerTool(
			"get_frontend_design_guidelines",
			{
				description: "Use this tool whenever you are asked to design, style, or build any user interface, website, or frontend component (React, HTML/CSS). It contains critical guidelines for typography, color, and layout to ensure the UI looks premium, distinctive, and avoids generic AI aesthetics.",
				inputSchema: {}
			},
			async () => ({
				content: [{ type: "text", text: frontendDesignSkill }],
			}),
		);

		// Web Design Guidelines tool
		this.server.registerTool(
			"get_web_design_guidelines",
			{
				description: "Use this tool whenever you are asked to review, audit, or check a UI/website for best practices, UX, or Web Interface Guidelines compliance. It contains rules on accessibility and design standards.",
				inputSchema: {}
			},
			async () => ({
				content: [{ type: "text", text: webDesignGuidelinesSkill }],
			}),
		);

		// Write a Skill tool
		this.server.registerTool(
			"get_write_a_skill_guidelines",
			{
				description: "Use this tool whenever you are asked to create, write, or build a new agent skill. It contains guidelines on proper structure, progressive disclosure, and bundled resources.",
				inputSchema: {}
			},
			async () => ({
				content: [{ type: "text", text: writeASkillSkill }],
			}),
		);

		// SEO Audit tool
		this.server.registerTool(
			"get_seo_audit_guidelines",
			{
				description: "Use this tool whenever you are asked to audit, review, or diagnose SEO issues on a site. It contains guidelines for checking technical SEO, rankings, page speed, core web vitals, crawl errors, and indexing issues.",
				inputSchema: {}
			},
			async () => ({
				content: [{ type: "text", text: seoAuditSkill }],
			}),
		);

		// Grill Me tool
		this.server.registerTool(
			"trigger_grill_me",
			{
				description: "Use this tool whenever you are asked to stress-test a plan, get grilled on a design, or relentlessly interview the user about a plan until reaching shared understanding.",
				inputSchema: {}
			},
			async () => ({
				content: [{ type: "text", text: grillMeSkill }],
			}),
		);

		// Human Writer tool
		this.server.registerTool(
			"get_human_writer_guidelines",
			{
				description: "Use this tool whenever you are asked to write, edit, or review documentation, commit messages, code comments, or UI copy. It contains guidelines for writing in a natural, human tone and improving clarity.",
				inputSchema: {}
			},
			async () => ({
				content: [{ type: "text", text: humanWriterSkill }],
			}),
		);

		// Simple addition tool
		this.server.registerTool(
			"add",
			{ inputSchema: { a: z.number(), b: z.number() } },
			async ({ a, b }) => ({
				content: [{ type: "text", text: String(a + b) }],
			}),
		);

		// Calculator tool with multiple operations
		this.server.registerTool(
			"calculate",
			{
				inputSchema: {
					operation: z.enum(["add", "subtract", "multiply", "divide"]),
					a: z.number(),
					b: z.number(),
				},
			},
			async ({ operation, a, b }) => {
				let result: number;
				switch (operation) {
					case "add":
						result = a + b;
						break;
					case "subtract":
						result = a - b;
						break;
					case "multiply":
						result = a * b;
						break;
					case "divide":
						if (b === 0)
							return {
								content: [
									{
										type: "text",
										text: "Error: Cannot divide by zero",
									},
								],
							};
						result = a / b;
						break;
				}
				return { content: [{ type: "text", text: String(result) }] };
			},
		);
	}
}

export default {
	fetch(request: Request, env: Env, ctx: ExecutionContext) {
		const url = new URL(request.url);

		if (url.pathname === "/mcp") {
			return MyMCP.serve("/mcp").fetch(request, env, ctx);
		}

		return new Response("Not found", { status: 404 });
	},
};
