'use client';

import React, { useCallback, useEffect, useRef, useState, useTransition } from 'react';

import {
  Button,
  Card,
  CardBody,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Progress,
  Select,
  SelectItem,
  Skeleton,
  useDisclosure
} from '@heroui/react';
import { useWavesurfer } from '@wavesurfer/react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { FaX } from 'react-icons/fa6';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdArrowBack } from 'react-icons/io';

import {
  ForwardIcon,
  NextIcon,
  PauseCircleIcon,
  PlayCircleIcon,
  PreviousIcon,
  RepeatOneIcon,
  RewindIcon,
  ShuffleIcon
} from '@/components/common/svgs';
import ErrorContent from '@/components/paper/error-content';
import { SummaryType, voices } from '@/components/paper/summary-wrapper';
import { useAuth } from '@/contexts/AuthContext';
import { useSpeech } from '@/contexts/SpeechContext';
import useDeviceCheck from '@/lib/hooks/user-device-check';
import useGetData from '@/lib/service/get-data';
import api from '@/lib/utils/api';

import SignInDialog from '../auth/signin-dialog';
import ShareButtons from '../common/share-button';
import { useToast } from '../hooks/use-toast';
import { Particles } from '../magicui/particles';
import SpeechPlayer from '../speech/speech-player';
import AdPlayer from './ad-player';
import AudioPlayerList from './audio-player-list';

export default function AudioPlayer({ id }: any) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { isMobile } = useDeviceCheck();
  const [time, setTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const { theme, resolvedTheme } = useTheme();
  const [isPending, startTransition] = useTransition();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [color, setColor] = useState('#ffffff');
  const { isAuthenticated } = useAuth();
  const [voice, setVoice] = useState('alloy');
  const [paperIndex, setPaperIndex] = useState<number>(0);
  const {
    percentage,
    setPercentage,
    isPlaying,
    setIsPlaying,
    setSpeechUrl,
    setShowSpeech,
    speechUrl,
    speechPapers,
    speechTitle,
    showIndex,
    listenedSpeeches,
    setListenedSpeeches,
    setSpeechType,
    setSpeechPapers,
    speechType,
    currentPaperId,
    setCurrentPaperId,
    setSpeechTitle,
    speechId,
    setSpeechId,
    setShowIndex
  } = useSpeech();
  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

  const [showSignIn, setShowSignIn] = useState(false);
  const NOBLEBLOCKS_DOMAIN = process.env.NEXT_PUBLIC_NOBLEBLOCKS_DOMAIN;
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [currentSummary, setCurrentSummary] = useState<SummaryType>();
  const [auditDetailPending, startAuditDetailTransition] = useTransition();
  const [newPaper, setNewPaper] = useState<any>(speechPapers[0]);
  const { mutate: mutateSpeechData } = useGetData(
    currentPaperId ? `papers/speeches/get_speeches_by_paper?paper_id=${currentPaperId}` : ''
  );
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
    onOpenChange: onDrawerOpenChange
  } = useDisclosure();
  // Ensure that the container is correctly passed as a RefObject
  const { data: speechData, isLoading: speechLoading } = useGetData(
    newPaper?.paper_id ? `papers/speeches/get_speeches_by_paper?paper_id=${newPaper?.paper_id}` : ''
  );
  const { wavesurfer } = useWavesurfer({
    container: containerRef, // Pass the ref object itself, not its current property
    waveColor: theme === 'dark' ? '#4F4A85' : '#A7A9AB',
    progressColor: theme === 'dark' ? '#FF0068' : '#FFAA68',
    barWidth: 3,
    barHeight: 2,
    autoCenter: true,
    height: 40,
    url: speechUrl,
    autoplay: true
  });
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secondsRemainder = Math.round(seconds) % 60;
    const paddedSeconds = `0${secondsRemainder}`.slice(-2);
    return `${minutes}:${paddedSeconds}`;
  };
  const togglePlay = useCallback(() => {
    if (wavesurfer) {
      wavesurfer.playPause();
      setIsPlaying(!isPlaying);
    }
  }, [wavesurfer, isPlaying]);
  const toggleStop = useCallback(() => {
    if (wavesurfer) {
      wavesurfer.setTime(wavesurfer.getDuration());
    }
  }, [wavesurfer]);
  const skip = useCallback(
    (length: number) => {
      if (wavesurfer) {
        wavesurfer.skip(length);
      }
    },
    [wavesurfer]
  );
  useEffect(() => {
    setColor(resolvedTheme === 'dark' ? '#ffffff' : '#000000');
  }, [resolvedTheme]);

  useEffect(() => {
    const index = speechPapers.findIndex((speechPaper) => speechPaper.paper_id === currentPaperId);
    setPaperIndex(index);
  }, [currentPaperId]);
  useEffect(() => {
    if (speechData) {
      console.log(speechData);
      const initialSpeech = speechData.data.speeches[0];
      setSpeechType(initialSpeech.speech_type);
      setSpeechUrl(initialSpeech.audio_url);
      setSpeechTitle(initialSpeech.paper_title);
      setCurrentPaperId(initialSpeech.paper_id);
    }
  }, [speechData]);

  const showSignInModal = async (action: string) => {
    toast({
      title: 'Info',
      description: action
    });
    setShowSignIn(true);
  };

  const generateSpeech = async () => {
    try {
      setLoading(true);
      const response = await api.post(`papers/speeches/generate_speech/`, {
        paper_id: currentPaperId,
        speech_type: speechType,
        voice_type: voice
      });
      setLoading(false);
      onDrawerClose();
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
      await mutateSpeechData();
    } catch (error) {
      toast({
        title: 'Speech Generation',
        description: 'Uh! Something went wrong!'
      });
    }
  };

  const prevSpeech = () => {
    if (paperIndex > 0) {
      setNewPaper(speechPapers[paperIndex - 1]);
      setShowIndex(paperIndex - 1);
    }
  };
  const nextSpeech = () => {
    if (paperIndex < speechPapers.length - 1) {
      setNewPaper(speechPapers[paperIndex + 1]);
      setShowIndex(paperIndex + 1);
    }
  };

  useEffect(() => {
    if (percentage === 100) {
      setTime('0:00');
      if (isPlaying) wavesurfer?.play();
      else wavesurfer?.pause();
    }
  }, [isPlaying, wavesurfer, percentage]);
  useEffect(() => {
    if (!wavesurfer) return;

    const subscriptions = [
      wavesurfer.on('play', () => setIsPlaying(true)),
      wavesurfer.on('pause', () => setIsPlaying(false)),
      wavesurfer.on('loading', (val) => setPercentage(val)),
      wavesurfer.on('decode', (duration) => setDuration(formatTime(duration))),
      wavesurfer.on('timeupdate', (currentTime) => setTime(formatTime(currentTime))),
      wavesurfer.on('ready', () => {
        wavesurfer.play();
      }),
      wavesurfer.on('finish', () => {
        setShowSpeech(false);
        const newListenedSpeeches = [...listenedSpeeches, currentPaperId + ' - ' + speechType];
        setListenedSpeeches(newListenedSpeeches);
        nextSpeech();
      })
    ];

    // Cleanup function to unsubscribe from events
    return () => subscriptions.forEach((unsub) => unsub());
  }, [wavesurfer]);

  const fetchSpeeches = async () => {
    const response = await api.get('/papers/speeches/total_list/?start=1&limit=10');
    setSpeechPapers(response.data.data);
    setNewPaper(response.data.data[0]);
    if (!id) {
      const initialSpeechData = response.data.data[0];
      setCurrentPaperId(initialSpeechData.paper_id);
      setSpeechTitle(initialSpeechData.title);
      setSpeechType(initialSpeechData.speech_type);
    }
  };

  const fetchSpeech = async () => {
    if (!id) return;
    const response = await api.get(`papers/speeches/get_speeches_by_paper?paper_id=${id}/`);
    const paper_id = response.data.paper_id;

    setSpeechTitle(response.data.paper_title);
    setSpeechType(response.data.speech_type);
    setSpeechUrl(response.data.audio_url);
    setCurrentPaperId(paper_id);
    wavesurfer?.load(response.data.audio_url);
  };

  useEffect(() => {
    const init = async () => {
      await fetchSpeeches();
      await fetchSpeech();
    };
    init();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isMobile && window.innerHeight + window.scrollY == document.documentElement.scrollHeight)
        onOpen();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='flex h-full w-full flex-col-reverse justify-start gap-4 p-0 md:flex-row md:justify-center md:p-4'>
      <div className='flex h-full w-full flex-row items-center justify-center overflow-hidden md:w-[50%]'>
        <SignInDialog isOpen={showSignIn} onClose={() => setShowSignIn(false)} />
        <Card
          isBlurred
          className={`h-full w-full overflow-hidden rounded-none bg-[#F6F6F6] p-1 shadow-2xl dark:bg-[#050506] md:rounded-lg dark:md:border-1`}
          shadow='lg'
        >
          <CardBody className='overflow-hidden p-1'>
            <Button
              variant='light'
              isLoading={isPending}
              onPress={() => {
                startTransition(() => {
                  history.back();
                });
              }}
              className='absolute left-0 top-0 hidden md:flex'
            >
              <IoMdArrowBack size={20} />
              <span>Back</span>
            </Button>
            <div className='absolute right-3 top-0 hidden md:flex'>
              <ShareButtons
                url={DOMAIN + '/speeches/' + speechId}
                title={speechTitle}
                useIcon={false}
                // summary={result.summary.child}
              />
            </div>
            <div className='flex flex-row items-center justify-between md:hidden'>
              <Button
                variant='light'
                className='px-0'
                isLoading={isPending}
                onPress={() => {
                  startTransition(() => {
                    history.back();
                  });
                }}
              >
                <IoMdArrowBack size={20} />
                <span>Back</span>
              </Button>
              <div>
                <ShareButtons
                  url={DOMAIN + '/speeches/' + speechId}
                  title={speechTitle}
                  useIcon={false}
                  // summary={result.summary.child}
                />
              </div>
            </div>

            <div className='flex h-full min-h-[200px] w-full flex-col items-start justify-end overflow-hidden'>
              <span className='ml-6 text-lg font-bold'>Sponsored by</span>
              <AdPlayer />
              <Particles
                className='absolute inset-0 z-0'
                quantity={100}
                ease={80}
                color={color}
                refresh
              />
            </div>
            <div className='justity-end z-10 flex h-full w-full flex-col-reverse'>
              <div
                className={`flex w-full flex-col justify-end bg-[#F5F5F5] p-1 shadow-md dark:bg-black md:rounded-xl md:border-1 md:p-3`}
              >
                <div className='flex w-full flex-row items-start justify-between'>
                  {speechType && speechTitle ? (
                    <div className='flex h-[65px] w-full flex-col gap-0'>
                      <div className='flex w-full flex-row items-center justify-between'>
                        <p className='text-small text-foreground/80'>
                          {speechType + ' ' + 'Summary'}
                        </p>
                      </div>
                      <h1
                        className='mt-2 cursor-pointer truncate text-large font-medium'
                        onClick={onOpen}
                      >
                        {speechTitle}
                      </h1>
                    </div>
                  ) : (
                    <div className='h-[66px] w-full space-y-2 p-2'>
                      <Skeleton className='w-full rounded-lg'>
                        <div className='h-[20px] rounded-md bg-default-300' />
                      </Skeleton>
                      <Skeleton className='w-full rounded-sm'>
                        <div className='h-[35px] rounded-md bg-default-300' />
                      </Skeleton>
                    </div>
                  )}
                </div>

                <div className='mt-3 flex w-full flex-col gap-1'>
                  <Progress
                    aria-label='Downloading...'
                    classNames={{
                      base: `w-full h-[40px] card rounded-md ${percentage < 100 ? '' : 'hidden'}`,
                      track: 'drop-shadow-md border border-default',
                      indicator: 'bg-gradient-to-r from-[#4F4A85] to-[#1E1C32]',
                      label: 'tracking-wider font-medium text-default-600',
                      value: 'text-foreground/60'
                    }}
                    showValueLabel={true}
                    size='md'
                    label='Loading...'
                    value={percentage}
                  />
                  <div
                    ref={containerRef}
                    className={`h-[40px] rounded-lg border-1 ${percentage < 100 ? 'hidden' : ''}`}
                  />
                  <div className='flex justify-between'>
                    <p className='text-small'>{time}</p>
                    <p className='text-small text-foreground/50'>{duration}</p>
                  </div>
                  <div className='flex flex-row items-center justify-between'>
                    <Button className='px-1 py-0' variant='bordered' size='sm' onPress={onOpen}>
                      <p className='text-small text-foreground/80'>View Playlist</p>
                    </Button>

                    <Button
                      className='px-1 py-0'
                      variant='bordered'
                      size='sm'
                      isLoading={auditDetailPending}
                      onPress={() =>
                        startAuditDetailTransition(() =>
                          router.push(DOMAIN + '/results/discrepancies/' + currentPaperId)
                        )
                      }
                    >
                      <p className='text-small text-foreground/80'>View Full Audit Report</p>
                    </Button>
                  </div>
                </div>

                <div className='flex w-full items-center justify-center'>
                  <Button
                    isIconOnly
                    isDisabled
                    className='hidden data-[hover]:bg-foreground/10 md:flex'
                    radius='full'
                    variant='light'
                  >
                    <RepeatOneIcon className='text-foreground/80' />
                  </Button>
                  <Button
                    isIconOnly
                    isDisabled={showIndex === 0}
                    className='data-[hover]:bg-foreground/10'
                    radius='full'
                    variant='light'
                    onPress={prevSpeech}
                  >
                    <PreviousIcon />
                  </Button>
                  <Button
                    isIconOnly
                    onPress={() => skip(-15)}
                    className='data-[hover]:bg-foreground/10'
                    radius='full'
                    variant='light'
                  >
                    <RewindIcon />
                  </Button>
                  <Button
                    onPress={togglePlay}
                    isIconOnly
                    className='h-auto w-auto data-[hover]:bg-foreground/10'
                    radius='full'
                    variant='light'
                  >
                    {isPlaying ? <PauseCircleIcon size={54} /> : <PlayCircleIcon size={54} />}
                  </Button>
                  <Button
                    isIconOnly
                    onPress={() => skip(15)}
                    className='data-[hover]:bg-foreground/10'
                    radius='full'
                    variant='light'
                  >
                    <ForwardIcon />
                  </Button>
                  <Button
                    isIconOnly
                    isDisabled={paperIndex === speechPapers.length - 1}
                    onPress={nextSpeech}
                    className='data-[hover]:bg-foreground/10'
                    radius='full'
                    variant='light'
                  >
                    <NextIcon />
                  </Button>
                  <Button
                    isIconOnly
                    isDisabled
                    className='hidden data-[hover]:bg-foreground/10 md:flex'
                    radius='full'
                    variant='light'
                  >
                    <ShuffleIcon className='text-foreground/80' />
                  </Button>
                  <Button
                    isIconOnly
                    className='absolute right-1 block data-[hover]:bg-foreground/10 md:hidden'
                    radius='full'
                    variant='light'
                    onPress={onOpen}
                  >
                    <GiHamburgerMenu size={20} />
                  </Button>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      <Drawer
        isOpen={isOpen}
        backdrop='blur'
        size='full'
        hideCloseButton
        motionProps={{
          variants: {
            enter: {
              opacity: 1,
              x: 0
            },
            exit: {
              x: 100,
              opacity: 0
            }
          }
        }}
        onOpenChange={onOpenChange}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <Button
                isIconOnly
                variant='light'
                onPress={onClose}
                className='absolute right-0 top-2 z-10'
              >
                <FaX />
              </Button>
              <DrawerBody className='px-0 py-2'>
                <AudioPlayerList
                  className='mr-2 h-full w-full'
                  setCurrentSummary={setCurrentSummary}
                  togglePlay={togglePlay}
                  onOpen={onDrawerOpen}
                />
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>

      <div className='hidden h-full w-[35%] md:block'>
        <AudioPlayerList
          setCurrentSummary={setCurrentSummary}
          togglePlay={togglePlay}
          onOpen={onDrawerOpen}
        />
      </div>
      <Drawer
        backdrop={isMobile ? 'transparent' : 'blur'}
        isOpen={isDrawerOpen}
        onOpenChange={onDrawerOpenChange}
        size='3xl'
      >
        <DrawerContent>
          {(onClose) => (
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
                    {currentSummary?.type === 'ErrorSummary' ? (
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
    </div>
  );
}
