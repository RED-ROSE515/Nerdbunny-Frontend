'use client';

import React, { useEffect, useState } from 'react';

import useGetData from '@/lib/service/get-data';

import SignInDialog from '../auth/signin-dialog';
import Loader from '../common/loader';
import { useToast } from '../hooks/use-toast';
import SummaryWrapper from './summary-wrapper';

export default function PaperList({
  api,
  setTotalPage
}: {
  api: string;
  setTotalPage: (page: number) => void;
}) {
  const { data: paperData, isLoading: paperDataLoading } = useGetData<any>(api);
  const { mutate: mutateGetPapers } = useGetData<any>(api);
  const [showSignIn, setShowSignIn] = useState(false);
  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
  const { toast } = useToast();

  function showSignInModal(action: string) {
    toast({
      title: 'Info',
      description: action
    });
    setShowSignIn(true);
  }

  useEffect(() => {
    if (paperData) {
      setTotalPage(paperData.pagination.totalPages);
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
          {paperData.data.map((paperItem: any) => {
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
                    (paperItem.post_type === 6 ? 'discrepancies' : 'articles') +
                    '/' +
                    paperItem.id
                  }
                  userData={paperItem.paper_owner}
                />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
