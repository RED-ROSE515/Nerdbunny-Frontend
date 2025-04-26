'use client';

import { useState } from 'react';

import { ChevronLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import api from '@/lib/utils/api';

import { useToast } from '../hooks/use-toast';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import Social from './social';

export default function SignUp() {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmail, setIsEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await api.post('/auth/signup/', {
        first_name: name,
        user_name: name,
        email,
        password
      });
      toast({ title: 'Sign Up', description: 'Successfully created an account.' });
      router.push('/auth/signin');
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className='flex min-h-screen items-center justify-center p-4 text-gray-100'>
      <div className='w-full max-w-md space-y-8'>
        <Card className='rounded-xl shadow-2xl'>
          <CardHeader>
            <div className='text-center'>
              <h2 className='text-4xl font-bold tracking-tight'>Create an Account</h2>
              <p className='mt-2 text-sm text-gray-400'>Sign up to start shopping</p>
            </div>
          </CardHeader>
          <CardContent>
            <div className={`flex-col justify-center gap-4 ${isEmail ? 'hidden' : 'flex'}`}>
              <Social />
              <div className='space-y-2'>
                <Label htmlFor='email' className='text-sm font-medium'>
                  Email
                </Label>
                <div className='group'>
                  <Input
                    id='email'
                    name='email'
                    type='email'
                    placeholder='you@example.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full rounded-lg border border-gray-200 bg-gray-200 px-4 py-2 placeholder-gray-100 transition-all duration-300 focus:border-transparent focus:bg-gradient-to-r focus:from-blue-500/20 focus:to-purple-600/20 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:placeholder-gray-500`}
                    required
                  />
                </div>
              </div>

              <Button
                type='submit'
                onClick={() => setIsEmail(true)}
                className='w-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900'
              >
                Create Account
              </Button>
            </div>
            <div className={`flex-col justify-center gap-4 ${isEmail ? 'flex' : 'hidden'}`}>
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='space-y-2'>
                  <button
                    onClick={() => setIsEmail(false)}
                    className='my-2 flex cursor-pointer flex-row items-center justify-start gap-1 self-start text-sm text-[#0A0A0A] opacity-50 transition ease-in-out hover:opacity-100 dark:text-white'
                  >
                    <ChevronLeft size={16} /> Back
                  </button>
                  <Label htmlFor='name' className='text-sm font-medium'>
                    Full Name
                  </Label>
                  <div className='group'>
                    <Input
                      id='name'
                      name='name'
                      type='text'
                      placeholder='John Doe'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full rounded-lg border border-gray-200 bg-gray-200 px-4 py-2 placeholder-gray-100 transition-all duration-300 focus:border-transparent focus:bg-gradient-to-r focus:from-blue-500/20 focus:to-purple-600/20 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:placeholder-gray-500`}
                      required
                    />
                  </div>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='email' className='text-sm font-medium'>
                    Email
                  </Label>
                  <div className='group'>
                    <Input
                      id='email'
                      name='email'
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
                      name='password'
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
                  {loading ? (
                    <>
                      <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                      Please wait
                    </>
                  ) : (
                    <span>Create Account</span>
                  )}
                </Button>
              </form>
            </div>
          </CardContent>
          <CardFooter>
            <div className='flex w-full justify-center'>
              <p className='text-center text-sm text-gray-400'>
                Already have an account?{' '}
                <Link href='/auth/signin' className='text-blue-400 hover:underline'>
                  Sign in
                </Link>
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
