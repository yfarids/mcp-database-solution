import React from 'react';
import ChatBot from './components/ChatBot';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>MCP Database Chatbot</h1>
        <p>Chat with AI using Model Context Protocol tools</p>
      </header>
      <main>
        <ChatBot />
      </main>
    </div>
  );
}

export default App;
