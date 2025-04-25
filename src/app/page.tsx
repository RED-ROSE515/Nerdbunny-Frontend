'use client';

import React from 'react';

import AudioPlayer from '@/components/audio/audio-player';
import Hero from '@/components/home/hero';
import { PaperGlobe } from '@/components/home/hero-globe';
import LastSection from '@/components/home/last-section';
import NerdbunnyReason from '@/components/home/nerdbunny-reason';
import ResearchSection from '@/components/home/research-section';
import { SparklesCore } from '@/components/home/sparkles';
import WorkFlow from '@/components/home/workflow';
import CheckSection from '@/components/paper/check-section';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <main className='h-full w-full bg-background'>
      <div
        className={cn(
          `[mask-image:radial-gradient(1500px_circle_at_center,white,transparent)]`,
          'bg-grid-white/[0.02]'
        )}
      >
        <div className='absolute inset-0 z-0 hidden h-full w-full md:block'>
          <SparklesCore
            id='tsparticlesfullpage'
            background='transparent'
            minSize={1.5}
            maxSize={2.5}
            particleDensity={100}
            className='h-full w-full'
          />
        </div>

        <div className='relative z-10'>
          <Hero />
          <div className='flex flex-row items-center justify-center'>
            <PaperGlobe />
          </div>
        </div>
      </div>
      <div className={`flex w-full flex-row justify-center p-0 md:p-4 md:px-10`}>
        <div className='md:w-[1200px]'>
          <CheckSection />
          <div className={`mt-4 flex h-[80vh] w-full flex-row justify-center md:mt-16`}>
            <AudioPlayer id={null} autoplay={false} />
          </div>
          <div className='flex flex-col gap-[96px]'>
            <NerdbunnyReason />
            <WorkFlow />
            <ResearchSection />
            <LastSection />
          </div>
        </div>
      </div>
    </main>
  );
}
