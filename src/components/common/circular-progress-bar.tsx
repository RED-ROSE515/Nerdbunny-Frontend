'use client';

import { useEffect, useState } from 'react';

import { Card } from '@heroui/react';

import { useAnalyze } from '@/contexts/AnalyzeContext';
import { useLoading } from '@/contexts/ProgressContext';

import { AnimatedCircularProgressBar } from '../magicui/animated-circular-progress-bar';

export function CircularProgressBar({ ...props }) {
  const [value, setValue] = useState(0);
  const { progress } = useLoading();
  const { isChecking } = useAnalyze();
  useEffect(() => {
    const handleIncrement = (prev: number) => {
      if (prev === 100) {
        return 0;
      }
      return prev + 10;
    };
    setValue(handleIncrement);
    const interval = setInterval(() => setValue(handleIncrement), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    isChecking && (
      <div className='fixed bottom-1/2 right-3 z-50'>
        <Card className='p-1'>
          <AnimatedCircularProgressBar
            {...props}
            max={100}
            min={0}
            value={progress}
            label={progress === 100 ? `Done` : `${parseFloat(progress.toString()).toFixed(1)}%`}
            gaugePrimaryColor='rgb(79 70 229)'
            gaugeSecondaryColor='rgba(0, 0, 0, 0.1)'
          />
        </Card>
      </div>
    )
  );
}
