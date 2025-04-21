import React from 'react';

import { Button } from '@heroui/react';

import {
  NextIcon,
  PauseCircleIcon,
  PlayCircleIcon,
  PreviousIcon,
  RepeatOneIcon,
  ShuffleIcon
} from '@/components/common/svgs';

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  disablePrevious?: boolean;
  disableNext?: boolean;
  showExtraControls?: boolean;
}

export const PlayerControls: React.FC<PlayerControlsProps> = ({
  isPlaying,
  onPlayPause,
  onPrevious,
  onNext,
  disablePrevious = false,
  disableNext = false,
  showExtraControls = false
}) => {
  return (
    <div className='flex w-full items-center justify-center'>
      {showExtraControls && (
        <Button
          isIconOnly
          isDisabled
          className='hidden data-[hover]:bg-foreground/10 md:flex'
          radius='full'
          variant='light'
        >
          <RepeatOneIcon className='text-foreground/80' />
        </Button>
      )}
      <Button
        isIconOnly
        isDisabled={disablePrevious}
        className='data-[hover]:bg-foreground/10'
        radius='full'
        variant='light'
        onPress={onPrevious}
      >
        <PreviousIcon />
      </Button>
      <Button
        onPress={onPlayPause}
        isIconOnly
        className='h-auto w-auto data-[hover]:bg-foreground/10'
        radius='full'
        variant='light'
      >
        {isPlaying ? <PauseCircleIcon size={54} /> : <PlayCircleIcon size={54} />}
      </Button>
      <Button
        isIconOnly
        isDisabled={disableNext}
        onPress={onNext}
        className='data-[hover]:bg-foreground/10'
        radius='full'
        variant='light'
      >
        <NextIcon />
      </Button>
      {showExtraControls && (
        <Button
          isIconOnly
          isDisabled
          className='hidden data-[hover]:bg-foreground/10 md:flex'
          radius='full'
          variant='light'
        >
          <ShuffleIcon className='text-foreground/80' />
        </Button>
      )}
    </div>
  );
};
