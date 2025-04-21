import React, { useCallback, useEffect, useRef } from 'react';

import { Progress } from '@heroui/react';
import { useWavesurfer } from '@wavesurfer/react';
import { useTheme } from 'next-themes';

interface WaveformProps {
  audioUrl: string;
  onPlayPause: (isPlaying: boolean) => void;
  onTimeUpdate: (time: number) => void;
  onDurationSet: (duration: number) => void;
  onLoadProgress: (progress: number) => void;
  height?: number;
  isMobile?: boolean;
}

export const Waveform: React.FC<WaveformProps> = ({
  audioUrl,
  onPlayPause,
  onTimeUpdate,
  onDurationSet,
  onLoadProgress,
  height = 50,
  isMobile = false
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();

  const { wavesurfer } = useWavesurfer({
    container: containerRef,
    waveColor: theme === 'dark' ? '#4F4A85' : '#A7A9AB',
    progressColor: theme === 'dark' ? '#FF0068' : '#FFAA68',
    barWidth: 3,
    height: isMobile ? 30 : height,
    url: audioUrl
  });

  useEffect(() => {
    if (!wavesurfer) return;

    const subscriptions = [
      wavesurfer.on('play', () => onPlayPause(true)),
      wavesurfer.on('pause', () => onPlayPause(false)),
      wavesurfer.on('loading', (val: number) => onLoadProgress(val)),
      wavesurfer.on('decode', (duration: number) => onDurationSet(duration)),
      wavesurfer.on('timeupdate', (currentTime: number) => onTimeUpdate(currentTime))
    ];

    return () => subscriptions.forEach((unsub) => unsub());
  }, [wavesurfer, onPlayPause, onTimeUpdate, onDurationSet, onLoadProgress]);

  return (
    <>
      <Progress
        aria-label='Loading...'
        classNames={{
          base: `w-full h-[50px] card rounded-md ${wavesurfer ? 'hidden' : ''}`,
          track: 'drop-shadow-md border border-default',
          indicator: 'bg-gradient-to-r from-[#4F4A85] to-[#1E1C32]',
          label: 'tracking-wider font-medium text-default-600',
          value: 'text-foreground/60'
        }}
        size='md'
        label='Loading...'
        value={0}
      />
      <div ref={containerRef} className={!wavesurfer ? 'hidden' : ''} />
    </>
  );
};
