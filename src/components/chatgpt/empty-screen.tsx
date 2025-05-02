'use client';

import type React from 'react';

import { MessageSquare } from 'lucide-react';

interface EmptyScreenProps {
  onExampleClick: (text: string) => void;
}

export function EmptyScreen({ onExampleClick }: EmptyScreenProps) {
  return (
    <div className='flex h-full flex-col items-center justify-center space-y-6 py-24'>
      <div className='rounded-full bg-muted p-6'>
        <MessageSquare className='h-10 w-10 text-muted-foreground' />
      </div>
      <h1 className='text-3xl font-bold'>What can I help with?</h1>
    </div>
  );
}
