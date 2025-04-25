'use client';

import React, { useEffect, useState } from 'react';

import { Card, CardBody, CardHeader, Skeleton } from '@heroui/react';
import { useTheme } from 'next-themes';

import { useSpeech } from '@/contexts/SpeechContext';
import useGetItem from '@/lib/service/get-items';

import UserCard from '../auth/user-card';
import AudioPlayerDetail from './audio-player-detail';

export default function AudioPlayerListItem({
  id,
  speech_id,
  showIndex,
  setShowIndex,
  togglePlay,
  setCurrentSummary,
  onOpen,
  index
}: any) {
  const [title, setTitle] = useState('');
  const [postDate, setPostDate] = useState('');
  const { theme } = useTheme();
  const [result, setResult] = useState<any>();
  const [summary, setSummary] = useState<any>();
  const [paperOwner, setPaperOwner] = useState<any>();
  const [paperSpeeches, setPaperSpeeches] = useState<any>();
  const { setCurrentPaperId, setSpeechId, setSpeechTitle } = useSpeech();
  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

  const { data, error, isLoading }: any = useGetItem(id);
  useEffect(() => {
    if (data) {
      console.log(data);
      setPaperOwner(data.paper_owner);
      setResult(data.paper);
      const summaryData = {
        ...data.paper_summary.summary_data,
        paper_id: data.id,
        paper_title: data.title
        // attached_links: data.attached_links
      };
      setPaperSpeeches(data.paper_speeches);
      setSummary(summaryData);
      setPostDate(data.updated_at);
      setTitle(data.title);
    }
  }, [data]);

  return (
    <div className='flex h-full w-full flex-col justify-start md:flex-row md:justify-center'>
      <div className='h-full w-full'>
        {postDate ? (
          <Card
            isBlurred
            isPressable
            onPress={() => {
              setCurrentPaperId(summary?.paper_id);
              setSpeechTitle(title);
              setSpeechId(speech_id);
              setShowIndex(index === showIndex ? -1 : index);
            }}
            className={`${showIndex === index ? 'h-full' : 'h-[115px]'} ${theme === 'dark' ? 'border-1 border-slate-700 bg-[#050506]' : 'bg-[#F6F6F6]'} w-full`}
            shadow='lg'
          >
            <CardHeader>
              <div className='w-full overflow-hidden'>
                <h1 className='cursor-pointer truncate text-left text-large font-medium'>
                  {title}
                </h1>
                <div className='flex flex-row items-center justify-between'>
                  <UserCard
                    userData={{ ...paperOwner }}
                    postDate={postDate}
                    link={DOMAIN + '/results/discrepancies/' + summary?.paper_id}
                    totalData={result}
                    showFollow={false}
                    className='mb-2 max-w-fit'
                  />
                </div>
              </div>
              {showIndex === index ? (
                <div>
                  <svg
                    stroke='currentColor'
                    fill='currentColor'
                    strokeWidth='0'
                    viewBox='0 0 512 512'
                    height='1em'
                    width='1em'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z'></path>
                  </svg>
                </div>
              ) : (
                <div>
                  <svg
                    stroke='currentColor'
                    fill='currentColor'
                    strokeWidth='0'
                    viewBox='0 0 512 512'
                    height='1em'
                    width='1em'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z'></path>
                  </svg>
                </div>
              )}
            </CardHeader>
            {showIndex === index && (
              <CardBody className='h-full transition-all duration-300 ease-in-out animate-in slide-in-from-bottom'>
                <AudioPlayerDetail
                  setCurrentSummary={setCurrentSummary}
                  togglePlay={togglePlay}
                  paperSummary={summary}
                  paperSpeeches={paperSpeeches}
                  onOpen={onOpen}
                />
              </CardBody>
            )}
          </Card>
        ) : (
          <Card className='h-[115px] w-full space-y-5 p-4' radius='lg'>
            <Skeleton className='rounded-lg'>
              <div className='h-24 rounded-lg bg-default-300' />
            </Skeleton>
            <div className='space-y-3'>
              <Skeleton className='w-3/5 rounded-lg'>
                <div className='h-3 w-3/5 rounded-lg bg-default-200' />
              </Skeleton>
              <Skeleton className='w-4/5 rounded-lg'>
                <div className='h-3 w-4/5 rounded-lg bg-default-200' />
              </Skeleton>
              <Skeleton className='w-2/5 rounded-lg'>
                <div className='h-3 w-2/5 rounded-lg bg-default-300' />
              </Skeleton>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
