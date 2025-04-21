import React from 'react';

import { Button, Card, Drawer, DrawerBody, DrawerContent, DrawerHeader } from '@heroui/react';
import { ImCross } from 'react-icons/im';

import { Voice, VoiceSelector } from './voice-selector';

interface Speech {
  id: string;
  post_id: string;
  post_title: string;
  speech_type: string;
  audio_url: string;
}

interface PlaylistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  voices: Voice[];
  selectedVoice: string;
  onVoiceChange: (voice: string) => void;
  speeches: Speech[];
  currentSpeechId?: string;
  onSpeechSelect: (speech: Speech) => void;
}

export const PlaylistDrawer: React.FC<PlaylistDrawerProps> = ({
  isOpen,
  onClose,
  voices,
  selectedVoice,
  onVoiceChange,
  speeches,
  currentSpeechId,
  onSpeechSelect
}) => {
  return (
    <Drawer backdrop='blur' isOpen={isOpen} onOpenChange={onClose} size='lg'>
      <DrawerContent>
        <DrawerHeader className='flex flex-row items-center justify-between border-b px-6 py-4'>
          <h4 className='text-large font-medium'>Playlist</h4>
          <Button
            isIconOnly
            className='data-[hover]:bg-foreground/10'
            radius='full'
            variant='light'
            onPress={onClose}
          >
            <ImCross size={16} />
          </Button>
        </DrawerHeader>
        <DrawerBody className='px-6'>
          <div className='mt-6'>
            <VoiceSelector
              voices={voices}
              selectedVoice={selectedVoice}
              onVoiceChange={onVoiceChange}
            />
          </div>
          <div className='mt-8 flex flex-col gap-2'>
            {speeches.map((speech) => (
              <Card
                key={speech.id}
                isPressable
                className={`w-full p-4 ${
                  speech.id === currentSpeechId ? 'bg-primary/10' : 'hover:bg-default-100'
                }`}
                onPress={() => onSpeechSelect(speech)}
              >
                <div className='flex flex-col gap-1'>
                  <p className='text-small text-foreground/80'>
                    {speech.speech_type.split('Summary')[0] + ' Summary'}
                  </p>
                  <h5 className='text-medium font-medium'>{speech.post_title}</h5>
                </div>
              </Card>
            ))}
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
