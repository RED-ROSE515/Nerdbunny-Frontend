'use client';

import Loader from '@/components/common/loader';
import PaperImagesTable from '@/components/paper/eddii/paper-list';
import { useAuth } from '@/contexts/AuthContext';
import useGetData from '@/lib/service/get-data';

export default function MyPapers() {
  const { isAuthenticated } = useAuth();
  const { data: paperData, isLoading: paperLoading } = useGetData('papers/eddii/get_eddii_list/');
  return (
    <div className='mt-2 flex w-full flex-row items-center justify-center md:mt-12'>
      {isAuthenticated ? (
        <div className='flex w-[75vw] flex-col justify-start gap-12'>
          <PaperImagesTable data={paperData?.papers} />
        </div>
      ) : (
        <div>
          <Loader />
        </div>
      )}
    </div>
  );
}
