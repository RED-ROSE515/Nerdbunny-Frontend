'use client';

import { useTransition } from 'react';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { DotPattern } from '@/components/magicui/dot-pattern';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Hero() {
  const router = useRouter();
  const [isUploadPending, startUploadTransition] = useTransition();

  return (
    <div className='relative flex min-h-[calc(50vh)] items-center'>
      <div className='container relative z-10 mx-auto px-6'>
        <div className='mx-auto max-w-4xl text-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className='mb-6 text-3xl font-bold text-foreground md:text-4xl lg:text-7xl'>
              Unlock Insights from Research Papers Instantly
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='mx-auto mb-8 max-w-2xl text-xl text-muted-foreground'
          >
            Analyze, summarize, and explore research papers with ease. Upload a PDF or enter a URL
            to get started—designed for researchers, by researchers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className='flex w-full flex-col justify-center gap-4 sm:flex-row md:items-center'
          >
            <Button
              size='lg'
              className='rounded-full bg-primary px-8 text-primary-foreground hover:bg-primary/90'
              onClick={() =>
                startUploadTransition(() => {
                  router.push('/check');
                })
              }
            >
              {isUploadPending ? (
                <>
                  <Loader2 className='mr-2 h-5 w-5 animate-spin text-primary-foreground' />
                  <span className='text-primary-foreground'>Please wait</span>
                </>
              ) : (
                <>
                  <span className='text-lg font-semibold text-primary-foreground'>
                    Try for FREE!
                  </span>
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Animated robot */}
      {/* <div className='absolute bottom-0 right-0 hidden h-96 w-96 md:block'>
        <RoboAnimation />
      </div> */}
      <DotPattern
        glow={false}
        className={cn('[mask-image:radial-gradient(750px_circle_at_center,white,transparent)]')}
      />
    </div>
  );
}
