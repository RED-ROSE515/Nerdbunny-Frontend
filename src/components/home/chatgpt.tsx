'use client';

import React from 'react';

import { ChatInterface } from '../chatgpt/chat-interface';

export default function ChatGPT({ paper_id }: { paper_id?: string }) {
  return (
    <div>
      <ChatInterface paper_id={paper_id} />
    </div>
  );
}
