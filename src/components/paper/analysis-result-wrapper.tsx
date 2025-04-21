import React, { useState } from 'react';

import { Chip, Divider, Tab, Tabs } from '@heroui/react';
import { useTheme } from 'next-themes';

import { MagicCard } from '../magicui/magic-card';
import ErrorCard from './error-card';

const AnalysisResultWrapper = ({ results, total_summary }: any) => {
  const [currentTab, setCurrentTab] = useState(0);
  const { resolvedTheme } = useTheme();
  return (
    <div className='mb-8 flex w-full flex-col items-center justify-center'>
      <Tabs
        aria-label='Options'
        className='mt-4 w-full overflow-x-auto'
        style={{ maxWidth: '100vw' }}
        classNames={{
          tabList: 'gap-6 w-full relative rounded-none p-0 border-b ',
          cursor: 'w-full bg-[#C8E600]',
          tabContent: `group-data-[selected=true]:text-black dark:text-gray-200 text-black`
        }}
        selectedKey={String(currentTab)}
        variant='light'
        onSelectionChange={(key) => setCurrentTab(Number(key))}
      >
        <Tab
          key={0}
          title={
            <div className='flex items-center space-x-2'>
              <span>All</span>
              <Chip size='sm' variant='faded'>
                {total_summary.total_errors}
              </Chip>
            </div>
          }
        />
        {results.map((result: any, index: number) => {
          return (
            <Tab
              key={index + 1}
              title={
                <div className='text-md flex items-center space-x-2 font-bold'>
                  <span>{result.type}</span>
                  <Chip size='sm' variant='faded'>
                    {result.counts}
                  </Chip>
                </div>
              }
            />
          );
        })}
      </Tabs>
      <div className='flex w-full flex-col gap-4 rounded-lg md:flex-row'>
        <div className='w-full'>
          <MagicCard
            background={resolvedTheme === 'dark' ? 'bg-[#1E2A36]' : 'bg-[#F7F7F7]'}
            className={`md:shadow-x relative my-1 flex w-full cursor-pointer flex-col items-stretch justify-center overflow-hidden border-2 bg-background p-6 shadow-2xl sm:my-4`}
            gradientColor={resolvedTheme === 'dark' ? '#262626' : '#D9D9D955'}
          >
            {results.map((result: any, index: number) => (
              <div key={index}>
                {currentTab === 0 ? (
                  <div className='mb-2'>
                    <ErrorCard key={index} className='mb-2 sm:mb-4' error={result} />
                    {index < results.length - 1 && <Divider />}
                  </div>
                ) : (
                  currentTab - 1 === index && (
                    <ErrorCard key={index} className='mb-2 sm:mb-4' error={result} />
                  )
                )}
              </div>
            ))}
          </MagicCard>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResultWrapper;
