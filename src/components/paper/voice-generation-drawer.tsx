import React, { useState } from 'react';

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Select,
  SelectItem
} from '@heroui/react';

import api from '@/lib/utils/api';

import { useToast } from '../hooks/use-toast';
import SpeechPlayer from '../speech/speech-player';
import ErrorContent from './error-content';
import { SummaryType, voices } from './summary-wrapper';

interface VoiceGenerationDrawerProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClose: () => void;
  currentSummary?: SummaryType;
  setSpeechUrl: (url: string) => void;
  setSpeechId: (id: string) => void;
  setSpeechTitle: (title: string) => void;
  setShowSpeech: (show: boolean) => void;
  isAuthenticated: boolean;
  showSignInModal: (message: string) => void;
  paperId: string;
}

const VoiceGenerationDrawer = ({
  isOpen,
  onOpenChange,
  onClose,
  currentSummary,
  setSpeechUrl,
  setSpeechId,
  setSpeechTitle,
  setShowSpeech,
  isAuthenticated,
  showSignInModal,
  paperId
}: VoiceGenerationDrawerProps) => {
  const [voice, setVoice] = useState('alloy');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const generateSpeech = async () => {
    try {
      setLoading(true);
      const response = await api.post(`papers/speeches/generate_speech/`, {
        paper_id: paperId,
        speech_type: currentSummary?.key,
        voice_type: voice
      });
      setLoading(false);
      onClose();
      toast({
        title: 'Speech Generation',
        description: (
          <div className='flex flex-col'>
            <span>Speech generated successfully! </span>
            <span className='text-md font-bold text-pink-500'>
              Cost : ${response.data.cost.toFixed(6)}
            </span>
          </div>
        )
      });
      setSpeechUrl(response.data.audio_url);
      setSpeechId(response.data.id);
      setSpeechTitle(currentSummary?.title || '');
      setShowSpeech(true);
    } catch (error) {
      toast({
        title: 'Speech Generation',
        description: 'Uh! Something went wrong!'
      });
    }
  };

  return (
    <Drawer backdrop={'blur'} isOpen={isOpen} onOpenChange={onOpenChange} size='3xl'>
      <DrawerContent>
        {() => (
          <>
            <DrawerHeader className='flex flex-col gap-1 text-4xl'>Voice Generation</DrawerHeader>
            <DrawerBody>
              <div className='mt-8 flex flex-col gap-4'>
                <Select
                  isRequired
                  className='max-w-sm'
                  defaultSelectedKeys={['alloy']}
                  label='Favorite Voice'
                  placeholder='Select a voice you want'
                >
                  {voices.map((voice) => (
                    <SelectItem onPress={() => setVoice(voice.key)} key={voice.key}>
                      {voice.label}
                    </SelectItem>
                  ))}
                </Select>
                <div className='mt-4'>
                  <SpeechPlayer
                    isSpeech={false}
                    audio_url={`https://cdn.openai.com/API/docs/audio/${voice}.wav`}
                  />
                </div>
                <div className='mt-4'>
                  {currentSummary?.value === 'ErrorSummary' ? (
                    <ErrorContent content={currentSummary?.content} />
                  ) : (
                    <span>{currentSummary?.content}</span>
                  )}
                </div>
              </div>
            </DrawerBody>
            <DrawerFooter>
              <Button color='danger' variant='flat' onPress={onClose}>
                Close
              </Button>
              <Button
                color='primary'
                onPress={() =>
                  isAuthenticated
                    ? generateSpeech()
                    : showSignInModal('You need to sign in to continue.')
                }
                isLoading={loading}
              >
                Generate
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default VoiceGenerationDrawer;
