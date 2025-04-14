'use client';

import React, { Suspense } from 'react';

import SignUp from '@/components/auth/signup';
import Loader from '@/components/common/loader';

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <SignUp />
    </Suspense>
  );
}
