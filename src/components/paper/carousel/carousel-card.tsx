import React, { useTransition } from 'react';

import type { LucideIcon } from 'lucide-react';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface AppCardProps {
  Icon: LucideIcon;
  title: string;
  subActionTitle: string;
  isDisabled: boolean;
  description: string;
  onClick: () => void;
  subAction: () => void;
}

export const AppCard: React.FC<AppCardProps> = ({
  Icon,
  title,
  subActionTitle,
  isDisabled,
  description,
  onClick,
  subAction
}) => {
  const [pending, startTransition] = useTransition();
  return (
    <motion.div
      whileHover={!isDisabled ? { y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' } : {}}
      whileTap={!isDisabled ? { scale: 0.95 } : {}}
      className={`flex h-72 w-64 flex-col justify-between rounded-xl border bg-white p-6 shadow-md transition-colors duration-300 ${
        isDisabled
          ? 'cursor-not-allowed'
          : 'cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-950'
      } dark:bg-slate-900`}
      onClick={() => {
        if (!isDisabled) {
          startTransition(() => {
            onClick();
          });
        }
      }}
    >
      <div
        className={`${isDisabled && 'opacity-50'} flex h-full flex-col items-center text-center`}
      >
        {pending ? (
          <>
            <div className='flex h-full w-full flex-row items-center justify-center'>
              <Loader2 className='h-14 w-14 animate-spin text-indigo-600' />
            </div>
          </>
        ) : (
          <>
            <div className='mb-4 flex h-20 w-20 items-center justify-center rounded-full'>
              <Icon className='h-10 w-10 text-indigo-600' />
            </div>
            <h2 className='font-figtree mb-2 text-2xl font-bold'>{title}</h2>
            <p className='font-figtree text-md'>{description}</p>
          </>
        )}
      </div>
      {isDisabled ? (
        <div className='flex w-full flex-row items-center justify-center opacity-100'>
          <Button
            variant='outline'
            onClick={subAction}
            className='w-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:from-blue-600 hover:to-purple-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900'
          >
            {subActionTitle}
          </Button>
        </div>
      ) : (
        <div className='flex w-full flex-row items-center justify-center opacity-100'>
          <Button variant='outline' className='w-full rounded-lg px-4 py-3 font-semibold'>
            {'View Result'}
          </Button>
        </div>
      )}
    </motion.div>
  );
};
