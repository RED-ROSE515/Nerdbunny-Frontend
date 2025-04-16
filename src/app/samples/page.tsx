'use client';

import Loader from '@/components/common/loader';
import SummaryWrapper from '@/components/paper/summary-wrapper';
import useGetData from '@/lib/service/get-data';

export default function ExamplePapers() {
  const { data: paperData, isLoading: paperDataLoading } =
    useGetData<any>(`papers/example_papers/`);
  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
  return (
    <div className='flex w-full flex-row items-center justify-center'>
      {paperDataLoading ? (
        <Loader />
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
    </div>
  );
}
