import React, { useTransition } from 'react';

import { Button, Card, CardBody, CardHeader } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { FaPlus } from 'react-icons/fa';

import useDeviceCheck from '@/components/hooks/user-device-check';

import { CloudAPISVG, CloudNatSVG, TransferSVG } from '../common/svgs';

const WorkFlow = () => {
  const { isMobile } = useDeviceCheck();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <div className='flex flex-col justify-center gap-9'>
      <div className='flex flex-row items-center justify-between'>
        <div className='w-full text-center'>
          <span
            className={`text-lg text-slate-700 dark:text-[#9C9C9C] md:text-xl md:font-semibold`}
          >
            How It Works
          </span>
          <h1 className='text-lg font-bold md:text-4xl'>
            How NerdBunny AI Discrepancies Detection Works
          </h1>
        </div>
      </div>
      <div
        className={`flex ${isMobile ? 'flex-wrap' : 'flex-row'} w-full items-center justify-center gap-3`}
      >
        <Card className='bg-wrapper'>
          <CardHeader>
            <TransferSVG className='hidden text-white dark:block' color={'#EBECED'} />
            <TransferSVG className='block text-white dark:hidden' color={'#252629'} />
          </CardHeader>
          <CardBody>
            <strong>Choose a Paper</strong>
            <span className={`text-slate-800 dark:text-[#AFAFAF]`}>
              Select a paper from our database or upload your own.
            </span>
          </CardBody>
        </Card>
        <Card className='bg-wrapper'>
          <CardHeader>
            <CloudNatSVG className='hidden text-white dark:block' color={'#EBECED'} />
            <CloudNatSVG className='block text-white dark:hidden' color={'#252629'} />
          </CardHeader>
          <CardBody>
            <strong>AI Analyzes for Errors</strong>
            <span className={`text-slate-800 dark:text-[#AFAFAF]`}>
              Checks math, methodology, logic, data integrity, and technical issues.
            </span>
          </CardBody>
        </Card>
        <Card className='bg-wrapper'>
          <CardHeader>
            <CloudAPISVG className='hidden text-white dark:block' color={'#EBECED'} />
            <CloudAPISVG className='block text-white dark:hidden' color={'#252629'} />
          </CardHeader>
          <CardBody>
            <strong>Receive Detailed Report</strong>
            <span className={`text-slate-800 dark:text-[#AFAFAF]`}>
              Comprehensive feedback with explanations and suggestions.
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
            className={`flex flex-row items-center justify-center whitespace-pre-wrap text-center text-[16px] font-medium leading-none tracking-tight text-white dark:text-white`}
          >
            {'Start Free Analysis'}
            <FaPlus className='ml-2' />
          </strong>
        </Button>
      </div>
    </div>
  );
};

export default WorkFlow;
