# Setup Guide

## Prerequisites

- .NET 8.0+ SDK
- Azure OpenAI service account
- Visual Studio 2022, VS Code, or Rider

## Step 1: Clone the Repository

```bash
git clone https://github.com/yfarids/mcp-database-solution.git
cd mcp-database-solution
```

## Step 2: Configure Environment Variables

### For the Client

1. Copy the environment template:
   ```bash
   cp client/.env.example client/.env
   ```

2. Edit `client/.env` with your Azure OpenAI credentials:
   ```bash
   AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
   AZURE_OPENAI_API_KEY=your-api-key-here
   AZURE_OPENAI_DEPLOYMENT_NAME=gpt-4o
   MCP_SERVER_PROJECT_PATH=../server/SampleMcpServer.csproj
   ```

### For the Server

Optionally set weather choices:
```bash
export WEATHER_CHOICES="sunny,cloudy,rainy,snowy,windy"
```

## Step 3: Build the Solution

```bash
dotnet build MCP-Database-Solution.sln
```

## Step 4: Run the Applications

### Option A: Run Server and Client Separately

1. **Start the MCP Server** (in one terminal):
   ```bash
   cd server
   dotnet run
   ```

2. **Start the MCP Client** (in another terminal):
   ```bash
   cd client
   dotnet run
   ```

### Option B: Use VS Code MCP Integration

1. Open the project in VS Code
2. Use the MCP extension to connect to the server
3. The configuration is already set up in `server/.vscode/mcp.json`

## Step 5: Test the Setup

Once both applications are running:

1. The client will display available tools from the server
2. You can ask questions like:
   - "What's the weather in Paris?"
   - "Generate a random number between 1 and 100"
   - "Tell me about the weather in Tokyo"

## Troubleshooting

### Common Issues

1. **Missing Azure OpenAI Credentials**
   - Ensure all environment variables are set correctly
   - Verify your Azure OpenAI endpoint and API key

2. **Server Connection Issues**
   - Make sure the server is running before starting the client
   - Check that the `MCP_SERVER_PROJECT_PATH` points to the correct location

3. **Build Errors**
   - Ensure you have .NET 8.0+ SDK installed
   - Run `dotnet restore` to restore NuGet packages

### Logs and Debugging

- Server logs go to stderr by default
- Client errors will be displayed in the console
- Use `dotnet run --verbosity diagnostic` for detailed output

## Next Steps

- Explore adding new tools to the server
- Customize the client interface
- Deploy to production environments
- Set up CI/CD pipelines
