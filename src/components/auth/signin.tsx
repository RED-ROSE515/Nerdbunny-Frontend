'use client';

import { useState } from 'react';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import Social from './social';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', { email, password });
  };

  return (
    <div className='flex min-h-screen items-center justify-center p-4 text-gray-100'>
      <div className='w-full max-w-md space-y-8'>
        <Card className='rounded-xl shadow-2xl'>
          <CardHeader>
            <div className='text-center'>
              <h2 className='text-4xl font-bold tracking-tight'>Sign in to Nerdbunny</h2>
              <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>Let's start Nerdbunny</p>
            </div>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col justify-center gap-4'>
              <Social />
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='space-y-2'>
                  <Label htmlFor='email' className='text-sm font-medium'>
                    Email
                  </Label>
                  <div className='group'>
                    <Input
                      id='email'
                      type='email'
                      placeholder='you@example.com'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full rounded-lg border border-gray-200 bg-gray-200 px-4 py-2 placeholder-gray-100 transition-all duration-300 focus:border-transparent focus:bg-gradient-to-r focus:from-blue-500/20 focus:to-purple-600/20 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:placeholder-gray-500`}
                      required
                    />
                  </div>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='password' className='text-sm font-medium'>
                    Password
                  </Label>
                  <div className='group'>
                    <Input
                      id='password'
                      type='password'
                      placeholder='••••••••'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full rounded-lg border border-gray-200 bg-gray-200 px-4 py-2 placeholder-gray-100 transition-all duration-300 focus:border-transparent focus:bg-gradient-to-r focus:from-blue-500/20 focus:to-purple-600/20 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:placeholder-gray-500`}
                      required
                    />
                  </div>
                </div>
                <Button
                  type='submit'
                  className='w-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900'
                >
                  Sign In
                </Button>
              </form>
            </div>
          </CardContent>
          <CardFooter>
            <div className='flex w-full justify-center'>
              <p className='text-center text-sm text-gray-400'>
                Create a new account?{' '}
                <Link href='/auth/signup' className='text-blue-400 hover:underline'>
                  Sign up
                </Link>
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
