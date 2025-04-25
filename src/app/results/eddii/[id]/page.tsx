'use client';

import React, { use } from 'react';

import Image from 'next/image';

import Loader from '@/components/common/loader';
import PDFViewer from '@/components/common/pdf-viewer';
import ErrorContent from '@/components/paper/error-content';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import useGetData from '@/lib/service/get-data';

export default function App({ params }: any) {
  const resolvedParams = use(params);
  const { id } = resolvedParams as any;
  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
  const { data: paperData, isLoading: paperLoading } = useGetData(`papers/${id}/get_paper_images`);

  return (
    <div>
      {!paperData ? (
        <Loader />
      ) : (
        <React.Fragment>
          <div className='my-8 flex w-full gap-8 md:max-w-[90vw]'>
            <Card>
              <CardHeader>
                <h1 className='mt-4 text-center text-3xl font-bold'>{paperData.paper.title}</h1>
              </CardHeader>
              <CardContent className='flex flex-row gap-4'>
                <div className='h-[80vh] w-1/2 overflow-hidden'>
                  <ScrollArea className='h-full w-full'>
                    <div className='flex h-full w-full flex-col gap-4'>
                      {paperData?.paper?.images?.map((image: any, index: number) => (
                        <Card key={index}>
                          <CardContent>
                            <div className='flex flex-col justify-start gap-4'>
                              <AspectRatio ratio={16 / 9} className='my-4 bg-muted'>
                                <Image
                                  src={image.path}
                                  alt='Photo by Drew Beamer'
                                  fill
                                  className='w-full rounded-md object-contain'
                                />
                              </AspectRatio>
                              <ErrorContent content={image.data} />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
                <div className='w-1/2'>
                  <PDFViewer pdf_url={paperData?.paper?.file_name} />
                </div>
              </CardContent>
            </Card>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
