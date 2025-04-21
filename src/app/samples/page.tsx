'use client';

import PaperList from '@/components/paper/paper-list';

export default function ExamplePapers() {
  return (
    <div className='flex w-full flex-row items-center justify-center'>
      <PaperList api={'papers/example_papers/'} showPagination={false} />
    </div>
  );
}
