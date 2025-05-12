'use client';

import { useState } from 'react';

import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AppleInspiredSignin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', { email, password });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='flex items-center justify-center bg-gray-50 font-sans dark:bg-gray-900'>
      <div className='w-full max-w-md'>
        <form
          onSubmit={handleSubmit}
          className='rounded-2xl bg-white px-8 pb-10 pt-8 shadow-2xl dark:bg-gray-800'
        >
          <h2 className='mb-6 text-center text-3xl font-semibold text-gray-800 dark:text-gray-100'>
            Sign In
          </h2>

          <div className='space-y-4'>
            <div>
              <Label htmlFor='email' className='sr-only'>
                Email
              </Label>
              <Input
                id='email'
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 hover:shadow-md focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100'
                required
              />
            </div>
            <div className='relative'>
              <Label htmlFor='password' className='sr-only'>
                Password
              </Label>
              <Input
                id='password'
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 hover:shadow-md focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100'
                required
              />
              <button
                type='button'
                onClick={togglePasswordVisibility}
                className='absolute inset-y-0 right-0 flex items-center pr-3'
              >
                {showPassword ? (
                  <EyeOff className='h-5 w-5 text-gray-400 dark:text-gray-300' />
                ) : (
                  <Eye className='h-5 w-5 text-gray-400 dark:text-gray-300' />
                )}
              </button>
            </div>
          </div>
          <div className='mt-6 space-y-4'>
            <Button
              type='submit'
              className='w-full rounded-lg bg-blue-500 py-3 font-semibold text-white transition-all duration-200 hover:bg-blue-600 hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700'
            >
              Sign In
            </Button>
          </div>
          <p className='mt-4 text-center text-sm text-gray-600 dark:text-gray-300'>
            Don't have an account?{' '}
            <Link
              href='/auth/signup'
              className='font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300'
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
