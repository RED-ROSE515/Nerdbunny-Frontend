import '../styles/globals.css';
import '../styles/globals.scss';

import React from 'react';

import type { Metadata, Viewport } from 'next';
import type { PropsWithChildren } from 'react';

import config from '_config';

import { CircularProgressBar } from '@/components/common/circular-progress-bar';
import Footer from '@/components/footer';
import { AppSidebar } from '@/components/home/app-sidebar';
import Navbar from '@/components/navbar';
import RootProvider from '@/components/providers/root';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: config.metadata.title,
  description: config.metadata.description,
  keywords: config.metadata.keywords,
  icons: '/favicon.ico',
  manifest: '/app.webmanifest'
};

export const viewport: Viewport = {
  themeColor: '#000'
};

type TRootLayout = PropsWithChildren;

export default function RootLayout({ children }: TRootLayout) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <RootProvider>
          <SidebarProvider>
            <SidebarInset>
              <div
                className={`max-w-screen relative grid min-h-[100dvh] grid-rows-[auto_1fr_auto] overflow-hidden`}
              >
                <Navbar />
                <div>
                  {children}
                  <CircularProgressBar className='md:text-md h-[60px] w-[60px] text-sm md:h-[100px] md:w-[100px]' />
                </div>
                <Toaster />
                <Footer />
              </div>
            </SidebarInset>
            <AppSidebar side='right' />
          </SidebarProvider>
        </RootProvider>
      </body>
    </html>
  );
}
