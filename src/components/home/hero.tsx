'use client';

import { useTransition } from 'react';

import { motion } from 'framer-motion';
import { FileText, Loader2, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { FloatingPaper } from '@/components/home/floating-paper';
import { RoboAnimation } from '@/components/home/robo-animation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export default function Hero() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isUploadPending, startUploadTransition] = useTransition();
  const { isAuthenticated } = useAuth();
  return (
    <div className='relative flex min-h-[calc(100vh-76px)] items-center'>
      {/* Floating papers background */}
      {/* <div className='absolute inset-0 overflow-hidden'>
        <FloatingPaper count={6} />
      </div> */}

      <div className='container relative z-10 mx-auto px-6'>
        <div className='mx-auto max-w-5xl text-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className='mb-6 text-3xl font-bold text-foreground md:text-4xl lg:text-6xl'>
              Find inconsistencies in Research Papers Effortlessly with
              <span className='bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text font-bold text-transparent'>
                {' '}
                NERDBUNNY
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='mx-auto mb-8 max-w-2xl text-xl text-muted-foreground'
          >
            Uncover hidden flaws, discrepancies, and methodological issues with our AI-powered
            Decentralized Science (DeSci) platform, backed by blockchain.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className='flex w-full flex-col justify-center gap-4 sm:flex-row md:items-center'
          >
            <Button
              size='lg'
              className='bg-primary px-8 text-primary-foreground hover:bg-primary/90'
              onClick={() =>
                startUploadTransition(() => {
                  router.push('/check');
                })
              }
            >
              {isUploadPending ? (
                <>
                  <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                  Please wait
                </>
              ) : (
                <>
                  <FileText className='mr-2 h-5 w-5' />
                  Upload Paper
                </>
              )}
            </Button>
            {isAuthenticated ? (
              <Button
                size='lg'
                variant='outline'
                className='border-primary bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary'
                onClick={() =>
                  startTransition(() => {
                    router.push('/results/discrepancies');
                  })
                }
              >
                {isPending ? (
                  <>
                    <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                    Please wait
                  </>
                ) : (
                  <>
                    <Sparkles className='mr-2 h-5 w-5' />
                    My Uploaded Papers
                  </>
                )}
              </Button>
            ) : (
              <Button
                size='lg'
                variant='outline'
                className='border-primary bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary'
                onClick={() =>
                  startTransition(() => {
                    router.push('/samples');
                  })
                }
              >
                {isPending ? (
                  <>
                    <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                    Please wait
                  </>
                ) : (
                  <>
                    <Sparkles className='mr-2 h-5 w-5' />
                    See Examples
                  </>
                )}
              </Button>
            )}
          </motion.div>
        </div>
      </div>

      {/* Animated robot */}
      {/* <div className='absolute bottom-0 right-0 hidden h-96 w-96 md:block'>
        <RoboAnimation />
      </div> */}
    </div>
  );
}
