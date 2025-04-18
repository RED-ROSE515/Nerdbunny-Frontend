'use client';

import React, { useState } from 'react';

import { Pagination } from '@heroui/react';

import Statistics from '@/components/home/statistics';
import PaperList from '@/components/paper/paper-list';
import SpeechBar from '@/components/speech/speech-bar';
import { useAuth } from '@/contexts/AuthContext';

export default function MyPapers() {
  const { isAuthenticated } = useAuth();
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  return (
    <div className='flex w-full flex-row items-center justify-center'>
      {isAuthenticated ? (
        <div className='flex flex-col justify-start gap-12'>
          <Statistics />
          <PaperList api={`papers/?page=${page}&pageSize=3`} setTotalPage={setTotalPage} />
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
        </div>
      ) : (
        <div>
          <h1>You need to sign in to continue.</h1>
        </div>
      )}
      <SpeechBar />
    </div>
  );
}
