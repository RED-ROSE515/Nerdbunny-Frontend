import React, { useTransition } from 'react';

import { Button } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { FaArrowRight } from 'react-icons/fa6';

import { RightArrow } from '../common/svgs';

const NerdbunnyReason = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div className='mt-24 flex flex-col gap-[48px]'>
      <h1 className='my-4 text-center text-lg font-bold md:text-4xl'>
        Why You Need NerdBunny Ai Discrepancies Detection
      </h1>
      <div className='flex flex-col justify-center gap-[24px]'>
        <div className='flex flex-col gap-[12px]'>
          <div className='flex flex-row items-stretch justify-center gap-2'>
            <div className='card flex h-auto w-1/2 flex-1 flex-col rounded-lg border-1 bg-transparent p-4'>
              <strong>Tired of Rejections Due to Minor Errors?</strong>
              <span className='opacity-[.6]'>
                Save time and avoid the embarrassment of re-submissions
              </span>
            </div>
            <div className='card flex h-auto w-1/2 flex-1 flex-col rounded-lg border-1 bg-transparent p-4'>
              <strong>Worried About Overlooked Methodology Flaws?</strong>
              <span className='opacity-[.6]'>
                Detect complex logical and methodological issues with AI precision.
              </span>
            </div>
          </div>
          <div className='flex flex-row items-stretch justify-center gap-2'>
            <div className='card flex h-auto w-1/2 flex-1 flex-col rounded-lg border-1 bg-transparent p-4'>
              <strong>Struggling to Meet Journal’s Rigor Standards?</strong>
              <span className='opacity-[.6]'>
                Get detailed reports on statistical and technical depth.
              </span>
            </div>
            <div className='card flex h-auto w-1/2 flex-1 flex-col rounded-lg border-1 bg-transparent p-4'>
              <strong>Want to Validate Research Credibility?</strong>
              <span className='opacity-[.6]'>
                Ensure studies are methodologically sound and data is accurate.
              </span>
            </div>
          </div>
          <div className='card flex flex-row items-center justify-between rounded-lg border-1 bg-transparent p-4'>
            <div className='flex flex-col'>
              <strong>Frustrated by Poorly Conducted Research?</strong>
              <span className='opacity-[.6]'>
                Discover hidden flaws and inconsistencies in published papers.
              </span>
            </div>
          </div>
          <div className='flex flex-row justify-center'>
            <Button
              isLoading={isPending}
              className={`h-[46px] bg-primary shadow-2xl`}
              radius='full'
              onPress={() =>
                startTransition(() => {
                  router.push('/check');
                })
              }
            >
              <strong
                className={`flex flex-row items-center justify-center whitespace-pre-wrap text-center text-[16px] font-medium leading-none tracking-tight text-primary-foreground`}
              >
                {"Try it Now - It's Free"}
                <FaArrowRight className='ml-2 text-primary-foreground' />
              </strong>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NerdbunnyReason;
