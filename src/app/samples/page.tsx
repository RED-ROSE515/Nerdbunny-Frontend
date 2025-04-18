'use client';

import PaperList from '@/components/paper/paper-list';

export default function ExamplePapers() {
  return <PaperList api={'papers/example_papers/'} setTotalPage={() => {}} />;
}
