'use client';

import React, { lazy, Suspense, useEffect, useState } from 'react';

import Loader from '@/components/common/loader';
import { useAuth } from '@/contexts/AuthContext';
import useGetData from '@/lib/service/get-data';

const ResearchPaperPoster = lazy(() => import('@/components/paper/paper-poster'));

export default function Papers() {
  const [page, setPage] = useState<number>(1);
  const [papers, setPapers] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const { isAuthenticated } = useAuth();
  const { data: paperData, isLoading: paperDataLoading } = useGetData<any>(
    `papers/?page=${page}&pageSize=3`
  );

  // Intersection Observer reference
  const observerTarget = React.useRef(null);

  useEffect(() => {
    if (paperData) {
      setPapers((prev) => [...prev, ...paperData.data]);
      setHasMore(page < paperData?.pagination?.totalPages);
    }
  }, [paperData]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry && firstEntry.isIntersecting && hasMore && !paperDataLoading) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasMore, paperDataLoading]);

  return (
    <div className='flex w-full flex-col items-center justify-center'>
      {isAuthenticated && papers.length > 0 ? (
        <>
          <div className='mt-2 flex w-full flex-wrap items-stretch justify-center md:mt-12 md:w-[95vw]'>
            {papers.map((paper: any) => (
              <div key={paper.id} className='flex w-full items-stretch md:w-1/3'>
                <Suspense
                  fallback={
                    <div className='flex w-full flex-row items-center justify-center'>
                      <Loader />
                    </div>
                  }
                >
                  <ResearchPaperPoster paper={paper?.metadata} paper_id={paper.id} />
                </Suspense>
              </div>
            ))}
          </div>
          {/* {hasMore && (
            <div ref={observerTarget} className='py-4'>
              <Loader />
            </div>
          )} */}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
