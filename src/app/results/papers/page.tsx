'use client';

import React, { useEffect, useState } from 'react';

import { Pagination } from '@heroui/react';

import Loader from '@/components/common/loader';
import ResearchPaperPoster from '@/components/paper/paper-poster';
import useGetData from '@/lib/service/get-data';

export default function Papers() {
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

  const { data: paperData, isLoading: paperDataLoading } = useGetData<any>(
    `papers/?page=${page}&pageSize=3`
  );

  useEffect(() => {
    if (paperData) {
      setTotalPage(paperData?.pagination?.totalPages);
    }
  }, [paperData]);

  return (
    <div className='flex w-full flex-col items-center justify-center'>
      {paperData ? (
        <>
          <div className='mt-2 flex w-[95vw] flex-wrap items-stretch justify-center md:mt-12'>
            {paperData?.data.map((paper: any) => {
              return (
                <div key={paper.id} className='flex w-1/3 items-stretch'>
                  <ResearchPaperPoster paper={paper?.metadata} paper_id={paper.id} />
                </div>
              );
            })}
          </div>
          <div className='flex flex-row items-center justify-center pb-4'>
            <Pagination
              isCompact
              showControls
              showShadow
              initialPage={1}
              page={page}
              total={totalPage}
              onChange={(newPage: number) => setPage(newPage)}
            />
          </div>
        </>
      ) : (
        <>
          <Loader />
        </>
      )}
    </div>
  );
}
