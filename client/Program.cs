using Azure;
using Azure.AI.OpenAI;
using Azure.Identity;
using Microsoft.Extensions.AI;
using ModelContextProtocol.Client;

// Create an IChatClient using Azure OpenAI.
// Note: Replace these with your actual Azure OpenAI endpoint and API key
// Consider using environment variables or Azure Key Vault for production
string azureEndpoint = Environment.GetEnvironmentVariable("AZURE_OPENAI_ENDPOINT") ?? "https://your-resource.openai.azure.com/";
string azureApiKey = Environment.GetEnvironmentVariable("AZURE_OPENAI_API_KEY") ?? "your-api-key-here";
string deploymentName = Environment.GetEnvironmentVariable("AZURE_OPENAI_DEPLOYMENT_NAME") ?? "gpt-4o";

IChatClient client =
    new ChatClientBuilder(
        new AzureOpenAIClient(new Uri(azureEndpoint),
        new AzureKeyCredential(azureApiKey))
        .GetChatClient(deploymentName).AsIChatClient())
    .UseFunctionInvocation()
    .Build();

// Create the MCP client
// Configure it to start and connect to your MCP server.
string mcpServerProjectPath = Environment.GetEnvironmentVariable("MCP_SERVER_PROJECT_PATH") ?? "../server/SampleMcpServer1.csproj";

IMcpClient mcpClient = await McpClientFactory.CreateAsync(
    new StdioClientTransport(new()
    {
        Command = "dotnet run",
        Arguments = ["--project", mcpServerProjectPath],
        Name = "MCP Database Server",
    }));

// List all available tools from the MCP server.
Console.WriteLine("Available tools:");
IList<McpClientTool> tools = await mcpClient.ListToolsAsync();
foreach (McpClientTool tool in tools)
{
    Console.WriteLine($"{tool.Name} - {tool.Description}");
}
Console.WriteLine();

// Conversational loop that can utilize the tools via prompts.
List<ChatMessage> messages = [];
while (true)
{
    Console.Write("Prompt: ");
    var input = Console.ReadLine();
    if (string.IsNullOrEmpty(input) || input.ToLower() == "exit")
        break;
        
    messages.Add(new(ChatRole.User, input));
    List<ChatResponseUpdate> updates = [];
    await foreach (ChatResponseUpdate update in client
        .GetStreamingResponseAsync(messages, new() { Tools = [.. tools] }))
    {
        Console.Write(update);
        updates.Add(update);
    }
    Console.WriteLine();
    messages.AddMessages(updates);
}