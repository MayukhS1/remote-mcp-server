# Building a Remote MCP Server on Cloudflare (Without Auth)

This example allows you to deploy a remote MCP server that doesn't require authentication on Cloudflare Workers.

## Get started:

[![Deploy to Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/ai/tree/main/demos/remote-mcp-authless)

This will deploy your MCP server to a URL like: `remote-mcp-server-authless.<your-account>.workers.dev/mcp`

Alternatively, you can use the command line below to get the remote MCP Server created on your local machine:

```bash
npm create cloudflare@latest -- my-mcp-server --template=cloudflare/ai/demos/remote-mcp-authless
```

## Customizing your MCP Server

To add your own skills and tools to the MCP server, you will need to register them in `src/index.ts`.

### Adding a New Skill
1. Use a tool like [skills.sh](https://skills.sh/) to add an AI skill to your project.
2. The skill will be downloaded to the `.agents/skills/` directory as a Markdown file.
3. Import the skill's Markdown file at the top of `src/index.ts`. *(Note: This template's `wrangler.jsonc` is already configured to import `.md` files as Text).*
4. Register the skill inside the `init()` method of `src/index.ts` using `this.server.registerTool(...)`.

**Pro-tip for Tool Descriptions:** When registering the skill, write a highly descriptive paragraph in the `description` field. The AI relies entirely on this description to know when to trigger the tool. Include trigger keywords, synonyms, and specific use-cases!

**Example:**
```typescript
import myNewSkill from "../.agents/skills/my-new-skill/SKILL.md";

// Inside init()...
this.server.registerTool(
	"get_my_new_skill",
	{
		description: "Use this tool whenever you are asked to [insert trigger keywords]. It contains instructions for...",
		inputSchema: {}
	},
	async () => ({
		content: [{ type: "text", text: myNewSkill }],
	}),
);
```

## Connect to Cloudflare AI Playground

You can connect to your MCP server from the Cloudflare AI Playground, which is a remote MCP client:

1. Go to https://playground.ai.cloudflare.com/
2. Enter your deployed MCP server URL (`remote-mcp-server-authless.<your-account>.workers.dev/mcp`)
3. You can now use your MCP tools directly from the playground!

## Connect Claude Desktop to your MCP server

You can also connect to your remote MCP server from local MCP clients, by using the [mcp-remote proxy](https://www.npmjs.com/package/mcp-remote).

To connect to your MCP server from Claude Desktop, follow [Anthropic's Quickstart](https://modelcontextprotocol.io/quickstart/user) and within Claude Desktop go to Settings > Developer > Edit Config.

Update with this configuration:

```json
{
	"mcpServers": {
		"calculator": {
			"command": "npx",
			"args": [
				"mcp-remote",
				"http://localhost:8787/mcp" // or remote-mcp-server-authless.your-account.workers.dev/mcp
			]
		}
	}
}
```

Restart Claude and you should see the tools become available.

## Testing with MCP Inspector

To test your skills and tools quickly and debug their output, you can use the official MCP inspector web UI.

1. Ensure your local server is running in one terminal:
```bash
npx wrangler dev
```
2. Open a **new terminal window** and run the inspector pointing to your server:
```bash
npx @modelcontextprotocol/inspector npx -y mcp-remote http://localhost:8787/mcp
```
3. Open the `http://localhost:5173` URL (or whichever port it outputs) in your browser.
4. Navigate to the **Tools** tab on the left sidebar.
5. You will see your newly added skills listed as tools. Select one and click **Run Tool** to verify it successfully returns the correct output!
