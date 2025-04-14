// components/withAuth.ts

import React from 'react';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    // Check for session
    if (typeof window !== 'undefined') {
      const { data: session, status } = useSession();
      const loading = status === 'loading';
      const router = useRouter();

      if (loading) {
        return React.createElement('div', null, 'Loading...');
      }

      if (!session) {
        router.replace('/signin');
        return null;
      }

      return React.createElement(WrappedComponent, props);
    }
    // During SSR
    return null;
  };
};

export default withAuth;
