'use client';

import { useRef } from 'react';

export function PlagiarismScoreGauge({ score }: { score: number }) {
  const gaugeRef = useRef<HTMLDivElement>(null);

  const rotation = (score / 100) * 180;
  const color =
    score >= 75 ? '#dc2626' : score >= 50 ? '#f97316' : score >= 25 ? '#eab308' : '#22c55e';

  return (
    <div className='relative w-full max-w-[200px] sm:max-w-[250px]'>
      <svg viewBox='0 0 120 120' className='w-full'>
        <defs>
          <linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='0%'>
            <stop offset='0%' stopColor='#22c55e' />
            <stop offset='50%' stopColor='#eab308' />
            <stop offset='100%' stopColor='#dc2626' />
          </linearGradient>
        </defs>

        <circle
          cx='60'
          cy='60'
          r='54'
          fill='none'
          stroke='#e5e7eb'
          strokeWidth='12'
          strokeDasharray='170 180'
          transform='rotate(-180 60 60)'
          className='transition-all duration-500'
        />

        <circle
          cx='60'
          cy='60'
          r='54'
          fill='none'
          stroke={color}
          strokeWidth='12'
          strokeDasharray={`${(score / 100) * 170} 180`}
          transform='rotate(-180 60 60)'
          className='transition-all duration-500'
        />
      </svg>

      <div
        ref={gaugeRef}
        className='absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center'
      >
        <span className='text-3xl font-bold sm:text-4xl' style={{ color }}>
          {score}%
        </span>
      </div>
    </div>
  );
}
