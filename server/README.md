# MCP Server

This directory contains the Model Context Protocol (MCP) server implementation.

## Features

- **Weather Tools**: Get weather information for cities
- **Random Number Generation**: Generate random numbers within specified ranges
- **Extensible Architecture**: Easy to add new tools
- **NuGet Package Support**: Can be distributed as a NuGet tool package

## Tools Available

### Weather Tools
- `get_city_weather(city: string)`: Returns weather information for a specified city
- Configurable weather options via `WEATHER_CHOICES` environment variable

### Random Number Tools
- `get_random_number(min: int, max: int)`: Generates random numbers between min and max

## Configuration

### Environment Variables
- `WEATHER_CHOICES`: Comma-separated list of weather descriptions (default: "balmy,rainy,stormy")

### VS Code Integration
The server includes VS Code MCP configuration in `.vscode/mcp.json` for easy development and testing.

## Running the Server

```bash
cd server
dotnet run
```

## Building as NuGet Package

```bash
cd server
dotnet pack
```

The package will be created in `bin/Release/` directory.

## Adding New Tools

1. Create a new class in the `Tools/` directory
2. Decorate methods with `[McpServerTool]` attribute
3. Add descriptions using `[Description]` attributes
4. Register the tool class in `Program.cs`

Example:
```csharp
public class DatabaseTools
{
    [McpServerTool]
    [Description("Executes a database query")]
    public string ExecuteQuery([Description("SQL query to execute")] string query)
    {
        // Implementation here
        return "Query result";
    }
}
```

Then in `Program.cs`:
```csharp
builder.Services
    .AddMcpServer()
    .WithStdioServerTransport()
    .WithTools<RandomNumberTools>()
    .WithTools<WeatherTools>()
    .WithTools<DatabaseTools>(); // Add your new tool
```
