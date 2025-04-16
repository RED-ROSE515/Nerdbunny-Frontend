import type React from 'react';

export default function SamplePageLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div className='my-12 w-full'>{children}</div>
    </section>
  );
}
