# MCP Database Solution

A complete Model Context Protocol (MCP) solution containing both server and client applications for database operations.

## 🏗️ Architecture

This monorepo contains two main components:

### 📡 MCP Server (`/server`)
- **Purpose**: Provides MCP tools and services
- **Technologies**: .NET 8.0, Model Context Protocol SDK
- **Features**:
  - Weather information tools
  - Random number generation
  - Extensible tool architecture
  - NuGet package distribution

### 💻 MCP Client (`/client`)
- **Purpose**: Consumes MCP services through Azure OpenAI
- **Technologies**: .NET 10.0, Azure OpenAI, Microsoft Extensions AI
- **Features**:
  - Azure OpenAI integration
  - Interactive chat interface
  - Automatic tool invocation
  - Environment-based configuration

## 🚀 Quick Start

### Prerequisites
- .NET 8.0+ SDK
- Azure OpenAI service account (for client)
- Visual Studio 2022 or VS Code

### Running the Server
```bash
cd server
dotnet run
```

### Running the Client
```bash
# Set environment variables first
export AZURE_OPENAI_ENDPOINT="https://your-resource.openai.azure.com/"
export AZURE_OPENAI_API_KEY="your-api-key"
export AZURE_OPENAI_DEPLOYMENT_NAME="gpt-4o"
export MCP_SERVER_PROJECT_PATH="../server/SampleMcpServer1.csproj"

cd client
dotnet run
```

## 📁 Project Structure

```
mcp-database-solution/
├── README.md
├── MCP-Database-Solution.sln          # Main solution file
├── server/                             # MCP Server Project
│   ├── Program.cs
│   ├── SampleMcpServer1.csproj
│   ├── Tools/
│   │   ├── WeatherTools.cs
│   │   └── RandomNumberTools.cs
│   ├── .mcp/
│   │   └── server.json
│   └── .vscode/
│       └── mcp.json
├── client/                             # MCP Client Project
│   ├── Program.cs
│   ├── MCPHostApp.csproj
│   └── .env.example
└── docs/                               # Documentation
    └── setup.md
```

## 🔧 Configuration

### Server Configuration
The server can be configured through:
- Environment variables (e.g., `WEATHER_CHOICES`)
- VS Code MCP settings (`.vscode/mcp.json`)
- MCP server manifest (`.mcp/server.json`)

### Client Configuration
Create a `.env` file in the client directory with:
```bash
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_API_KEY=your-api-key-here
AZURE_OPENAI_DEPLOYMENT_NAME=gpt-4o
MCP_SERVER_PROJECT_PATH=../server/SampleMcpServer1.csproj
```

## 🛠️ Development

### Building the Solution
```bash
dotnet build MCP-Database-Solution.sln
```

### Running Tests
```bash
dotnet test
```

### Publishing the Server as NuGet Package
```bash
cd server
dotnet pack
```

## 📖 Documentation

- [Server Documentation](./server/README.md)
- [Client Documentation](./client/README.md)
- [Setup Guide](./docs/setup.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Related Repositories

- [mcpserver-database](https://github.com/yfarids/mcpserver-database) - Standalone server
- [mcpclient-database](https://github.com/yfarids/mcpclient-database) - Standalone client
