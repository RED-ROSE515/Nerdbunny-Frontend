'use client';

import { useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Loader from '@/components/common/loader';
import UserAvatar from '@/components/common/user-avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { sleep } from '@/contexts/AnalyzeContext';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/lib/utils/api';

export default function GoogleCallback() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const { social_login } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!session) return;

    const fetchToken = async () => {
      setLoading(true);
      await social_login({ ...session?.user });
      setLoading(false);
      sleep(1500);
      router.push('/');
    };

    fetchToken();
  }, [session]);

  return (
    <div className='flex min-h-screen items-center justify-center p-4'>
      {loading ? (
        <div className='flex w-full flex-row items-center justify-center'>
          <Loader />
        </div>
      ) : (
        <Card className='rounded-lg shadow-xl'>
          <CardContent>
            <div className='mt-8 flex flex-col items-center justify-center gap-12 p-2 md:p-8'>
              <strong className='text-lg md:text-3xl'>Successfully signed in with Google.</strong>
              <div className='flex flex-row items-center justify-center gap-4'>
                <UserAvatar image={session?.user?.image || ''} name={session?.user?.name || ''} />
                <strong>{session?.user?.name}</strong>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
