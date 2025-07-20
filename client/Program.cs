
using Azure;
using Azure.AI.OpenAI;
using Azure.Identity;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.AI;
using ModelContextProtocol.Client;

var builder = WebApplication.CreateBuilder(args);

// Add CORS support for the React frontend
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Enable CORS
app.UseCors();

// Setup MCP and OpenAI clients once at startup
string azureEndpoint = Environment.GetEnvironmentVariable("AZURE_OPENAI_ENDPOINT") ?? "";
string azureApiKey = Environment.GetEnvironmentVariable("AZURE_OPENAI_API_KEY") ?? "";
string deploymentName = Environment.GetEnvironmentVariable("AZURE_OPENAI_DEPLOYMENT_NAME") ?? "";
string mcpServerProjectPath = Environment.GetEnvironmentVariable("MCP_SERVER_PROJECT_PATH") ?? "";

IChatClient client =
    new ChatClientBuilder(
        new AzureOpenAIClient(new Uri(azureEndpoint),
        new AzureKeyCredential(azureApiKey))
        .GetChatClient(deploymentName).AsIChatClient())
    .UseFunctionInvocation()
    .Build();

IMcpClient mcpClient = await McpClientFactory.CreateAsync(
    new StdioClientTransport(new()
    {
        Command = "dotnet run",
        Arguments = ["--project", mcpServerProjectPath],
        Name = "MCP Database Server",
    }));
IList<McpClientTool> tools = await mcpClient.ListToolsAsync();

app.MapPost("/api/chat", async (ChatRequest req) =>
{
    var messages = new List<ChatMessage> { new(ChatRole.User, req.Message) };
    var updates = new List<ChatResponseUpdate>();
    await foreach (var update in client.GetStreamingResponseAsync(messages, new() { Tools = [..tools] }))
    {
        updates.Add(update);
    }
    return new ChatResponse(
        Response: string.Join("", updates.Select(u => u.ToString())),
        Success: true
    );
});

app.Run();

public record ChatRequest(string Message);
public record ChatResponse(string Response, bool Success = true, string? Error = null);