'use client';

import React, { use } from 'react';

import Loader from '@/components/common/loader';
import ArticleWrapper from '@/components/paper/article-wrapper';
import useGetData from '@/lib/service/get-data';

/**
 * Page that renders a single article with all its content and speech.
 * @param {{params: {id: string}}} props
 * @returns {JSX.Element}
 */
export default function App({ params }: any) {
  const resolvedParams = use(params);
  const { id } = resolvedParams as any;
  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
  const { data: articleData, isLoading: articleLoading } = useGetData(
    `papers/articles/${id}/get_data/`
  );

  return (
    <div>
      {!articleData ? (
        <Loader />
      ) : (
        <div className='my-8 flex w-full flex-col gap-8 md:max-w-[1100px]'>
          <ArticleWrapper
            metadata={articleData?.metadata}
            reportPost={() => alert(`report ${articleData?.id}`)}
            isResult={true}
            totalData={articleData}
            postDate={articleData?.generated_at}
            speechData={articleData?.paper_speeches}
            showSignInModal={() => {}}
            link={DOMAIN + '/results/articles/' + articleData.id}
            userData={articleData.paper_owner}
          />
        </div>
      )}
    </div>
  );
}
