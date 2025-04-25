'use client';

import React, { useEffect, useState, useTransition } from 'react';

import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Tooltip
} from '@heroui/react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import childImage from 'public/NerdBunnyUI/child.png';
import collegeImage from 'public/NerdBunnyUI/college.png';
import errorImage from 'public/NerdBunnyUI/Error.png';
import phDImage from 'public/NerdBunnyUI/PhD.png';
import { FaPause, FaPlay } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { RiVoiceAiLine } from 'react-icons/ri';

import { useSpeech } from '@/contexts/SpeechContext';

import { AnimatedGradientText } from '../magicui/animated-gradient-text';
import ErrorContent from '../paper/error-content';

export default function AudioPlayerDetail({
  setCurrentSummary,
  paperSummary,
  paperSpeeches,
  onOpen,
  togglePlay
}: any) {
  const { theme } = useTheme();
  const router = useRouter();
  const {
    isPlaying,
    speechUrl,
    currentPaperId,
    listenedSpeeches,
    setSpeechList,
    setSpeechUrl,
    setSpeechType,
    setIsPlaying,
    setPercentage,
    setSpeechId
  } = useSpeech();
  const [auditDetailPending, startAuditDetailTransition] = useTransition();

  const [loading, setLoading] = useState<boolean>(false);
  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

  useEffect(() => {
    setLoading(true);
    const initialSpeech = paperSpeeches[0];
    if (initialSpeech) {
      setSpeechType(initialSpeech.speech_type);
      setSpeechUrl(initialSpeech.audio_url);
      setSpeechId(initialSpeech.id);
    }
    const speechTypes = ['child', 'college', 'phd', 'error'];
    const speechList = speechTypes.map((type) => {
      return {
        speech_url: paperSpeeches?.find((speech: any) => speech.speech_type === type)?.audio_url,
        speech_type: type
      };
    });
    setSpeechList(speechList);
    setLoading(false);
  }, [paperSpeeches]);

  const summaryTypes = [
    {
      key: 'child',
      title: 'Child Summary',
      type: 'child',
      image: childImage,
      content: paperSummary?.summary?.child,
      speech_url: paperSpeeches?.find((speech: any) => speech.speech_type === 'child')?.audio_url,
      speech_id: paperSpeeches?.find((speech: any) => speech.speech_type === 'child')?.id
    },
    {
      key: 'college',
      title: 'College Summary',
      type: 'college',
      image: collegeImage,
      content: paperSummary?.summary?.college,
      speech_url: paperSpeeches?.find((speech: any) => speech.speech_type === 'college')?.audio_url,
      speech_id: paperSpeeches?.find((speech: any) => speech.speech_type === 'college')?.id
    },
    {
      key: 'phd',
      title: 'PhD Summary',
      type: 'phd',
      image: phDImage,
      content: paperSummary?.summary?.phd,
      speech_url: paperSpeeches?.find((speech: any) => speech.speech_type === 'phd')?.audio_url,
      speech_id: paperSpeeches?.find((speech: any) => speech.speech_type === 'phd')?.id
    },
    {
      key: 'error',
      title: 'Error Summary',
      type: 'error',
      image: errorImage,
      content: paperSummary?.summary?.error,
      speech_url: paperSpeeches?.find((speech: any) => speech.speech_type === 'error')?.audio_url,
      speech_id: paperSpeeches?.find((speech: any) => speech.speech_type === 'error')?.id
    }
  ];

  return (
    <Card
      isBlurred
      className={`h-full w-full bg-[#F6F6F6] dark:bg-[#050506]`}
      classNames={{
        base: 'overflow-hidden border-none p-0',
        body: 'p-1'
      }}
      shadow='lg'
    >
      <CardHeader>
        <div className='flex w-full flex-row items-center justify-between'>
          <p className='text-md text-foreground/80'>Paper Detail</p>
          <Button
            variant='bordered'
            className='text-xs'
            size='sm'
            isLoading={auditDetailPending}
            onPress={() =>
              startAuditDetailTransition(() =>
                router.push(DOMAIN + '/results/discrepancies/' + currentPaperId)
              )
            }
          >
            View Full Audit Report
          </Button>
        </div>
      </CardHeader>
      <CardBody className='flex h-full w-full flex-col items-start justify-start overflow-auto'>
        {loading ? (
          <div className='w-full'>
            <div className='flex flex-col gap-2 rounded-lg border border-default-200 p-4'>
              <div className='flex flex-row gap-2'>
                <Skeleton className='h-10 w-10 rounded-lg' />
                <Skeleton className='h-10 w-full rounded' />
              </div>
              <div className='flex flex-row gap-2'>
                <Skeleton className='h-10 w-10 rounded-lg' />
                <Skeleton className='h-10 w-full rounded' />
              </div>
              <div className='flex flex-row gap-2'>
                <Skeleton className='h-10 w-10 rounded-lg' />
                <Skeleton className='h-10 w-full rounded' />
              </div>
              <div className='flex flex-row gap-2'>
                <Skeleton className='h-10 w-10 rounded-lg' />
                <Skeleton className='h-10 w-full rounded' />
              </div>
            </div>
          </div>
        ) : (
          <div className='w-full'>
            <Accordion
              className='w-full overflow-hidden px-0'
              motionProps={{
                variants: {
                  enter: {
                    y: 0,
                    opacity: 1,
                    height: 'auto',
                    overflowY: 'unset',
                    transition: {
                      height: {
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                        duration: 1
                      },
                      opacity: {
                        easings: 'ease',
                        duration: 1
                      }
                    }
                  },
                  exit: {
                    y: -10,
                    opacity: 0,
                    height: 0,
                    overflowY: 'hidden',
                    transition: {
                      height: {
                        easings: 'ease',
                        duration: 0.25
                      },
                      opacity: {
                        easings: 'ease',
                        duration: 0.3
                      }
                    }
                  }
                }
              }}
              itemClasses={{ base: 'px-2' }}
              variant='bordered'
            >
              {summaryTypes.map((summaryType, index) => (
                <AccordionItem
                  key={index}
                  textValue={summaryType.title}
                  startContent={
                    <Image
                      priority
                      alt='NERDBUNNY LOGO'
                      className='rounded-lg'
                      height='30'
                      src={summaryType.image}
                      width='30'
                    />
                  }
                  indicator={({ isOpen }) => (isOpen ? <IoIosArrowForward /> : <IoIosArrowDown />)}
                  className={`h-full w-full items-center overflow-hidden md:min-h-[68px]`}
                  title={
                    <div className='flex w-full flex-row items-center justify-between'>
                      {speechUrl === summaryType.speech_url ? (
                        <AnimatedGradientText
                          speed={2}
                          colorFrom='#4ade80'
                          colorTo='#06b6d4'
                          className='text-xl font-bold tracking-tight'
                        >
                          {currentPaperId &&
                          listenedSpeeches.includes(currentPaperId + ' - ' + summaryType.type)
                            ? summaryType.title + ' (Listened)'
                            : summaryType.title}
                        </AnimatedGradientText>
                      ) : (
                        <span
                          className={`text-lg ${currentPaperId && listenedSpeeches.includes(currentPaperId + ' -' + summaryType.type) ? 'text-gray-500' : ''}`}
                          style={{ fontWeight: '500' }}
                        >
                          {currentPaperId &&
                          listenedSpeeches.includes(currentPaperId + ' - ' + summaryType.type)
                            ? summaryType.title + ' (Listened)'
                            : summaryType.title}
                        </span>
                      )}

                      <Tooltip
                        content={
                          <strong className='text-md text-center font-bold'>Voice Generator</strong>
                        }
                        placement='top'
                        closeDelay={1000}
                      >
                        {summaryType.speech_url ? (
                          <div
                            onClick={() => {
                              const prevSpeechUrl = speechUrl;
                              setSpeechType(summaryType.type);
                              setSpeechUrl(summaryType.speech_url);
                              setSpeechId(summaryType.speech_id);
                              if (prevSpeechUrl !== summaryType.speech_url) {
                                setPercentage(0);
                                setIsPlaying(true);
                                // togglePlay();
                              } else {
                                setIsPlaying(!isPlaying);
                                // togglePlay();
                              }
                            }}
                            className={`rounded-lg border hover:bg-transparent hover:text-pink-600 ${currentPaperId && listenedSpeeches.includes(currentPaperId + ' -' + summaryType.type) ? 'text-gray-500' : ''}`}
                          >
                            {isPlaying && speechUrl === summaryType.speech_url ? (
                              <FaPause className='w-full p-2' style={{ height: 'fit-content' }} />
                            ) : (
                              <FaPlay className='w-full p-2' style={{ height: 'fit-content' }} />
                            )}
                          </div>
                        ) : (
                          <div
                            onClick={async (e) => {
                              setSpeechType(summaryType?.type);
                              setCurrentSummary(summaryType);
                              onOpen();
                            }}
                            className={`rounded-lg border hover:bg-transparent hover:text-pink-600`}
                          >
                            <RiVoiceAiLine
                              className='w-full p-2'
                              style={{ height: 'fit-content' }}
                            />
                          </div>
                        )}
                      </Tooltip>
                    </div>
                  }
                  value={index.toString()}
                >
                  {summaryType.key === 'error' ? (
                    <div key={index}>
                      <ErrorContent content={summaryType.content} />
                    </div>
                  ) : (
                    <div>
                      <p className={`text-sm font-semibold text-slate-800 dark:text-gray-200`}>
                        {summaryType.content}
                      </p>
                    </div>
                  )}
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
