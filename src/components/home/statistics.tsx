'use client';

import React, { useEffect, useState } from 'react';

import { Card, CardBody, Chip } from '@heroui/react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { useSearch } from '@/contexts/SearchContext';
import useGetData from '@/lib/service/get-data';

import Loader from '../common/loader';

interface ErrorStatistics {
  mathErrors: number;
  methodologyErrors: number;
  logicalFrameworkErrors: number;
  dataAnalysisErrors: number;
  technicalPresentationErrors: number;
  researchQualityErrors: number;
  totalErrors: number;
}

interface Statistics {
  totalPapers: number;
  totalAnalyses: number;
  errorStatistics: ErrorStatistics;
}

const Statistics = () => {
  const { sortBy, setSortBy, setKeyword } = useSearch();
  const { data: statistics, isLoading: statisticsLoading } = useGetData<any>(`papers/statistics/`);
  const [cards, setCards] = useState<any>();

  useEffect(() => {
    if (statistics) {
      const statisticsData = statistics.data;

      setCards([
        {
          title: 'Total',
          sort: 'total_errors',
          type: '',
          // back: "from-[#fbed96] to-[#abecd6]",
          back: 'hover:bg-[#338EF7] ',
          whiteback: 'hover:bg-[#001731] ',
          counts: statisticsData?.errorStatistics?.totalErrors
        },
        {
          title: 'Math',
          type: 'MathError',
          sort: 'math_errors',
          // back: "from-[#acb6e5] to-[#86fde8]",
          whiteback: 'hover:bg-[#095028] ',
          back: 'hover:bg-[#AE7EDE]',
          counts: statisticsData?.errorStatistics?.mathErrors
        },
        {
          title: 'Methodology',
          type: 'MethodologyError',
          sort: 'methodology_errors',
          // back: "from-[#5433FF] via-[#20BDFF] to-[#A5FECB]",
          whiteback: 'hover:bg-[#610726] ',
          back: 'hover:bg-[#45D483]',
          counts: statisticsData?.errorStatistics?.methodologyErrors
        },
        {
          title: 'Logical',
          type: 'LogicalFrameworkError',
          sort: 'logical_framework_errors',
          // back: "from-[#EFEFBB] to-[#D4D3DD]",
          whiteback: 'hover:bg-[#661F52] ',
          back: 'hover:bg-[#F54180]',
          counts: statisticsData?.errorStatistics?.dataAnalysisErrors
        },
        {
          title: 'Data',
          sort: 'data_analysis_errors',
          type: 'DataAnalysisError',
          // back: "from-[#FDFC47] to-[#24FE41]",
          whiteback: 'hover:bg-[#001731] ',
          back: 'hover:bg-[#661F52]',
          counts: statisticsData?.errorStatistics?.dataAnalysisErrors
        },
        {
          title: 'Technical',
          sort: 'technical_presentation_errors',
          type: 'TechnicalPresentationError',
          // back: "from-[#BA5370] to-[#F4E2D8]",
          whiteback: 'hover:bg-[#62420E] ',
          back: 'hover:bg-[#F5A524]',
          counts: statisticsData?.errorStatistics?.technicalPresentationErrors
        },
        {
          title: 'Research',
          sort: 'research_quality_errors',
          type: 'ResearchQualityError',
          // back: "from-[#0099F7] to-[#F11712]",
          back: 'hover:bg-[#7EE7FC]',
          whiteback: 'hover:bg-[#0E8AAA]',
          counts: statisticsData?.errorStatistics?.researchQualityErrors
        }
      ]);
    }
  }, [statistics]);
  return (
    <React.Fragment>
      <div className='flex flex-col items-center justify-center'>
        {statisticsLoading ? (
          <Loader />
        ) : (
          <Carousel
            opts={{
              align: 'start'
            }}
            className='w-full max-w-[50vw] md:max-w-[65vw]'
          >
            <CarouselContent>
              {cards &&
                cards.map((card: any, index: number) => (
                  <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/3 xl:basis-1/4'>
                    <Card
                      key={index + 1}
                      isHoverable
                      isPressable
                      radius='lg'
                      // onPress={() => {
                      //   setSortBy(card.type || '');
                      //   setKeyword('');
                      // }}
                      className={`w-full rounded-full`}
                    >
                      <CardBody
                        className={`w-full rounded-full dark:bg-slate-700 dark:${card.whiteback} bg-gray-200 ${card.back} ${card.type === sortBy ? `rounded-full border-2 border-[#24016A] dark:border-[#C8E600]` : ``}`}
                      >
                        <div className='md:text-md flex flex-row items-center justify-center gap-2 text-sm'>
                          <span className='text-lg font-semibold md:text-lg'>{card.title}</span>
                          <Chip size='md' variant='faded'>
                            <span className='text-medium font-semibold md:text-lg'>
                              {card.counts}
                            </span>
                          </Chip>
                        </div>
                      </CardBody>
                    </Card>
                  </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      </div>
    </React.Fragment>
  );
};

export default Statistics;
