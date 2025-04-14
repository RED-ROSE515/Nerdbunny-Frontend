'use client';

import * as React from 'react';

import { MixerVerticalIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button className='h-8 w-8 rounded-full bg-background' variant='outline' size='icon'>
                <SunIcon className='h-5 w-5 rotate-0 scale-100 transition-transform duration-500 ease-in-out dark:-rotate-90 dark:scale-0' />
                <MoonIcon className='absolute h-5 w-5 rotate-90 scale-0 transition-transform duration-500 ease-in-out dark:rotate-0 dark:scale-100' />
                <span className='sr-only'>Switch Theme</span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side='bottom'>Switch Theme</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem className='hover:cursor-pointer' onClick={() => setTheme('light')}>
          <SunIcon className='mr-2 h-4 w-4 dark:text-foreground' />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem className='hover:cursor-pointer' onClick={() => setTheme('dark')}>
          <MoonIcon className='mr-2 h-4 w-4 dark:text-foreground' />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem className='hover:cursor-pointer' onClick={() => setTheme('system')}>
          <MixerVerticalIcon className='mr-2 h-4 w-4 dark:text-foreground' />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
