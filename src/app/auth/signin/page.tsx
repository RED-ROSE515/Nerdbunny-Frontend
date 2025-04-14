'use client';

import React, { Suspense } from 'react';

import SignIn from '@/components/auth/signin';
import Loader from '@/components/common/loader';

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <SignIn />
    </Suspense>
  );
}
