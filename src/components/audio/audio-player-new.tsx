'use client';

import React, { useCallback, useState, useTransition } from 'react';

import { Card } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { FaExpandArrowsAlt } from 'react-icons/fa';

import ShareButton from '../common/share-button';
import { PlayerControls } from './controls/player-controls';
import { Timeline } from './controls/timeline';
import { VolumeControls } from './controls/volume-controls';
import { TrackInfo } from './display/track-info';
import { Waveform } from './display/waveform';
import { PlaylistDrawer } from './drawer/playlist-drawer';
import { Voice } from './drawer/voice-selector';

interface AudioPlayerProps {
  audioUrl: string;
  title: string;
  speechId: string;
  speechType?: string;
  height?: number;
  isSpeech?: boolean;
  voices?: Voice[];
  selectedVoice?: string;
  onVoiceChange?: (voice: string) => void;
  speeches?: any[];
  onSpeechSelect?: (speech: any) => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioUrl = '',
  title = '',
  speechId = '',
  speechType = '',
  height = 50,
  isSpeech = true,
  voices = [],
  selectedVoice = '',
  onVoiceChange = () => {},
  speeches = [],
  onSpeechSelect = () => {}
}) => {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [loadProgress, setLoadProgress] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

  const formatTime = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secondsRemainder = Math.round(seconds) % 60;
    const paddedSeconds = `0${secondsRemainder}`.slice(-2);
    return `${minutes}:${paddedSeconds}`;
  }, []);

  const handleTimeUpdate = useCallback(
    (time: number) => {
      setCurrentTime(formatTime(time));
    },
    [formatTime]
  );

  const handleDurationSet = useCallback(
    (time: number) => {
      setDuration(formatTime(time));
    },
    [formatTime]
  );

  const navigateToSpeech = useCallback(() => {
    startTransition(() => {
      router.push(`/speeches/${speechId}`);
    });
  }, [router, speechId]);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <>
      <Card className='flex flex-row items-center justify-between gap-4 p-4'>
        <div className='flex w-full flex-col gap-4'>
          <TrackInfo
            title={title}
            speechType={speechType}
            onPlaylistOpen={() => setIsDrawerOpen(true)}
            isMobile={isMobile}
          />
          <div className='flex flex-col gap-2'>
            <Waveform
              audioUrl={audioUrl}
              onPlayPause={setIsPlaying}
              onTimeUpdate={handleTimeUpdate}
              onDurationSet={handleDurationSet}
              onLoadProgress={setLoadProgress}
              height={height}
              isMobile={isMobile}
            />
            <Timeline currentTime={currentTime} duration={duration} />
          </div>
          <div className='flex items-center justify-between'>
            <PlayerControls
              isPlaying={isPlaying}
              onPlayPause={() => setIsPlaying(!isPlaying)}
              onPrevious={() => {}}
              onNext={() => {}}
              showExtraControls={isSpeech}
            />
            <div className='flex items-center gap-2'>
              {/* <VolumeControls onChange={() => {}} /> */}
              {isSpeech && (
                <>
                  <ShareButton
                    url={`${DOMAIN}/speeches/${speechId}`}
                    title={title}
                    isSpeech={true}
                    speechId={speechId}
                    size={isMobile ? '30px' : '50px'}
                  />
                  <FaExpandArrowsAlt
                    size={20}
                    className='cursor-pointer'
                    onClick={navigateToSpeech}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </Card>

      {isSpeech && (
        <PlaylistDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          voices={voices}
          selectedVoice={selectedVoice}
          onVoiceChange={onVoiceChange}
          speeches={speeches}
          currentSpeechId={speechId}
          onSpeechSelect={onSpeechSelect}
        />
      )}
    </>
  );
};
