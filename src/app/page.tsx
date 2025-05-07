'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { ArrowUp } from 'lucide-react';
import { useTheme } from 'next-themes';

import Hero from '@/components/home/hero';
import NerdbunnyReason from '@/components/home/nerdbunny-reason';
import ResearchSection from '@/components/home/research-section';
import WorkFlow from '@/components/home/workflow';
import Navbar from '@/components/navbar';
import CheckSection from '@/components/paper/check-section';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Home() {
  const { resolvedTheme: theme } = useTheme();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [visibleSections, setVisibleSections] = useState(['hero']);

  // Handle scroll to show/hide back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => [...new Set([...prev, entry.target.id])]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-section]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className='h-full w-full bg-background'>
      <div className={cn('bg-grid-white/[0.02]')}>
        <div
          className='relative z-10'
          style={{
            background: `${theme === 'dark' ? 'linear-gradient(0deg, #020815 0%, #1E293B 100%)' : 'linear-gradient(0deg, #FFFFFF 0%, #F7F7F7 100%)'}`
          }}
        >
          <Navbar />
          <div id='hero' data-section>
            <Hero />
          </div>
        </div>
      </div>
      <div className={`flex w-full flex-row justify-center p-0 md:p-4 md:px-10`}>
        <div className='md:w-[1200px]'>
          <div id='check-section' data-section>
            <CheckSection />
          </div>
          {visibleSections.includes('content') && (
            <div className='flex flex-col gap-[96px]' id='content' data-section>
              <NerdbunnyReason />
              <WorkFlow />
              <ResearchSection />
            </div>
          )}
        </div>
      </div>

      {/* Back to Top Button */}
      <Button
        variant='secondary'
        size='icon'
        className={cn(
          'fixed bottom-8 right-8 z-50 rounded-full shadow-lg transition-opacity duration-200',
          showBackToTop ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={scrollToTop}
      >
        <ArrowUp className='h-5 w-5' />
      </Button>
    </main>
  );
}
