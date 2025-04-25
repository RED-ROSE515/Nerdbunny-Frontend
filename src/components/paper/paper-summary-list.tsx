'use client';

import React, { useEffect, useState } from 'react';

import { Pagination } from '@heroui/react';

import { useSearch } from '@/contexts/SearchContext';
import useGetData from '@/lib/service/get-data';

import SignInDialog from '../auth/signin-dialog';
import Loader from '../common/loader';
import { useToast } from '../hooks/use-toast';
import SummaryWrapper from './summary-wrapper';

export default function PaperSummaryList({
  api,
  showPagination
}: {
  api: string;
  showPagination: boolean;
}) {
  const { sortBy } = useSearch();
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [showSignIn, setShowSignIn] = useState(false);
  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
  const { toast } = useToast();

  const { data: paperData, isLoading: paperDataLoading } = useGetData<any>(
    (showPagination ? api + `?page=${page}&pageSize=3` : api) + (sortBy ? `&sortBy=${sortBy}` : '')
  );
  const { mutate: mutateGetPapers } = useGetData<any>(
    (showPagination ? api + `?page=${page}&pageSize=3` : api) + (sortBy ? `&sortBy=${sortBy}` : '')
  );

  function showSignInModal(action: string) {
    toast({
      title: 'Info',
      description: action
    });
    setShowSignIn(true);
  }

  useEffect(() => {
    if (paperData) {
      setTotalPage(paperData?.pagination?.totalPages);
    }
  }, [paperData]);

  useEffect(() => {
    async function getPapers() {
      await mutateGetPapers();
    }
    getPapers();
  }, [api]);
  return (
    <>
      <SignInDialog isOpen={showSignIn} onClose={() => setShowSignIn(false)} />
      {paperDataLoading ? (
        <div className='flex w-full flex-row items-center justify-center'>
          <Loader />
        </div>
      ) : (
        <div className='flex w-full flex-col gap-4 md:w-[1100px]'>
          {paperData?.data.map((paperItem: any) => {
            return (
              <div className='flex w-full flex-col gap-4' key={paperItem.id}>
                <SummaryWrapper
                  summary={paperItem.paperSummary}
                  reportPost={() => alert(`report ${paperItem.id}`)}
                  totalData={paperItem}
                  postDate={paperItem.post_date}
                  speechData={paperItem.paperSpeeches}
                  showSignInModal={showSignInModal}
                  link={
                    DOMAIN +
                    '/results/' +
                    (paperItem.post_type === 6 ? 'articles' : 'discrepancies') +
                    '/' +
                    paperItem.id
                  }
                  userData={paperItem.paper_owner}
                />
              </div>
            );
          })}
          {showPagination && (
            <div className='flex flex-row items-center justify-center pb-4'>
              <Pagination
                isCompact
                showControls
                showShadow
                initialPage={1}
                page={page}
                total={totalPage}
                onChange={(newPage) => setPage(newPage)}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}
