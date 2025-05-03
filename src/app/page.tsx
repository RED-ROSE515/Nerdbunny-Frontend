'use client';

import React from 'react';

import { useTheme } from 'next-themes';

import Hero from '@/components/home/hero';
import NerdbunnyReason from '@/components/home/nerdbunny-reason';
import ResearchSection from '@/components/home/research-section';
import WorkFlow from '@/components/home/workflow';
import Navbar from '@/components/navbar';
import { cn } from '@/lib/utils';

import CheckPageApp from './check/page';

export default function Home() {
  const { resolvedTheme: theme } = useTheme();

  return (
    <main className='h-full w-full bg-background'>
      <div
        className={cn(
          // `[mask-image:radial-gradient(1500px_circle_at_center,white,transparent)]`,
          'bg-grid-white/[0.02]'
        )}
      >
        {/* <div className='absolute inset-0 z-0 hidden h-full w-full md:block'>
          <SparklesCore
            id='tsparticlesfullpage'
            background='transparent'
            minSize={1.5}
            maxSize={2.5}
            particleDensity={100}
            className='h-full w-full'
          />
        </div> */}

        <div
          className='relative z-10'
          style={{
            background: `${theme === 'dark' ? 'linear-gradient(0deg, #020815 0%, #1E293B 100%)' : 'linear-gradient(0deg, #FFFFFF 0%, #F7F7F7 100%)'}`
          }}
        >
          <Navbar />
          <Hero />
        </div>
      </div>
      <div className={`flex w-full flex-row justify-center p-0 md:p-4 md:px-10`}>
        <div className='md:w-[1200px]'>
          {/* <CheckSection /> */}
          <CheckPageApp />
          {/* <div className={`mt-4 flex h-[80vh] w-full flex-row justify-center md:mt-16`}>
            <AudioPlayer id={null} autoplay={false} />
          </div> */}
          <div className='flex flex-col gap-[96px]'>
            <NerdbunnyReason />
            <WorkFlow />
            <ResearchSection />
          </div>
        </div>
      </div>
    </main>
  );
}
