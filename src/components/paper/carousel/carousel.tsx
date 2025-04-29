'use client';

import { useEffect, useRef, useState } from 'react';

import type React from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, LucideIcon } from 'lucide-react';

import { AppCard } from './carousel-card';

const noScrollbarCSS = `
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

interface CarouselProps {
  items: Array<{
    Icon: LucideIcon;
    title: string;
    isDisabled: boolean;
    description: string;
    action: () => void;
  }>;
}

export const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', updateScrollButtons);
      return () => carousel.removeEventListener('scroll', updateScrollButtons);
    }
  }, [carouselRef.current]); // Added carouselRef.current as a dependency

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollTo =
        direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;

      carouselRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <>
      <style>{noScrollbarCSS}</style>
      <div className='relative w-full max-w-5xl rounded-3xl border border-border/20 bg-gradient-to-b from-background/80 to-background/40 px-8 py-2 shadow-lg backdrop-blur-xl dark:shadow-2xl'>
        <motion.div
          ref={carouselRef}
          className='no-scrollbar flex space-x-6 overflow-x-auto py-4 scrollbar-hide'
          style={{ scrollSnapType: 'x mandatory', msOverflowStyle: 'none', scrollbarWidth: 'none' }}
        >
          {items.map((item, index) => (
            <motion.div key={index} className='flex-shrink-0' style={{ scrollSnapAlign: 'start' }}>
              <AppCard
                Icon={item.Icon}
                title={item.title}
                isDisabled={item.isDisabled}
                description={item.description}
                onClick={item.action}
              />
            </motion.div>
          ))}
        </motion.div>
        <AnimatePresence>
          {canScrollLeft && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => scroll('left')}
              className='absolute left-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white/80 p-2 shadow-lg backdrop-blur-md transition-colors hover:bg-white'
            >
              <ChevronLeft className='h-6 w-6 text-gray-800' />
            </motion.button>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {canScrollRight && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => scroll('right')}
              className='absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white/80 p-2 shadow-lg backdrop-blur-md transition-colors hover:bg-white'
            >
              <ChevronRight className='h-6 w-6 text-gray-800' />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
