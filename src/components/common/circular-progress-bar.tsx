'use client';

import { useEffect, useState } from 'react';

import { Card } from '@heroui/react';

import { useAnalyze } from '@/contexts/AnalyzeContext';
import { useLoading } from '@/contexts/ProgressContext';

import { AnimatedCircularProgressBar } from '../magicui/animated-circular-progress-bar';

export function CircularProgressBar({ ...props }) {
  const { progress } = useLoading();
  const { isChecking } = useAnalyze();
  useEffect(() => {
    console.log('/////////////////////');
    console.log(isChecking, progress);
  }, [progress, isChecking]);
  return (
    isChecking && (
      <div className='fixed bottom-1/2 right-4 z-50'>
        <Card className='p-2 shadow-lg'>
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
