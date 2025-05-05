'use client';

import type { MotionProps } from 'framer-motion';
import type * as React from 'react';

import { motion } from 'framer-motion';

interface CardGlowProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
}

export function CardGlow({ children, className, ...props }: CardGlowProps) {
  return (
    <motion.div
      className='group relative'
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      <div className='pointer-events-none absolute -inset-px rounded-[12px] transition duration-300 group-hover:opacity-100 dark:opacity-[0.1]'>
        <div className='absolute inset-0 rounded-[12px] bg-gradient-to-b from-slate-800/75 via-slate-800/5 to-transparent opacity-[0.4]' />
        <div className='absolute inset-[-2px] rounded-[12px] bg-gradient-to-b from-blue-500/5 via-transparent to-transparent blur-sm' />
      </div>
      {children}
    </motion.div>
  );
}
