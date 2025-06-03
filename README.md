# Zerodha MCP Trading Server

A Model Context Protocol (MCP) server that provides seamless integration with Zerodha Kite Connect API for trading operations. This server enables AI assistants and applications to interact with your Zerodha trading account through standardized MCP tools.

## 🚀 Features

- **Profile Management**: Retrieve user profile and account information
- **Order Placement**: Place buy/sell orders for stocks and ETFs
- **Market Operations**: Support for NSE, BSE, and Mutual Funds
- **Multiple Products**: CNC, NRML, MIS, BO, CO trading products
- **Real-time Integration**: Direct API calls to Zerodha Kite Connect
- **MCP Compatibility**: Works with any MCP-compatible AI assistant

## 📋 Prerequisites

- [Bun](https://bun.sh) runtime (v1.2.10 or later)
- Zerodha trading account
- Zerodha Kite Connect API credentials

## 🛠️ Installation

1. **Clone the repository**:
```bash
git clone <repository-url>
cd trademcp
```

2. **Install dependencies**:
```bash
bun install
```

3. **Set up environment variables**:
Create a `.env` file in the root directory with your Zerodha API credentials:
```env
API_KEY=your_zerodha_api_key
API_SECRET=your_zerodha_api_secret
ACCESS_TOKEN=your_zerodha_access_token
CLIENT_ID=your_client_id
```

## ⚙️ Configuration

### MCP Client Setup

Add the server to your MCP client configuration (e.g., `~/.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "trade-mcp-server": {
      "command": "bun",
      "args": ["run", "/path/to/trademcp/index.ts"],
      "env": {
        "API_SECRET": "your_api_secret",
        "API_KEY": "your_api_key",
        "CLIENT_ID": "your_client_id",
        "ACCESS_TOKEN": "your_access_token"
      }
    }
  }
}
```

### Zerodha API Setup

1. **Get API Credentials**:
   - Log in to [Zerodha Kite Connect](https://kite.trade)
   - Go to the API section and create a new app
   - Note down your `API_KEY` and `API_SECRET`

2. **Generate Access Token**:
   - Use the Zerodha login flow to generate an access token
   - This token is required for all API calls

## 🚀 Usage

### Running the Server

```bash
bun run index.ts
```

The server will start and listen for MCP requests via stdio transport.

### Available Tools

#### 1. `getProfileData`
Retrieves user profile information from Zerodha.

**Parameters**: None

**Response**:
- User name and client ID
- Email address
- Broker information
- Available exchanges (NSE, BSE, MF)
- Available products (CNC, NRML, MIS, BO, CO)

#### 2. `placeOrder`
Places a buy or sell order for a specified stock/ETF.

**Parameters**:
- `tradeSymbol` (string): Trading symbol (e.g., 'RELIANCE', 'TCS', 'GOLDBEES')
- `transactionType` (enum): 'BUY' or 'SELL'
- `quantity` (number): Number of shares to trade (positive integer)

**Response**:
- Order ID
- Order details confirmation
- Transaction status

#### 3. `add`
Simple addition tool for testing purposes.

**Parameters**:
- `a` (number): First number
- `b` (number): Second number

**Response**:
- Sum of the two numbers

## 📝 Example Usage

### Through MCP Client

```javascript
// Get user profile
await mcp.call("getProfileData");

// Buy 1 share of GOLDBEES
await mcp.call("placeOrder", {
  tradeSymbol: "GOLDBEES",
  transactionType: "BUY",
  quantity: 1
});

// Sell 10 shares of RELIANCE
await mcp.call("placeOrder", {
  tradeSymbol: "RELIANCE",
  transactionType: "SELL",
  quantity: 10
});
```

## 🏗️ Project Structure

```
trademcp/
├── index.ts          # Main MCP server implementation
├── trade.ts          # Zerodha API integration
├── package.json      # Project dependencies
├── tsconfig.json     # TypeScript configuration
├── README.md         # Project documentation
└── .env             # Environment variables (create this)
```

## 🔧 Development

### Dependencies

- **@modelcontextprotocol/sdk**: MCP server SDK
- **kiteconnect**: Official Zerodha Kite Connect library
- **zod**: Schema validation
- **dotenv**: Environment variable management

### Building

The project uses TypeScript and Bun. No build step required - run directly:

```bash
bun run index.ts
```

## ⚠️ Important Notes

1. **Security**: Never commit your API credentials to version control
2. **Rate Limits**: Zerodha API has rate limits - handle accordingly
3. **Market Hours**: Orders can only be placed during market hours
4. **Risk Management**: Always validate orders before execution
5. **Testing**: Test with small quantities first

## 🐛 Troubleshooting

### Common Issues

1. **Authentication Errors**: 
   - Verify your API credentials are correct
   - Ensure access token is valid and not expired

2. **Order Placement Failures**:
   - Check if markets are open
   - Verify sufficient balance/holdings
   - Confirm trading symbol format

3. **Connection Issues**:
   - Ensure internet connectivity
   - Check Zerodha API status

## 📄 License

This project is private and intended for personal use.

## 🤝 Contributing

This is a personal trading project. Please use responsibly and in accordance with trading regulations.

## ⚡ Built With

- [Bun](https://bun.sh) - Fast JavaScript runtime
- [MCP SDK](https://github.com/modelcontextprotocol/sdk) - Model Context Protocol
- [Zerodha Kite Connect](https://kite.trade/docs/connect/v3/) - Trading API

---

**Disclaimer**: This software is for educational and personal use only. Trading involves financial risk. Always consult with financial advisors and trade responsibly.
