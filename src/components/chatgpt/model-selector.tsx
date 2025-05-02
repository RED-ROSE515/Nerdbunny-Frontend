'use client';

import { ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export function ModelSelector() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='sm' className='gap-1'>
          GPT-4
          <ChevronDown className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem>GPT-4</DropdownMenuItem>
        <DropdownMenuItem>GPT-3.5</DropdownMenuItem>
        <DropdownMenuItem>Claude</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
