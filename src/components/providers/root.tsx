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
    <HeroUiProvider>
      <ThemeProvider>
        <ProgressProvider>
          <AnalyzeProvider>
            <OpenAIProvider>
              <SpeechProvider>
                <PaginationProvider>
                  <AuthProvider>
                    <SearchProvider>
                      <SessionProvider>
                        <TanstackQueryProvider>{children}</TanstackQueryProvider>
                      </SessionProvider>
                    </SearchProvider>
                  </AuthProvider>
                </PaginationProvider>
              </SpeechProvider>
            </OpenAIProvider>
          </AnalyzeProvider>
        </ProgressProvider>
      </ThemeProvider>
    </HeroUiProvider>
  );
}
