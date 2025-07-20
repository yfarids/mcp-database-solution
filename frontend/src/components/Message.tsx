import React from 'react';
import { ChatMessage } from '../types';
import { Bot, User, Wrench } from 'lucide-react';
import './Message.css';

interface MessageProps {
  message: ChatMessage;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`message ${message.isBot ? 'bot' : 'user'} ${message.isError ? 'error' : ''}`}>
      <div className="message-avatar">
        {message.isBot ? <Bot size={20} /> : <User size={20} />}
      </div>
      
      <div className="message-content">
        <div className="message-text">
          {message.text}
        </div>
        
        {message.toolName && message.toolName !== "No tool used" && (
          <div className="tool-info">
            <Wrench size={14} />
            <span className="tool-name">{message.toolName}</span>
            {message.toolDescription && (
              <span className="tool-description">- {message.toolDescription}</span>
            )}
          </div>
        )}
        
        <div className="message-time">
          {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
};

export default Message;
