import type React from 'react';

interface GradientHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export function GradientHeading({ children, className }: GradientHeadingProps) {
  return (
    <div className='relative'>
      <div className='absolute inset-0 bg-gradient-to-br from-[#7C3AED] to-[#2563EB] opacity-50 blur-3xl' />
      <h1 className={className}>{children}</h1>
    </div>
  );
}
