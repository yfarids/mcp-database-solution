# MCP Database Chatbot

A React TypeScript chatbot application that interacts with the MCP (Model Context Protocol) Database API.

## Features

- Real-time chat interface
- Integration with MCP tools (Random Number Generator, Weather)
- Tool usage indicators
- Error handling
- Responsive design

## Setup Instructions

### 1. Start the MCP API Server
```bash
cd client
dotnet run
```
The API will run on `http://localhost:5000`

### 2. Start the React Frontend
```bash
cd frontend
npm start
```
The React app will run on `http://localhost:3000`

## Configuration

- API URL can be configured in `frontend/.env`
- Default API URL: `http://localhost:5000`

## Available Tools

1. **Random Number Generator** - Generate random numbers within a specified range
2. **Weather Information** - Get weather information for cities

## Usage Examples

- "Generate a random number between 1 and 100"
- "What's the weather like in Paris?"
- "Give me a random number"
- "Weather in New York"

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── ChatBot.tsx        # Main chat component
│   │   ├── MessageList.tsx    # Message list container
│   │   ├── Message.tsx        # Individual message component
│   │   └── MessageInput.tsx   # Message input component
│   ├── services/
│   │   └── chatService.ts     # API service
│   ├── types/
│   │   └── index.ts          # TypeScript interfaces
│   └── App.tsx               # Main app component
└── .env                      # Environment configuration
```
