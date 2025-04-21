import React from 'react';

interface TimelineProps {
  currentTime: string;
  duration: string;
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({ currentTime, duration, className = '' }) => {
  return (
    <div className={`flex justify-between ${className}`}>
      <p className='text-small'>{currentTime}</p>
      <p className='text-small text-foreground/50'>{duration}</p>
    </div>
  );
};
