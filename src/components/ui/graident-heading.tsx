import type React from 'react';

interface GradientHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export function GradientHeading({ children, className }: GradientHeadingProps) {
  return (
    <div className='relative'>
      <div className='absolute inset-0 bg-gradient-to-br from-[#2C3AED] to-[#2563EB] opacity-50 blur-3xl dark:from-[#8B5CF6] dark:to-[#3B82F6] dark:opacity-40' />
      <h1 className={className}>{children}</h1>
    </div>
  );
}
