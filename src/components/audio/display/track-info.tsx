import React from 'react';

import { Button } from '@heroui/react';
import { GiHamburgerMenu } from 'react-icons/gi';

interface TrackInfoProps {
  title: string;
  speechType?: string;
  onPlaylistOpen: () => void;
  isMobile?: boolean;
}

export const TrackInfo: React.FC<TrackInfoProps> = ({
  title,
  speechType,
  onPlaylistOpen,
  isMobile
}) => {
  return (
    <div className='flex h-[65px] w-full flex-col gap-0'>
      <div className='flex w-full flex-row items-center justify-between'>
        <p className='text-small text-foreground/80'>
          {speechType?.split('Summary')[0] + ' Summary'}
        </p>
        {isMobile && (
          <Button
            isIconOnly
            className='absolute right-1 block data-[hover]:bg-foreground/10 md:hidden'
            radius='full'
            variant='light'
            onPress={onPlaylistOpen}
          >
            <GiHamburgerMenu size={20} />
          </Button>
        )}
      </div>
      <h1 className='mt-2 cursor-pointer truncate text-large font-medium' onClick={onPlaylistOpen}>
        {title}
      </h1>
    </div>
  );
};
