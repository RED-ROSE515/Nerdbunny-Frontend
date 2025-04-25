import React, { useTransition } from 'react';

import { Button, Card, CardBody } from '@heroui/react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { FaArrowRight, FaPlus } from 'react-icons/fa';

import useDeviceCheck from '@/lib/hooks/user-device-check';

import { DataBaseSVG, DataStreamSVG, TrelloSVG } from '../common/svgs';

const ResearchSection = () => {
  const { isMobile } = useDeviceCheck();
  const { theme } = useTheme();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  return (
    <div className='flex flex-col justify-center gap-9'>
      <div className='flex flex-row items-center justify-between'>
        <div className='w-full text-center'>
          <span
            className={`text-lg text-slate-700 dark:text-[#9C9C9C] md:text-xl md:font-semibold`}
          >
            Why Choose NerdBunny?
          </span>
          <h1 className='text-lg font-bold md:text-4xl'>
            Ensuring Accuracy, Integrity, and Insight in Research
          </h1>
        </div>
      </div>
      <div
        className={`flex ${isMobile ? 'flex-wrap' : 'flex-row'} w-full items-center justify-center gap-10`}
      >
        <Card className='flex flex-col justify-between bg-wrapper p-4 md:flex-row'>
          <CardBody>
            <div className='flex flex-row justify-start'>
              <DataStreamSVG />
              <strong className='ml-2'>AI Accuracy</strong>
            </div>
            <span className={`text-slate-800 dark:text-[#AFAFAF]`}>
              Detects complex errors beyond grammar, including logical, methodological, and
              statistical issues.
            </span>
          </CardBody>

          <CardBody>
            <div className='flex flex-row justify-start'>
              <TrelloSVG />
              <strong className='ml-2'>Comprehensive Reports</strong>
            </div>
            <span className={`text-slate-800 dark:text-[#AFAFAF]`}>
              Detailed feedback with clear explanations.
            </span>
          </CardBody>

          <CardBody>
            <div className='flex flex-row justify-start'>
              <DataBaseSVG />
              <strong className='ml-2'>Improve Research Integrity</strong>
            </div>
            <span className={`text-slate-800 dark:text-[#AFAFAF]`}>
              Contribute to higher standards in scientific publishing.
            </span>
          </CardBody>
        </Card>
      </div>
      <div className='flex w-full flex-row items-center justify-center'>
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
            className={`flex flex-row items-center justify-center whitespace-pre-wrap text-center text-[16px] font-medium leading-none tracking-tight text-white`}
          >
            {'Start Your Free Trial'}
            <FaArrowRight className='ml-2' />
          </strong>
        </Button>
      </div>
    </div>
  );
};

export default ResearchSection;
