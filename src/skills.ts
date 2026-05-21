import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import frontendDesignSkill from "../.agents/skills/frontend-design/SKILL.md";
import webDesignGuidelinesSkill from "../.agents/skills/web-design-guidelines/SKILL.md";
import writeASkillSkill from "../.agents/skills/write-a-skill/SKILL.md";
import seoAuditSkill from "../.agents/skills/seo-audit/SKILL.md";
import grillMeSkill from "../.agents/skills/grill-me/SKILL.md";
import humanWriterSkill from "../.agents/skills/human-writer/SKILL.md";
import securityReviewSkill from "../.agents/skills/security-review/SKILL.md";
import codeReviewSkill from "../.agents/skills/code-review-skill/SKILL.md";

export function registerSkills(server: McpServer) {
	// List Available Skills tool
	server.registerTool(
		"list_available_skills",
		{
			description: "Use this tool to list all available agent skills and their descriptions. Call this if you are unsure what capabilities the server provides or need a directory of tools.",
			inputSchema: {}
		},
		async () => {
			const tools = (server as any)._registeredTools || {};
			const skillsList = Object.entries(tools)
				.map(([name, tool]: [string, any]) => {
					return `- ${name}: ${tool.description || "No description provided."}`;
				})
				.join('\n');
			return {
				content: [{
					type: "text",
					text: `Available Skills and Tools:\n${skillsList}` 
				}],
			};
		}
	);

	// Frontend Design Skill tool
	server.registerTool(
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
	server.registerTool(
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
	server.registerTool(
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
	server.registerTool(
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
	server.registerTool(
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
	server.registerTool(
		"get_human_writer_guidelines",
		{
			description: "Use this tool whenever you are asked to write, edit, or review documentation, commit messages, code comments, or UI copy. It contains guidelines for writing in a natural, human tone and improving clarity.",
			inputSchema: {}
		},
		async () => ({
			content: [{ type: "text", text: humanWriterSkill }],
		}),
	);

	// Security Review tool
	server.registerTool(
		"trigger_security_review",
		{
			description: "Use this tool whenever you are asked to scan code for security vulnerabilities, find bugs, check for SQL injection, XSS, command injection, exposed API keys, hardcoded secrets, insecure dependencies, access control issues, or check if code is secure.",
			inputSchema: {}
		},
		async () => ({
			content: [{ type: "text", text: securityReviewSkill }],
		}),
	);

	// Code Review tool
	server.registerTool(
		"trigger_code_review",
		{
			description: "Use this tool whenever you are asked to review pull requests, conduct PR reviews, review code changes, establish review standards, or give constructive feedback on code quality and bugs across various languages.",
			inputSchema: {}
		},
		async () => ({
			content: [{ type: "text", text: codeReviewSkill }],
		}),
	);
}
