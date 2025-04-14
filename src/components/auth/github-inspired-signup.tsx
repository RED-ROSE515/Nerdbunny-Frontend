'use client';

import { useState } from 'react';

import { Check, Eye, EyeOff, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function GitHubInspiredSignup() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [receiveUpdates, setReceiveUpdates] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', { email, username, password, receiveUpdates });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return 'empty';
    if (password.length < 8) return 'weak';
    if (password.length < 12) return 'medium';
    return 'strong';
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-900 font-sans text-gray-100'>
      <div className='w-full max-w-md'>
        <form
          onSubmit={handleSubmit}
          className='space-y-6 rounded-lg bg-gray-800 px-8 pb-10 pt-8 shadow-2xl'
        >
          <h2 className='mb-6 text-center text-3xl font-semibold'>Create your account</h2>

          <div>
            <Label htmlFor='email' className='mb-1 block text-sm font-medium'>
              Email address
            </Label>
            <Input
              id='email'
              type='email'
              placeholder='you@example.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-2 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          <div>
            <Label htmlFor='username' className='mb-1 block text-sm font-medium'>
              Username
            </Label>
            <div className='relative'>
              <Input
                id='username'
                type='text'
                placeholder='octocat'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-2 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500'
                required
              />
              {username && (
                <span className='absolute right-3 top-1/2 -translate-y-1/2 transform'>
                  {username.length > 3 ? (
                    <Check className='h-5 w-5 text-green-500' />
                  ) : (
                    <X className='h-5 w-5 text-red-500' />
                  )}
                </span>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor='password' className='mb-1 block text-sm font-medium'>
              Password
            </Label>
            <div className='relative'>
              <Input
                id='password'
                type={showPassword ? 'text' : 'password'}
                placeholder='••••••••'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-2 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500'
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
            {password && (
              <div className='mt-2'>
                <div className='mb-1 text-sm font-medium'>
                  Password strength: {passwordStrength}
                </div>
                <div className='h-1 w-full overflow-hidden rounded-full bg-gray-700'>
                  <div
                    className={`h-full transition-all duration-300 ${
                      passwordStrength === 'weak'
                        ? 'w-1/3 bg-red-500'
                        : passwordStrength === 'medium'
                          ? 'w-2/3 bg-yellow-500'
                          : 'w-full bg-green-500'
                    }`}
                  ></div>
                </div>
              </div>
            )}
          </div>

          <div className='flex items-center space-x-2'>
            <Checkbox
              id='updates'
              checked={receiveUpdates}
              onCheckedChange={(checked) => setReceiveUpdates(checked as boolean)}
            />
            <Label htmlFor='updates' className='text-sm'>
              Receive occasional product updates and announcements
            </Label>
          </div>

          <Button
            type='submit'
            className='w-full rounded-md bg-green-600 py-2 font-semibold text-white transition-all duration-200 hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800'
          >
            Create account
          </Button>

          <p className='text-center text-sm text-gray-400'>
            By creating an account, you agree to our{' '}
            <a href='#' className='text-blue-400 hover:underline'>
              Terms of Service
            </a>{' '}
            and{' '}
            <a href='#' className='text-blue-400 hover:underline'>
              Privacy Policy
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  );
}
