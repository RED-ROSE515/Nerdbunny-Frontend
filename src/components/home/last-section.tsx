import React from 'react';

import { Button } from '@heroui/react';
import { Sen } from 'next/font/google';
import { useRouter } from 'next/navigation';

import useDeviceCheck from '@/components/hooks/user-device-check';

import { FlowerSVG, LineSVG } from '../common/svgs';

export const sen = Sen({ subsets: ['latin'] });

const LastSection = () => {
  const { isMobile } = useDeviceCheck();
  const router = useRouter();
  return (
    <div
      className={`relative mb-4 flex flex-col justify-center gap-2 rounded-xl bg-[#2E3E4E] dark:bg-[#6365F1] md:gap-6`}
    >
      <div className='mt-4 flex flex-row justify-center'>
        <h1 className='max-w-[50%] text-center text-lg font-bold text-white md:text-4xl'>
          Make Research Better – One Error at a Time
        </h1>
      </div>
      {!isMobile && (
        <React.Fragment>
          <LineSVG className='absolute left-0 top-[66px] z-0 hidden dark:block' color={'black'} />
          <LineSVG className='absolute left-0 top-[66px] z-0 block dark:hidden' color={'white'} />
        </React.Fragment>
      )}
      {!isMobile && (
        <React.Fragment>
          <FlowerSVG className='absolute bottom-0 right-0 z-0 hidden dark:block' color={'black'} />
          <FlowerSVG className='absolute bottom-0 right-0 z-0 block dark:hidden' color={'white'} />
        </React.Fragment>
      )}
      <div className={`flex w-full flex-col items-center ${sen.className} text-[#BCBDFA]`}>
        <span className='text-center'>Try NerdBunny AI Discrepancies Detection for Free</span>
        <span className='text-center'>
          Enhance your research credibility and avoid costly mistakes.
        </span>
      </div>
      <div className='flex w-full flex-row justify-center'>
        <div className='mb-8 flex w-full flex-col items-center justify-center gap-1 p-4 px-8 md:w-1/3 md:flex-row md:gap-4 md:px-0'>
          <Button className={`w-full bg-white`} onPress={() => router.push('/check')}>
            <span className={`font-semibold text-black`}>{'Start Free Analysis'}</span>
          </Button>
          <Button className={`w-full bg-white`}>
            <span className={`font-semibold text-black`}>{'About Our Technology'}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LastSection;
