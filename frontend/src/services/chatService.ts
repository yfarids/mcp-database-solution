import axios from 'axios';
import { ChatResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const chatService = {
  async sendMessage(message: string): Promise<ChatResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/chat`, {
        message: message
      });
      
      return response.data;
    } catch (error) {
      console.error('Chat service error:', error);
      throw new Error('Failed to send message');
    }
  }
};
