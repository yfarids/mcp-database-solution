# MCP Client

This directory contains the MCP client application that integrates with Azure OpenAI.

## Features

- **Azure OpenAI Integration**: Uses Azure OpenAI for natural language processing
- **MCP Tool Invocation**: Automatically calls MCP server tools based on conversation context
- **Interactive Chat**: Provides a command-line chat interface
- **Environment Configuration**: Secure credential management

## Prerequisites

- Azure OpenAI service account
- MCP server running (either locally or remotely)

## Configuration

Create a `.env` file with your configuration:

```bash
# Azure OpenAI Configuration
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_API_KEY=your-api-key-here
AZURE_OPENAI_DEPLOYMENT_NAME=gpt-4o

# MCP Server Configuration
MCP_SERVER_PROJECT_PATH=../server/SampleMcpServer.csproj
```

## Running the Client

```bash
cd client
dotnet run
```

## Usage Examples

Once running, you can interact with the client:

```
Prompt: What's the weather like in London?
The weather in London is rainy.

Prompt: Generate a random number between 1 and 50
Here's a random number between 1 and 50: 23

Prompt: exit
[Application closes]
```

## How It Works

1. **Initialization**: The client connects to the specified MCP server
2. **Tool Discovery**: Lists all available tools from the MCP server
3. **Chat Loop**: 
   - Accepts user input
   - Sends to Azure OpenAI with available tools
   - Azure OpenAI decides which tools to call based on context
   - Tools are executed via the MCP server
   - Results are incorporated into the response

## Customization

### Adding New AI Models

You can modify the client to use different Azure OpenAI models by changing the deployment name:

```csharp
string deploymentName = "gpt-4-turbo"; // or your preferred model
```

### Connecting to Different MCP Servers

Update the `MCP_SERVER_PROJECT_PATH` environment variable or modify the connection code:

```csharp
IMcpClient mcpClient = await McpClientFactory.CreateAsync(
    new StdioClientTransport(new()
    {
        Command = "your-mcp-server-command",
        Arguments = ["--arg1", "value1"],
        Name = "Your MCP Server",
    }));
```

### Custom Chat Interface

The current implementation uses a simple console interface. You can extend this to:
- Web interface using ASP.NET Core
- Desktop application using WPF/WinUI
- Mobile app using .NET MAUI

## Security Considerations

- Never commit `.env` files to version control
- Use Azure Key Vault for production deployments
- Implement proper authentication for production use
- Validate and sanitize all user inputs
