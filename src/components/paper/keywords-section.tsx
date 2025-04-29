import React, { useState } from 'react';

import { Chip } from '@heroui/react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { SiSharp } from 'react-icons/si';

import { useSearch } from '@/contexts/SearchContext';

interface KeywordsSectionProps {
  keywords?: string[];
}

const KeywordsSection = ({ keywords }: KeywordsSectionProps) => {
  const { keyword, setKeyword, setSortBy } = useSearch();
  const [keywordExpand, setKeywordExpand] = useState(false);

  return (
    <div className={`w-full text-slate-600 dark:text-gray-100`}>
      <div className='flex flex-col justify-start gap-2'>
        <span className={`text-md w-full text-[#828489] dark:text-[#AAB5C7] md:w-auto md:text-lg`}>
          Keywords:
        </span>
        <div className='flex flex-wrap justify-start gap-2'>
          {keywords
            ? keywords.map(
                (label: string, index: number) =>
                  (index < 2 || keywordExpand) && (
                    <Chip
                      variant='dot'
                      key={index}
                      onClick={() => {
                        setKeyword(label === keyword ? '' : label);
                        setSortBy('');
                      }}
                      startContent={<SiSharp className='ml-1' />}
                      className={`cursor-pointer bg-[#FFF] hover:scale-105 hover:bg-gray-300 dark:bg-[#2E3E4E] dark:hover:bg-gray-600 ${label === keyword ? `bg-[#EE43DE] text-white dark:bg-[#C8E600] dark:text-black` : ''}`}
                    >
                      {label}
                    </Chip>
                  )
              )
            : 'Unknown'}
          {keywords && keywords.length > 3 && (
            <Chip
              variant='bordered'
              endContent={
                keywordExpand ? <FaMinus className='mx-1' /> : <FaPlus className='mx-1' />
              }
              onClick={() => setKeywordExpand(!keywordExpand)}
              className={`cursor-pointer border-none bg-[#EAEAEA] font-semibold text-[#828489] hover:scale-105 hover:bg-gray-300 dark:bg-[#273340] dark:text-[#8696AF] dark:hover:bg-gray-600`}
            >
              <p className='font-semibold'>{`${keywordExpand ? 'Show Less ' : 'Load More '}`}</p>
            </Chip>
          )}
        </div>
      </div>
    </div>
  );
};

export default KeywordsSection;
