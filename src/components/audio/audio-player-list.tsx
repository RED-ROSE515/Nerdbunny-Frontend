'use client';

import React, { useEffect, useState } from 'react';

import { Button, Card, CardBody, CardHeader } from '@heroui/react';
import { useTheme } from 'next-themes';

import { useSpeech } from '@/contexts/SpeechContext';
import api from '@/lib/utils/api';

import Loader from '../common/loader';
import AudioPlayerListItem from './audio-player-list-item';

export default function AudioPlayerList({ className, setCurrentSummary, togglePlay, onOpen }: any) {
  const { theme } = useTheme();
  const { speechPapers, currentPaperId, setSpeechPapers, showIndex, setShowIndex } = useSpeech();
  const [canLoad, setCanLoad] = useState(true);
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   if (currentPaperId) {
  //     const index = speechPapers.findIndex((speechPaper) => speechPaper.id === currentPaperId);
  //     setShowIndex(index);
  //   }
  // }, [currentPaperId]);

  const renderSkeletons = () => {
    return Array(6)
      .fill(0)
      .map((_, index) => (
        <div
          key={index}
          className='flex h-[80px] w-full animate-pulse items-center gap-4 rounded-lg bg-default-100 p-4'
        >
          <div className='h-12 w-12 rounded-full bg-default-200'></div>
          <div className='flex-1 space-y-2'>
            <div className='h-4 w-3/4 rounded bg-default-200'></div>
            <div className='h-3 w-1/2 rounded bg-default-200'></div>
          </div>
        </div>
      ));
  };
  const fetchSpeeches = async () => {
    setLoading(true);
    const response = await api.get(
      `/papers/speeches/total_list/?start=${speechPapers.length}&limit=10`
    );
    if (response.data.length === 0) setCanLoad(false);
    else setCanLoad(true);
    const newSpeeches = [...speechPapers, ...response.data.data];
    setSpeechPapers(newSpeeches);

    setLoading(false);
  };
  return (
    <Card
      isBlurred
      className={`h-full ${theme === 'dark' ? 'border-1 border-[#3C6B99] bg-[#050506]' : 'bg-[#F6F6F6]'} h-full w-full ${className}`}
      shadow='lg'
    >
      <CardHeader>
        <div className='w-full'>
          <p className='text-small text-foreground/80'>Audited Results Playlist</p>
        </div>
      </CardHeader>
      <CardBody className='flex h-full w-full flex-col items-start justify-start gap-2'>
        <div
          className={`flex h-fit w-full flex-col items-center justify-center gap-2 rounded-lg p-2`}
        >
          {speechPapers
            ? speechPapers.map((speechPaper, index) => {
                return (
                  <AudioPlayerListItem
                    key={index}
                    index={index}
                    className='w-full'
                    setCurrentSummary={setCurrentSummary}
                    togglePlay={togglePlay}
                    onOpen={onOpen}
                    id={speechPaper.paper_id}
                    showIndex={showIndex}
                    setShowIndex={setShowIndex}
                  />
                );
              })
            : renderSkeletons()}
          {speechPapers.length > 0 && !loading ? (
            <div className='flex flex-row items-center justify-center'>
              <Button variant='bordered' onPress={fetchSpeeches} isDisabled={!canLoad}>
                Load More...
              </Button>
            </div>
          ) : (
            <Loader className='mt-6' />
          )}
        </div>
      </CardBody>
    </Card>
  );
}
