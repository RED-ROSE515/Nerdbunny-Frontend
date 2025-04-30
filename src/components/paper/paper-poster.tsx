'use client';

import React, { useTransition } from 'react';

import _ from 'lodash';
import { Download, ExternalLink, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import Marquee from '../common/marquee';
import AuthorSection from './author-section';
import KeywordsSection from './keywords-section';
import PaperLinkSection from './papaer-link-section';

export default function ResearchPaperPoster({ paper, paper_id }: any) {
  const router = useRouter();
  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
  const [pending, startTransition] = useTransition();
  return (
    <div className='flex w-[100vw] max-w-4xl items-stretch p-4 md:mx-auto md:w-full'>
      <Card className='flex items-stretch overflow-hidden border-2'>
        {/* Poster Image */}
        {/* <div className='relative aspect-[4/3] w-full'>
            <Image
              src='/placeholder.svg?height=900&width=1200'
              alt='Research paper poster'
              fill
              className='object-cover'
              priority
            />
          </div> */}

        {/* Marquee Title */}
        {/* <div className='relative overflow-hidden bg-primary py-3 text-primary-foreground'>
            <Marquee>
              <span className='whitespace-nowrap text-xl font-bold'>{paper.title}</span>
            </Marquee>
          </div> */}

        {/* Paper Details */}
        <div className='flex h-auto flex-col items-stretch justify-between space-y-4 p-6'>
          <div>
            <h2 className='mb-4 text-xl font-bold text-slate-700 dark:text-slate-200'>
              {paper.title}
            </h2>
            <AuthorSection authors={paper.authors} />
          </div>

          <div>
            <h3 className='text-md w-full text-[#828489] dark:text-[#AAB5C7] md:w-auto md:text-lg'>
              Abstract
            </h3>
            <div>
              <p className='text-sm font-semibold text-slate-700 dark:text-slate-200'>
                {_.truncate(paper.abstract, { length: 400, omission: '...' })}
              </p>
            </div>
          </div>

          <KeywordsSection keywords={paper.keywords} />
          <PaperLinkSection paperLink={paper.paper_link} />

          <div className='flex items-center justify-end border-t pt-4'>
            <div className='flex gap-2'>
              <Button size='sm' variant='outline'>
                <Download className='mr-2 h-4 w-4' />
                Download PDF
              </Button>
              <Button
                size='sm'
                onClick={() =>
                  startTransition(() => {
                    router.push(DOMAIN + '/results/papers/' + paper_id);
                  })
                }
              >
                {pending ? (
                  <>
                    <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                    Please wait
                  </>
                ) : (
                  <>
                    <ExternalLink className='mr-2 h-4 w-4' />
                    View Full Paper Result
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
