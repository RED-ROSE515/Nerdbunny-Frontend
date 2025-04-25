'use client';

import Loader from '@/components/common/loader';
import PaperArticleList from '@/components/paper/paper-article-list';
import SpeechBar from '@/components/speech/speech-bar';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Page displaying the list of articles for the current user.
 *
 * If the user is authenticated, it displays a list of articles
 * with pagination. Otherwise, it displays a loader.
 *
 * @returns {JSX.Element} The component
 */
export default function MyPapers() {
  const { isAuthenticated } = useAuth();

  return (
    <div className='mt-2 flex w-full flex-row items-center justify-center md:mt-12'>
      {isAuthenticated ? (
        <div className='flex flex-col justify-start gap-12'>
          <PaperArticleList api={`papers/articles/get_results/`} showPagination={true} />
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
