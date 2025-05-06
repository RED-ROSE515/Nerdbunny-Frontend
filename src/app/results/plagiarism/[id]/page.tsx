'use client';

import React, { use } from 'react';

import Loader from '@/components/common/loader';
import PDFViewer from '@/components/common/pdf-viewer';
import ChatGPT from '@/components/home/chatgpt';
import ErrorContent from '@/components/paper/error-content';
import { PlagiarismReport } from '@/components/plagiarism/plagiarism-report';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import useGetData from '@/lib/service/get-data';
import { ReportData } from '@/lib/types/plagiarism';

export default function App({ params }: any) {
  const resolvedParams = use(params);
  const { id } = resolvedParams as any;
  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
  const { data: paperData, isLoading: paperLoading } = useGetData(
    `papers/copyleaks/${id}/get_plagiarism_data`
  );

  return (
    <div>
      {!paperData ? (
        <Loader />
      ) : (
        <React.Fragment>
          <div className='my-8 flex w-full max-w-[100vw] gap-8 md:max-w-[90vw]'>
            <Card className='w-full'>
              <CardContent className='flex flex-col gap-4 p-1 md:p-6'>
                <div className='flex w-full flex-row gap-4'>
                  <PlagiarismReport data={paperData.paper} />
                </div>
              </CardContent>
            </Card>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
