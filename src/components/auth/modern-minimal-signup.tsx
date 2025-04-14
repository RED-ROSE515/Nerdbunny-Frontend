'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ModernMinimalSignup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', { email, password });
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-900 text-gray-100'>
      <div className='w-full max-w-md space-y-8 p-8'>
        <div className='text-center'>
          <h2 className='text-4xl font-bold tracking-tight'>Create Account</h2>
          <p className='mt-2 text-sm text-gray-400'>Join the future of design</p>
        </div>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='space-y-2'>
            <Label htmlFor='email' className='text-sm font-medium'>
              Email
            </Label>
            <div className='relative'>
              <Input
                id='email'
                type='email'
                placeholder='you@example.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 placeholder-gray-500 transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-blue-500'
                required
              />
              <div className='absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 transition-opacity duration-300 group-focus-within:opacity-20' />
            </div>
          </div>
          <div className='space-y-2'>
            <Label htmlFor='password' className='text-sm font-medium'>
              Password
            </Label>
            <div className='relative'>
              <Input
                id='password'
                type='password'
                placeholder='••••••••'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 placeholder-gray-500 transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-blue-500'
                required
              />
              <div className='absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 transition-opacity duration-300 group-focus-within:opacity-20' />
            </div>
          </div>
          <div className='flex items-center'>
            <input type='checkbox' id='remember' className='hidden' />
            <label htmlFor='remember' className='flex cursor-pointer items-center text-sm'>
              <span className='mr-2 inline-block h-5 w-5 flex-shrink-0 rounded border border-gray-500'>
                <svg
                  className='pointer-events-none hidden h-4 w-4 fill-current text-blue-500'
                  viewBox='0 0 20 20'
                >
                  <path d='M0 11l2-2 5 5L18 3l2 2L7 18z' />
                </svg>
              </span>
              Remember me
            </label>
          </div>
          <Button
            type='submit'
            className='w-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200'
          >
            Sign Up
          </Button>
        </form>
        <p className='text-center text-sm text-gray-400'>
          Already have an account?{' '}
          <a href='#' className='text-blue-400 hover:underline'>
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
