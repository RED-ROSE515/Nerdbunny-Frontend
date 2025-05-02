'use client';

import React, { createContext, useContext, useState } from 'react';

import axios from 'axios';

import { useToast } from '@/components/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { useLoading } from '@/contexts/ProgressContext';
import api from '@/lib/utils/api';

interface OpenAIContextType {
  postId: string;
  messages: any;
  setMessages: (messages: any) => void;
  setPostId: (postId: string) => void;
  resetState: () => void;
}

const OpenAIContext = createContext<OpenAIContextType>({
  postId: '',
  messages: [],
  setPostId: () => {},
  setMessages: () => {},
  resetState: () => {}
});

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const OpenAIProvider = ({ children }: { children: React.ReactNode }) => {
  const [postId, setPostId] = useState('');
  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
  const [messages, setMessages] = useState<Array<{ role: string; content: string; id: string }>>(
    []
  );
  const resetState = () => {
    setPostId('');
  };

  return (
    <OpenAIContext.Provider
      value={{
        postId,
        messages,
        setPostId,
        setMessages,
        resetState
      }}
    >
      {children}
    </OpenAIContext.Provider>
  );
};

export const useOpenAI = () => {
  const context = useContext(OpenAIContext);
  if (context === undefined) {
    throw new Error('useOpenAI must be used within an OpenAIProvider');
  }
  return context;
};
