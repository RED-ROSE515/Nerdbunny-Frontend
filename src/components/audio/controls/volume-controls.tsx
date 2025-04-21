import React, { useCallback, useState } from 'react';

import { Button, Slider } from '@heroui/react';
import { Volume1, Volume2, VolumeOff } from 'lucide-react';

interface VolumeControlsProps {
  onChange: (volume: number) => void;
  className?: string;
}

export const VolumeControls: React.FC<VolumeControlsProps> = ({ onChange, className = '' }) => {
  const [volume, setVolume] = useState(1);
  const [previousVolume, setPreviousVolume] = useState(1);

  const handleVolumeChange = useCallback(
    (value: number | number[]) => {
      const newVolume = Array.isArray(value) ? (value[0] ?? 0) : value;
      setVolume(newVolume);
      onChange(newVolume);
    },
    [onChange]
  );

  const toggleMute = useCallback(() => {
    if (volume > 0) {
      setPreviousVolume(volume);
      handleVolumeChange(0);
    } else {
      handleVolumeChange(previousVolume);
    }
  }, [volume, previousVolume, handleVolumeChange]);

  const VolumeIcon = volume === 0 ? VolumeOff : volume < 0.5 ? Volume1 : Volume2;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button
        isIconOnly
        className='data-[hover]:bg-foreground/10'
        radius='full'
        variant='light'
        onPress={toggleMute}
      >
        <VolumeIcon size={20} />
      </Button>
      <Slider
        aria-label='Volume'
        size='sm'
        maxValue={1}
        minValue={0}
        step={0.01}
        value={volume}
        onChange={handleVolumeChange}
        className='w-[100px]'
      />
    </div>
  );
};
