import React, { useState, useRef, useEffect } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { chatService } from '../services/chatService';
import { ChatMessage } from '../types';
import './ChatBot.css';

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: "Hello! I'm your MCP Database assistant. I can help you with random numbers and weather information. How can I assist you today?",
      isBot: true,
      timestamp: new Date(),
      toolName: null,
      toolDescription: null
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now(),
      text: messageText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await chatService.sendMessage(messageText);
      
      // Add bot response
      const botMessage: ChatMessage = {
        id: Date.now() + 1,
        text: response.response,
        isBot: true,
        timestamp: new Date(),
        toolName: response.toolName || null,
        toolDescription: response.toolDescription || null
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error('Chat error:', err);
      
      // Add error message
      const errorMessage: ChatMessage = {
        id: Date.now() + 1,
        text: "Sorry, I encountered an error. Please try again.",
        isBot: true,
        timestamp: new Date(),
        isError: true
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h2>MCP Assistant</h2>
        <span className="status-indicator">
          {isLoading ? 'Thinking...' : 'Ready'}
        </span>
      </div>
      
      <MessageList 
        messages={messages} 
        isLoading={isLoading}
        error={error}
      />
      
      <MessageInput 
        onSendMessage={handleSendMessage}
        disabled={isLoading}
      />
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatBot;
