'use client';

import PaperSummaryList from '@/components/paper/paper-summary-list';

export default function ExamplePapers() {
  return (
    <div className='flex w-full flex-row items-center justify-center'>
      <PaperSummaryList api={'papers/example_papers/'} showPagination={false} />
    </div>
  );
}
