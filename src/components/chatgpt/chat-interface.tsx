'use client';

import { useEffect, useState } from 'react';

import type React from 'react';

import { Mic, MicOff, Paperclip, Send } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useOpenAI } from '@/contexts/OpenAIContext';
import { cn } from '@/lib/utils';
import api from '@/lib/utils/api';

import { ChatMessage } from './chat-message';
import { EmptyScreen } from './empty-screen';

interface IResponseObject {
  role: string;
  content: string;
}

export const startConversation = async (
  prompt: any,
  messages: any,
  paper_id: any,
  fetchOptions = {}
) => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const response = await fetch(`${API_BASE_URL}/papers/openai/${paper_id}/start_conversation/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prompt, messages }),
    credentials: 'include',
    ...fetchOptions
  });

  if (!response || !response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.body?.getReader();
};

export function ChatInterface({ paper_id }: { paper_id?: string }) {
  const [isListening, setIsListening] = useState(false);
  const [input, setInput] = useState('');
  const { messages, setMessages } = useOpenAI();
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Add user message
    const userMessage = {
      role: 'user',
      content: input
    };

    setMessages((prev: any) => [...prev, userMessage]);
    setIsLoading(true);

    // Create a new message for the AI response
    setMessages((prev: any) => [...prev, { role: 'assistant', content: '' }]);

    try {
      const reader = await startConversation(input, messages, paper_id);
      const decoder = new TextDecoder();
      let accumulatedContent = '';

      while (true) {
        const { done, value }: any = await reader?.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        accumulatedContent += chunk;
        // Update the latest assistant message with accumulated content
        setMessages((prevMessages: any) => {
          const updatedMessages = [...prevMessages];
          const lastMessage = updatedMessages[updatedMessages.length - 1];
          if (lastMessage && lastMessage.role === 'assistant') {
            lastMessage.content = accumulatedContent;
          }
          return updatedMessages;
        });
      }

      setInput('');
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to send message:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-1 flex-col'>
      <div className='flex-1 overflow-auto p-4'>
        {messages.length === 0 ? (
          <EmptyScreen onExampleClick={(text) => setInput(text)} />
        ) : (
          <div className='mx-auto max-w-3xl space-y-6'>
            {messages.map(
              (message: any) =>
                message.content && <ChatMessage key={message.id} message={message} />
            )}
            {isLoading && (
              <div className='flex items-center gap-4 p-4'>
                <div className='h-8 w-8 animate-pulse rounded-full bg-muted'></div>
                <div className='space-y-2'>
                  <div className='h-4 w-24 animate-pulse rounded bg-muted'></div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <Card className='mx-auto w-full max-w-3xl rounded-b-none rounded-t-lg border-t shadow-lg'>
        <form onSubmit={handleSubmit} className='flex items-center gap-2 p-4'>
          <Button type='button' size='icon' variant='ghost' className='shrink-0'>
            <Paperclip className='h-5 w-5' />
            <span className='sr-only'>Attach file</span>
          </Button>

          <div className='relative flex-1'>
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder='Chat with the results'
              className='pr-10'
              disabled={isLoading}
            />
          </div>

          <Button
            type='button'
            size='icon'
            variant='ghost'
            className={cn('shrink-0', isListening && 'text-red-500')}
            onClick={toggleListening}
          >
            {isListening ? <MicOff className='h-5 w-5' /> : <Mic className='h-5 w-5' />}
            <span className='sr-only'>{isListening ? 'Stop recording' : 'Start recording'}</span>
          </Button>

          <Button
            type='submit'
            size='icon'
            className='shrink-0'
            disabled={!input.trim() || isLoading}
          >
            <Send className='h-5 w-5' />
            <span className='sr-only'>Send message</span>
          </Button>
        </form>
      </Card>
    </div>
  );
}
