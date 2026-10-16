import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import frontendDesignSkill from "../.agents/skills/frontend-design/SKILL.md";
import webDesignGuidelinesSkill from "../.agents/skills/web-design-guidelines/SKILL.md";
import writeASkillSkill from "../.agents/skills/write-a-skill/SKILL.md";
import writingForAgentsSkill from "../.agents/skills/writing-for-agents/SKILL.md";
import writingForAgentsMechanics from "../.agents/skills/writing-for-agents/SKILL-MECHANICS.md";
import seoAuditSkill from "../.agents/skills/seo-audit/SKILL.md";
import grillMeSkill from "../.agents/skills/grill-me/SKILL.md";
import humanWriterSkill from "../.agents/skills/human-writer/SKILL.md";
import securityReviewSkill from "../.agents/skills/security-review/SKILL.md";
import codeReviewSkill from "../.agents/skills/code-review-skill/SKILL.md";
import vercelReactBestPractice from ".././.agents/skills/vercel-react-best-practices/SKILL.md";
import sbBrandscript from "../.agents/skills/storybrand-brandscript/SKILL.md";
import sbBrandscriptTemplate from "../.agents/skills/storybrand-brandscript/references/brandscript-template.md";
import sbBrandscriptModules from "../.agents/skills/storybrand-brandscript/references/modules.md";
import sbBrandscriptRules from "../.agents/skills/storybrand-brandscript/references/rules.md";
import sbReview from "../.agents/skills/storybrand-review/SKILL.md";
import sbReviewRubric from "../.agents/skills/storybrand-review/references/review-rubric.md";
import sbPage from "../.agents/skills/storybrand-page/SKILL.md";
import sbPageSections from "../.agents/skills/storybrand-page/references/page-sections.md";
import sbPageChecklist from "../.agents/skills/storybrand-page/references/mode-checklist.md";

const storybrandFiles: [string, string][] = [
	["storybrand-brandscript/SKILL.md", sbBrandscript],
	["storybrand-brandscript/references/brandscript-template.md", sbBrandscriptTemplate],
	["storybrand-brandscript/references/modules.md", sbBrandscriptModules],
	["storybrand-brandscript/references/rules.md", sbBrandscriptRules],
	["storybrand-review/SKILL.md", sbReview],
	["storybrand-review/references/review-rubric.md", sbReviewRubric],
	["storybrand-page/SKILL.md", sbPage],
	["storybrand-page/references/page-sections.md", sbPageSections],
	["storybrand-page/references/mode-checklist.md", sbPageChecklist],
];

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
		"frontend_design",
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
		"web_design",
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
		"write_a_skill",
		{
			description: "Use this tool whenever you are asked to create, write, or build a new agent skill. It contains guidelines on proper structure, progressive disclosure, and bundled resources.",
			inputSchema: {}
		},
		async () => ({
			content: [{ type: "text", text: writeASkillSkill }],
		}),
	);

	// Writing for Agents tool
	server.registerTool(
		"writing_for_agents",
		{
			description: "Use this tool whenever you are writing or editing any document an agent consumes: a skill (SKILL.md), AGENTS.md, CLAUDE.md, or agent rules. It covers context pointers, progressive disclosure, completion criteria, leading words, and pruning.",
			inputSchema: {}
		},
		async () => ({
			content: [
				{ type: "text", text: writingForAgentsSkill },
				{ type: "text", text: `# SKILL-MECHANICS.md\n\n${writingForAgentsMechanics}` },
			],
		}),
	);

	// SEO Audit tool
	server.registerTool(
		"seo_audit",
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
		"grill_me",
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
		"human_writer",
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
		"security_review",
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
		"code_review",
		{
			description: "Use this tool whenever you are asked to review pull requests, conduct PR reviews, review code changes, establish review standards, or give constructive feedback on code quality and bugs across various languages.",
			inputSchema: {}
		},
		async () => ({
			content: [{ type: "text", text: codeReviewSkill }],
		}),
	);

	// Vercel React Best Practice Tool
	server.registerTool(
		"vercel_react_best_practice",
		{
			description: "React and Next.js performance optimization guidelines from Vercel Engineering. This skill should be used when writing, reviewing, or refactoring React/Next.js code to ensure optimal performance patterns. Triggers on tasks involving React components, Next.js pages, data fetching, bundle optimization, or performance improvements.",
			inputSchema: {}
		},
		async () => ({
			content: [{ type: "text", text: vercelReactBestPractice }]
		})
	)

	// StoryBrand tool (brandscript + review + page skills bundled)
	server.registerTool(
		"storybrand",
		{
			description: "Use this tool whenever you are asked to clarify a brand message, build a StoryBrand SB7 BrandScript or one-liner, audit website/brand copy for StoryBrand clarity (grunt test, hero-vs-guide), or review/rewrite a single page (homepage, landing, pricing, about) using StoryBrand. Contains three sub-skills: storybrand-brandscript (interview + build), storybrand-review (audit only), storybrand-page (one-page review or rewrite), plus their reference files.",
			inputSchema: {}
		},
		async () => ({
			content: storybrandFiles.map(([path, text]) => ({ type: "text" as const, text: `# ${path}\n\n${text}` })),
		}),
	);
}
