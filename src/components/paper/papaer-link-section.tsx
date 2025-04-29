import React from 'react';

import { Chip, Tooltip } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { FaLink } from 'react-icons/fa';

interface PaperLinkSectionProps {
  paperLink?: string;
}

const PaperLinkSection = ({ paperLink }: PaperLinkSectionProps) => {
  const router = useRouter();

  return (
    <div className='w-full'>
      <span className={`text-md w-full text-[#828489] dark:text-[#AAB5C7] md:w-auto md:text-lg`}>
        Paper Link :
      </span>
      {paperLink ? (
        <div className='mt-2'>
          <Tooltip content={paperLink}>
            <Chip
              variant='dot'
              onClick={() => router.push(paperLink)}
              startContent={
                <span className={`ml-1 rounded-full bg-[#FFF] dark:bg-[#2E3E4E]`}>
                  <FaLink color='#737E88' className='m-1' />
                </span>
              }
              className={`min-w-[100px] max-w-full cursor-pointer truncate border-none bg-[#EAEAEA] hover:scale-105 hover:bg-gray-300 dark:bg-[#273340] dark:hover:bg-gray-600`}
            >
              <span className='m-1 w-full truncate'>{paperLink}</span>
            </Chip>
          </Tooltip>
        </div>
      ) : (
        <div className='mt-2'>
          <Chip
            variant='dot'
            startContent={
              <span className={`ml-1 rounded-full bg-[#FFF] dark:bg-[#2E3E4E]`}>
                <FaLink color='#737E88' className='m-1' />
              </span>
            }
            className={`cursor-pointer border-none bg-[#EAEAEA] hover:scale-105 hover:bg-gray-300 dark:bg-[#273340] dark:hover:bg-gray-600`}
          >
            <span className='m-1'>{`Unknown`}</span>
          </Chip>
        </div>
      )}
    </div>
  );
};

export default PaperLinkSection;
