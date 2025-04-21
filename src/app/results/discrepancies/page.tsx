'use client';

import Loader from '@/components/common/loader';
import Statistics from '@/components/home/statistics';
import PaperList from '@/components/paper/paper-list';
import SpeechBar from '@/components/speech/speech-bar';
import { useAuth } from '@/contexts/AuthContext';

export default function MyPapers() {
  const { isAuthenticated } = useAuth();

  return (
    <div className='mt-2 flex w-full flex-row items-center justify-center md:mt-12'>
      {isAuthenticated ? (
        <div className='flex flex-col justify-start gap-12'>
          <Statistics />
          <PaperList api={`papers/`} showPagination={true} />
        </div>
      ) : (
        <div>
          <Loader />
        </div>
      )}
      <SpeechBar />
    </div>
  );
}
