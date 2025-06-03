import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { getProfileData, placeOrder } from "./trade.js";

const server = new McpServer({
    name: "Demo MCP Server",
    version: "1.0.0",
})

server.tool("add",
    { a: z.number(), b: z.number() },
    async ({ a, b }) => ({
        content: [{ type: "text", text: `The sum of ${a} and ${b} is ${a + b}` }],
    })
);

server.tool("getProfileData",
    {},
    async () => {
        try {
            await getProfileData();
            return {
                content: [{ type: "text", text: "✅ Zerodha profile data retrieved successfully. Account details have been logged to console." }],
            };
        } catch (error) {
            return {
                content: [{ type: "text", text: `❌ Error retrieving Zerodha profile: ${error}. Please check your API credentials and access token.` }],
            };
        }
    }
);

server.tool("placeOrder",
    { 
        tradeSymbol: z.string().describe("Trading symbol for Indian stocks (e.g., 'RELIANCE', 'TCS', 'INFY')"),
        transactionType: z.enum(["BUY", "SELL"]).describe("Transaction type: BUY to purchase stocks or SELL to sell existing holdings"),
        quantity: z.number().positive().describe("Number of shares to trade (must be positive integer)")
    },
    async ({ tradeSymbol, transactionType, quantity }) => {
        try {
            await placeOrder(tradeSymbol, transactionType, quantity);
            return {
                content: [{ type: "text", text: `✅ Order placed successfully on Zerodha: ${transactionType} ${quantity} shares of ${tradeSymbol} at market price` }],
            };
        } catch (error) {
            return {
                content: [{ type: "text", text: `❌ Error placing order on Zerodha: ${error}. Please check your credentials and market hours.` }],
            };
        }
    }
);

const transport = new StdioServerTransport();
await server.connect(transport);