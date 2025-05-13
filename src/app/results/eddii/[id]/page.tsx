'use client';

import React, { use } from 'react';

import Loader from '@/components/common/loader';
import PDFViewer from '@/components/common/pdf-viewer';
import ChatGPT from '@/components/home/chatgpt';
import { Carousel } from '@/components/paper/carousel/carousel';
import ErrorContent from '@/components/paper/error-content';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import useGetData from '@/lib/service/get-data';

export default function App({ params }: any) {
  const resolvedParams = use(params);
  const { id } = resolvedParams as any;
  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
  const { data: paperData, isLoading: paperLoading } = useGetData(
    `papers/eddii/${id}/get_eddii_data`
  );

  return (
    <div>
      {!paperData ? (
        <Loader />
      ) : (
        <React.Fragment>
          <div className='my-8 flex w-full max-w-[100vw] gap-8 md:max-w-[90vw]'>
            <Card className='w-full'>
              <CardHeader>
                <h1 className='mt-4 text-center text-lg font-bold md:text-3xl'>
                  {paperData.paper.title}
                </h1>
              </CardHeader>
              <CardContent className='flex flex-col items-center gap-4 p-1 md:p-6'>
                <div className='flex w-full flex-row gap-4'>
                  <div className='w-full md:w-1/2'>
                    <PDFViewer pdf_url={paperData?.paper?.file_name} />
                  </div>
                  <div className='w-full md:w-1/2'>
                    <Card className='w-full'>
                      <CardContent className='p-1 md:px-3 md:py-6'>
                        <div className='h-[80vh]'>
                          <ScrollArea className='h-full w-full'>
                            <React.Fragment>
                              <h2 className='my-2 text-center text-2xl font-bold'>
                                Extraction Results
                              </h2>
                              <div className='flex h-full w-full flex-col gap-4'>
                                <ErrorContent content={paperData.paper.data} />
                              </div>
                            </React.Fragment>
                            <ScrollBar orientation='horizontal' />
                          </ScrollArea>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <div>
                  <ChatGPT paper_id={id} />
                </div>
                <Carousel id={id} />
              </CardContent>
            </Card>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
