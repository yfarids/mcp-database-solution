import React from 'react';
import Message from './Message';
import { ChatMessage } from '../types';
import './MessageList.css';

interface MessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading, error }) => {
  return (
    <div className="message-list">
      {messages.map(message => (
        <Message key={message.id} message={message} />
      ))}
      
      {isLoading && (
        <div className="loading-message">
          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span>AI is thinking...</span>
        </div>
      )}
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
    </div>
  );
};

export default MessageList;
