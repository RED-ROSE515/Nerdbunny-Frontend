'use client';

import React from 'react';

import type { PropsWithChildren } from 'react';

import { SessionProvider } from 'next-auth/react';

import { AnalyzeProvider } from '@/contexts/AnalyzeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { OpenAIProvider } from '@/contexts/OpenAIContext';
import { PaginationProvider } from '@/contexts/PaginationContext';
import { ProgressProvider } from '@/contexts/ProgressContext';
import { SearchProvider } from '@/contexts/SearchContext';
import { SpeechProvider } from '@/contexts/SpeechContext';

import HeroUiProvider from './hero-ui';
import TanstackQueryProvider from './tanstack-query';
import ThemeProvider from './theme';

type TRootProvider = PropsWithChildren;

export default function RootProvider({ children }: TRootProvider) {
  return (
    <SessionProvider>
      <HeroUiProvider>
        <ThemeProvider>
          <ProgressProvider>
            <OpenAIProvider>
              <SpeechProvider>
                <AnalyzeProvider>
                  <PaginationProvider>
                    <AuthProvider>
                      <SearchProvider>
                        <TanstackQueryProvider>{children}</TanstackQueryProvider>
                      </SearchProvider>
                    </AuthProvider>
                  </PaginationProvider>
                </AnalyzeProvider>
              </SpeechProvider>
            </OpenAIProvider>
          </ProgressProvider>
        </ThemeProvider>
      </HeroUiProvider>
    </SessionProvider>
  );
}
