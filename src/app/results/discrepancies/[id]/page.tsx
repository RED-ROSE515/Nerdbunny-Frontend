'use client';

import React, { use } from 'react';

import { Download } from 'lucide-react';

// import puppeteer from 'puppeteer';

import Loader from '@/components/common/loader';
import AdvancedSummaryWrapper from '@/components/paper/advanced-summary-wrapper';
import AnalysisResultWrapper from '@/components/paper/analysis-result-wrapper';
import SummaryWrapper from '@/components/paper/summary-wrapper';
import { Button } from '@/components/ui/button';
import useGetData from '@/lib/service/get-data';

/**
 * Renders a page displaying detailed information about a paper,
 * including its summary and analysis results.
 *
 * @param {{params: {id: string}}} props - The properties object containing
 * the route parameters, specifically the paper ID.
 *
 * @returns {JSX.Element} A React component that fetches and displays the
 * paper's summary and analysis results. If the data is still loading,
 * a Loader component is displayed. Once loaded, it displays the SummaryWrapper
 * and AnalysisResultWrapper components with the relevant data.
 */

export default function App({ params }: any) {
  const resolvedParams = use(params);
  const { id } = resolvedParams as any;
  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
  const { data: paperData, isLoading: paperLoading } = useGetData(
    `papers/analyses/${id}/get_data/`
  );

  // const toPDF = () => {
  //   (async () => {
  //     const browser = await puppeteer.launch();
  //     const page = await browser.newPage();
  //     await page.goto('https://example.com');
  //     await page.screenshot({ path: 'example.png' });
  //     await browser.close();
  //   })();
  // };
  return (
    <div>
      {!paperData ? (
        <Loader />
      ) : (
        <div className='mt-4 flex w-full flex-col gap-8 md:max-w-[1100px]'>
          {/* <div className='flex w-full flex-row justify-end'>
            <Button size='sm' variant='outline' onClick={() => toPDF()}>
              <Download className='mr-2 h-4 w-4' />
              <span className='hidden md:inline'>Download as PDF</span>
            </Button>
          </div> */}
          <div className='mt-4 flex w-full flex-col gap-8'>
            <SummaryWrapper
              summary={paperData?.paper_summary?.summary_data}
              reportPost={() => alert(`report ${paperData?.id}`)}
              totalData={paperData}
              postDate={paperData?.updated_at}
              isResult={true}
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
            <AdvancedSummaryWrapper summary={paperData?.paper_analysis?.analysis_data?.summary} />
            <AnalysisResultWrapper
              results={paperData?.paper_analysis?.analysis_data?.analysis}
              total_summary={paperData?.paper_analysis?.analysis_data?.summary}
            />
          </div>
        </div>
      )}
    </div>
  );
}
