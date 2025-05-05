import type React from 'react';

import { cn } from '@/lib/utils';

interface PlatformIconProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: string;
  name: string;
}

export function PlatformIcon({ icon, name, className, ...props }: PlatformIconProps) {
  return (
    <div
      className={cn(
        'flex h-12 w-12 items-center justify-center rounded-lg bg-black/30 transition-colors hover:bg-black/40',
        className
      )}
      {...props}
    >
      <img src={icon || '/placeholder.svg'} alt={`${name} icon`} className='h-8 w-8' />
    </div>
  );
}
