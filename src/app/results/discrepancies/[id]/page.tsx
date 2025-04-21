'use client';

import React, { use } from 'react';

import Loader from '@/components/common/loader';
import AnalysisResultWrapper from '@/components/paper/analysis-result-wrapper';
import SummaryWrapper from '@/components/paper/summary-wrapper';
import useGetData from '@/lib/service/get-data';

export default function App({ params }: any) {
  const resolvedParams = use(params);
  const { id } = resolvedParams as any;
  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
  const { data: paperData, isLoading: paperLoading } = useGetData(`papers/${id}/`);

  return (
    <div>
      {!paperData ? (
        <Loader />
      ) : (
        <div className='mt-4 flex w-full flex-col gap-8 md:max-w-[1100px]'>
          <SummaryWrapper
            summary={paperData?.paper_summary?.summary_data}
            reportPost={() => alert(`report ${paperData?.id}`)}
            totalData={paperData}
            postDate={paperData?.updated_at}
            speechData={paperData?.paper_speeches}
            showSignInModal={() => {}}
            link={
              DOMAIN +
              '/results/' +
              (paperData.has_article ? 'articles' : 'discrepancies') +
              '/' +
              paperData.id
            }
            userData={paperData.paper_owner}
          />

          <AnalysisResultWrapper
            results={paperData?.paper_analysis?.analysis_data?.analysis}
            total_summary={paperData?.paper_analysis?.analysis_data?.summary}
          />
        </div>
      )}
    </div>
  );
}
