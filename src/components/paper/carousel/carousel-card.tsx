import React, { useTransition } from 'react';

import type { LucideIcon } from 'lucide-react';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface AppCardProps {
  Icon: LucideIcon;
  title: string;
  isDisabled: boolean;
  description: string;
  onClick: () => void;
}

export const AppCard: React.FC<AppCardProps> = ({
  Icon,
  title,
  isDisabled,
  description,
  onClick
}) => {
  const [pending, startTransition] = useTransition();
  return (
    <motion.div
      whileHover={!isDisabled ? { y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' } : {}}
      whileTap={!isDisabled ? { scale: 0.95 } : {}}
      className={`flex h-72 w-64 flex-col justify-between rounded-xl border bg-white p-6 shadow-md transition-colors duration-300 ${
        isDisabled
          ? 'cursor-not-allowed opacity-50'
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
      <div className='flex h-full flex-col items-center text-center'>
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
    </motion.div>
  );
};
