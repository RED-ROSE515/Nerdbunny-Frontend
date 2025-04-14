'use client';

import { useState } from 'react';

import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AppleInspiredSignup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPreviewMode, setIsPreviewMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', { email, password, confirmPassword });
  };

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='flex min-h-screen items-center justify-center font-sans'>
      <div className='flex w-full max-w-md flex-col items-center'>
        <h1 className='mb-8 text-center text-3xl font-bold text-foreground'>Create Your Account</h1>
        <form onSubmit={handleSubmit} className='rounded-2xl bg-card px-8 pb-10 pt-8 shadow-2xl'>
          {isPreviewMode ? (
            <div className='space-y-4'>
              <PreviewField label='Email' value={email} />
              <PreviewField label='Password' value='••••••••' />
              <PreviewField label='Confirm Password' value='••••••••' />
            </div>
          ) : (
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
                  className='w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 hover:shadow-md focus:border-transparent focus:ring-2 focus:ring-blue-500'
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
                  className='w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 hover:shadow-md focus:border-transparent focus:ring-2 focus:ring-blue-500'
                  required
                />
                <button
                  type='button'
                  onClick={togglePasswordVisibility}
                  className='absolute inset-y-0 right-0 flex items-center pr-3'
                >
                  {showPassword ? (
                    <EyeOff className='h-5 w-5 text-gray-400' />
                  ) : (
                    <Eye className='h-5 w-5 text-gray-400' />
                  )}
                </button>
              </div>
              <div>
                <Label htmlFor='confirm-password' className='sr-only'>
                  Confirm Password
                </Label>
                <Input
                  id='confirm-password'
                  type='password'
                  placeholder='Confirm Password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className='w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 hover:shadow-md focus:border-transparent focus:ring-2 focus:ring-blue-500'
                  required
                />
              </div>
            </div>
          )}
          <div className='mt-6 space-y-4'>
            <Button
              type='button'
              onClick={togglePreviewMode}
              className='w-full rounded-lg bg-gray-100 py-3 font-semibold text-gray-800 transition-all duration-200 hover:bg-gray-200 hover:shadow-md focus:ring-2 focus:ring-gray-300 focus:ring-offset-2'
            >
              {isPreviewMode ? 'Edit Information' : 'Preview Information'}
            </Button>
            <button
              type='submit'
              className='w-full rounded-lg bg-primary py-3 font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary/90 hover:shadow-md focus:ring-2 focus:ring-primary focus:ring-offset-2'
            >
              Create Account
            </button>
          </div>
          <p className='mt-4 text-center text-sm text-gray-600'>
            Already have an account?{' '}
            <Link href='/signin' className='font-medium text-blue-500 hover:text-blue-600'>
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

function PreviewField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <Label className='mb-1 block text-sm font-medium text-gray-700'>{label}</Label>
      <div className='rounded-lg bg-gray-100 px-4 py-3 text-gray-800'>{value}</div>
    </div>
  );
}
