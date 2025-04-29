'use client';

import React, { use } from 'react';

import {
  Cloud,
  Cross,
  FileChartColumn,
  Flower,
  Heart,
  Moon,
  Newspaper,
  OctagonX,
  Rainbow,
  Snowflake,
  Star,
  Sun,
  Umbrella,
  Wind,
  Zap
} from 'lucide-react';
import { useRouter } from 'next/navigation';

import Loader from '@/components/common/loader';
import PDFViewer from '@/components/common/pdf-viewer';
import AuthorSection from '@/components/paper/author-section';
import { Carousel } from '@/components/paper/carousel/carousel';
import ErrorContent from '@/components/paper/error-content';
import PaperLinkSection from '@/components/paper/papaer-link-section';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import useGetData from '@/lib/service/get-data';

export default function App({ params }: any) {
  const resolvedParams = use(params);
  const { id } = resolvedParams as any;
  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
  const { data: paperData, isLoading: paperLoading } = useGetData(`papers/${id}/`);
  const router = useRouter();
  const items = [
    {
      Icon: OctagonX,
      title: 'Discrepancies',
      isDisabled: !(
        paperData?.has_analysis &&
        paperData?.has_summary &&
        paperData?.has_error_summary
      ),
      description: 'Error Detection Results',
      action: () => router.push(DOMAIN + '/results/discrepancies/' + id)
    },
    {
      Icon: Newspaper,
      title: 'Article',
      isDisabled: !paperData?.has_article,
      description: 'Article Generation Results',
      action: () => router.push(DOMAIN + '/results/articles/' + id)
    },
    {
      Icon: FileChartColumn,
      title: 'EDDII',
      isDisabled: !paperData?.has_images,
      description: 'Data Extraction Feature EDDII',
      action: () => router.push(DOMAIN + '/results/eddii/' + id)
    }
  ];
  return (
    <div>
      {!paperData ? (
        <Loader />
      ) : (
        <React.Fragment>
          <div className='my-8 flex w-full max-w-[100vw] items-center justify-center gap-8 md:max-w-[90vw]'>
            <Card className='w-full'>
              <CardHeader>
                <h1 className='mt-4 text-center text-lg font-bold md:text-3xl'>
                  {paperData.metadata.title}
                </h1>
              </CardHeader>
              <CardContent className='flex flex-col gap-4 p-1 md:p-6'>
                <div className='flex w-full flex-col items-start justify-center gap-10 md:flex-row md:p-2'>
                  <div className='w-full md:w-2/3'>
                    <AuthorSection authors={paperData.metadata.authors} />
                  </div>
                  <div className='w-full md:w-1/3'>
                    <PaperLinkSection paperLink={paperData.metadata.paper_link} />
                  </div>
                </div>
                <div className='rounded-lg border border-border/20 bg-gradient-to-b from-background/80 to-background/40 p-2 shadow-xl backdrop-blur-lg'>
                  <h2 className='text-md w-full text-[#828489] dark:text-[#AAB5C7] md:mb-2 md:w-auto md:text-xl'>
                    Abstract :
                  </h2>
                  <span>{paperData.metadata.abstract}</span>
                </div>
                <div className='flex w-full flex-row items-center justify-center'>
                  <Carousel items={items} />
                </div>
              </CardContent>
            </Card>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
