import React, { useEffect, useState } from 'react';

import { Divider, Link, useDisclosure } from '@heroui/react';
import { useTheme } from 'next-themes';
import { StaticImageData } from 'next/image';

import { useAuth } from '@/contexts/AuthContext';
import { useSpeech } from '@/contexts/SpeechContext';

import UserCard from '../auth/user-card';
import { ShineBorder } from '../magicui/shine-border';
import { Card, CardContent, CardHeader } from '../ui/card';
import AuthorSection from './author-section';
import ErrorContent from './error-content';
import KeywordsSection from './keywords-section';
import PaperLinkSection from './papaer-link-section';
import PublicationInfoSection from './publication-info-section';
import VoiceGenerationDrawer from './voice-generation-drawer';

export const voices = [
  { key: 'alloy', label: 'Alloy' },
  { key: 'ash', label: 'Ash' },
  { key: 'coral', label: 'Coral' },
  { key: 'echo', label: 'Echo' },
  { key: 'fable', label: 'Fable' },
  { key: 'onyx', label: 'Onyx' },
  { key: 'nova', label: 'Nova' },
  { key: 'sage', label: 'Sage' },
  { key: 'shimmer', label: 'Shimmer' }
];

export const UserSVG = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
      <path
        d='M7.99984 1.33331C6.34298 1.33331 4.99984 2.67646 4.99984 4.33331C4.99984 5.99017 6.34298 7.33331 7.99984 7.33331C9.65669 7.33331 10.9998 5.99017 10.9998 4.33331C10.9998 2.67646 9.65669 1.33331 7.99984 1.33331Z'
        fill='#737E88'
      />
      <path
        d='M8.00034 7.99998C4.82849 7.99998 2.61144 10.3474 2.3366 13.2709L2.26807 14H13.7326L13.6641 13.2709C13.3892 10.3474 11.1722 7.99998 8.00034 7.99998Z'
        fill='#737E88'
      />
    </svg>
  );
};

export interface SummaryType {
  key: string;
  title: string;
  content: string;
  value: string;
  type?: string;
  audio_url?: string;
  speech_url?: string;
  speech_id?: string;
  image: StaticImageData;
}

const ArticleWrapper = ({
  metadata,
  isResult,
  totalData,
  postDate,
  userData,
  reportPost,
  showSignInModal,
  input_tokens,
  output_tokens,
  total_cost,
  speechData,
  link
}: any) => {
  const [currentSummary, setCurrentSummary] = useState<SummaryType>();
  const { setSpeechUrl, setShowSpeech, setSpeechId, setSpeechTitle } = useSpeech();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const { isAuthenticated } = useAuth();
  const { resolvedTheme } = useTheme();
  /**
   * Handles the play button click of a speech in the summary accordion.
   * Sets the speechUrl, speechId, and speechTitle in the SpeechContext, and
   * shows the speech player.
   * @param {string} speechUrl - The URL of the speech audio
   * @param {string} speechId - The ID of the speech
   * @param {string} title - The title of the speech
   */
  const handlePlayVoice = (speechUrl: string, speechId: string, title: string) => {
    setShowSpeech(false);
    setSpeechUrl(speechUrl);
    setSpeechId(speechId);
    setSpeechTitle(title);
    setShowSpeech(true);
  };

  /**
   * Handles the voice generation button click of a summary in the summary accordion.
   * Sets the currentSummary in the state and opens the voice generation drawer.
   * @param {SummaryType} summary - The summary to generate voice for
   */
  const handleVoiceGenerate = (summary: SummaryType) => {
    setCurrentSummary(summary);
    onOpen();
  };

  useEffect(() => {}, [speechData]);
  return (
    <div className='relative flex w-full flex-col gap-5 overflow-hidden rounded-lg bg-[#F7F7F7] p-4 dark:bg-[#1E2A36] md:px-4'>
      <div className='flex w-full flex-col justify-center gap-5 text-center text-2xl font-bold'>
        {isResult ? (
          <span className='text-md flex-1 items-center px-2 font-bold md:text-3xl'>
            {metadata.title}
          </span>
        ) : (
          <Link href={link}>
            <span className='text-md px-2 font-bold text-slate-700 dark:text-slate-200 md:text-3xl'>
              {metadata.title}
            </span>
          </Link>
        )}
        {userData && (
          <UserCard
            userData={userData}
            postDate={postDate}
            link={link}
            reportPost={reportPost}
            showSignInModal={showSignInModal}
            input_tokens={input_tokens}
            output_tokens={output_tokens}
            totalData={totalData}
            className='max-w-fit'
          />
        )}
        <Divider className={`bg-[#E2E2E2] dark:bg-[#2E3E4E]`} />
      </div>

      <div className='flex flex-col justify-between md:flex-row'>
        <div className='flex w-full flex-col items-start justify-center gap-10 md:flex-row'>
          <div className='w-full md:w-2/3'>
            <AuthorSection authors={metadata.authors} />
          </div>
          <div className='w-full md:w-1/3'>
            <PaperLinkSection paperLink={metadata.paper_link} />
          </div>
        </div>
      </div>

      <Card className='relative'>
        <ShineBorder shineColor={resolvedTheme === 'dark' ? 'white' : 'black'} />
        <CardHeader>
          <strong className='md:text-2xl'>Summary</strong>
        </CardHeader>
        <CardContent>
          <p className={`text-md text-slate-800 dark:text-gray-200`}>{totalData.summary_data}</p>
        </CardContent>
      </Card>

      {isResult && (
        <Card className='relative'>
          <ShineBorder shineColor={resolvedTheme === 'dark' ? 'white' : 'black'} />
          <CardHeader>
            <strong className='md:text-2xl'>Article</strong>
          </CardHeader>
          <CardContent>
            <ErrorContent content={totalData.article_data} />
          </CardContent>
        </Card>
      )}

      <PublicationInfoSection
        date={metadata.publication_info.date}
        journal={metadata.publication_info.journal}
      />

      <KeywordsSection keywords={metadata.publication_info.keywords} />

      <VoiceGenerationDrawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        currentSummary={currentSummary}
        setSpeechUrl={setSpeechUrl}
        setSpeechId={setSpeechId}
        setSpeechTitle={setSpeechTitle}
        setShowSpeech={setShowSpeech}
        isAuthenticated={isAuthenticated}
        showSignInModal={showSignInModal}
        paperId={totalData?.id}
      />
    </div>
  );
};

export default ArticleWrapper;
