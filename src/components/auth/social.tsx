'use client';

import React, { useState } from 'react';

import { Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';

import { useToast } from '@/components/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function Social() {
  const { toast } = useToast();

  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingApple, setLoadingApple] = useState(false);
  const [loadingTwitter, setLoadingTwitter] = useState(false);
  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

  const handleSocialSignIn = async (provider: string) => {
    try {
      // Use direct URL navigation instead of the signIn function
      signIn(provider, {
        callbackUrl: DOMAIN + '/auth/callback/' + provider
      });
    } catch (error) {
      console.error(`${error}`);
      toast({
        title: 'Authentication Error',
        description: `Failed to sign in with ${provider}. Please try again.`,
        variant: 'destructive'
      });
    }
  };

  return (
    <div className='flex w-full flex-col justify-center space-y-4'>
      <div className='grid grid-cols-1 gap-2'>
        <Button
          variant='outline'
          className='w-full'
          onClick={() => {
            setLoadingTwitter(true);
            handleSocialSignIn('twitter');
          }}
        >
          {loadingTwitter && <Loader2 className='mr-2 animate-spin' size={18} />}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 24 24'
            aria-hidden='true'
            focusable='false'
          >
            <path d='M8 2H1l8.26 11.015L1.45 22H4.1l6.388-7.349L16 22h7l-8.608-11.478L21.8 2h-2.65l-5.986 6.886zm9 18L5 4h2l12 16z'></path>
          </svg>
          Continue with Twitter
        </Button>
        <Button
          variant='outline'
          className='w-full'
          onClick={() => {
            setLoadingGoogle(true);
            handleSocialSignIn('google');
          }}
        >
          {loadingGoogle && <Loader2 className='mr-2 animate-spin' size={18} />}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            className='mr-2 h-5 w-5'
            fill='#4285F4'
          >
            <path d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z' />
            <path
              d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
              fill='#34A853'
            />
            <path
              d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
              fill='#FBBC05'
            />
            <path
              d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
              fill='#EA4335'
            />
          </svg>
          Continue with Google
        </Button>
        <Button
          variant='outline'
          className='w-full'
          onClick={() => {
            setLoadingApple(true);
            handleSocialSignIn('apple');
          }}
        >
          {loadingApple && <Loader2 className='mr-2 animate-spin' size={18} />}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='200'
            height='200'
            viewBox='0 0 22.773 22.773'
            aria-hidden='true'
            className='fill-black dark:fill-white'
            focusable='false'
          >
            <path d='M15.769 0h.162c.13 1.606-.483 2.806-1.228 3.675-.731.863-1.732 1.7-3.351 1.573-.108-1.583.506-2.694 1.25-3.561C13.292.879 14.557.16 15.769 0M20.67 16.716v.045c-.455 1.378-1.104 2.559-1.896 3.655-.723.995-1.609 2.334-3.191 2.334-1.367 0-2.275-.879-3.676-.903-1.482-.024-2.297.735-3.652.926h-.462c-.995-.144-1.798-.932-2.383-1.642-1.725-2.098-3.058-4.808-3.306-8.276v-1.019c.105-2.482 1.311-4.5 2.914-5.478.846-.52 2.009-.963 3.304-.765.555.086 1.122.276 1.619.464.471.181 1.06.502 1.618.485.378-.011.754-.208 1.135-.347 1.116-.403 2.21-.865 3.652-.648 1.733.262 2.963 1.032 3.723 2.22-1.466.933-2.625 2.339-2.427 4.74.176 2.181 1.444 3.457 3.028 4.209'></path>
          </svg>
          Continue with Apple
        </Button>
      </div>

      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <Separator className='w-full' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-foreground'>Or</span>
        </div>
      </div>
    </div>
  );
}
