'use client';

import { Suspense, useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const errorParam = searchParams.get('error');
    console.log('Auth error details:', errorParam);
    setError(errorParam || 'Unknown error');
  }, [searchParams]);

  return (
    <Card className='w-full max-w-md shadow-lg'>
      <CardHeader>
        <CardTitle className='text-center text-red-500'>Authentication Error</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <p className='text-center'>There was a problem authenticating your account.</p>
          <div className='rounded-md bg-gray-100 p-4 dark:bg-gray-800'>
            <p className='break-all font-mono text-sm'>{error}</p>
          </div>
          <p className='text-center text-sm text-gray-500'>
            Please check your credentials and try again. If the problem persists, contact support.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AuthError() {
  return (
    <div className='flex min-h-screen items-center justify-center p-4'>
      <Suspense
        fallback={
          <Card className='w-full max-w-md shadow-lg'>
            <CardContent className='p-4'>
              <p className='text-center'>Loading...</p>
            </CardContent>
          </Card>
        }
      >
        <AuthErrorContent />
      </Suspense>
    </div>
  );
}
