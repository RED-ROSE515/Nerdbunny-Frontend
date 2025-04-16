import React from 'react';

import { Chip, Tooltip } from '@heroui/react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { FaLink } from 'react-icons/fa';

interface PaperLinkSectionProps {
  paperLink?: string;
}

const PaperLinkSection = ({ paperLink }: PaperLinkSectionProps) => {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <div className='w-full md:w-1/3'>
      <span
        className={`text-md w-full md:w-auto md:text-lg ${theme === 'dark' ? 'text-[#AAB5C7]' : 'text-[#828489]'}`}
      >
        Paper Link :
      </span>
      {paperLink ? (
        <div className='mt-2'>
          <Tooltip content={paperLink}>
            <Chip
              variant='dot'
              onClick={() => router.push(paperLink)}
              startContent={
                <span
                  className={`${theme === 'dark' ? 'bg-[#2E3E4E]' : 'bg-[#FFF]'} ml-1 rounded-full`}
                >
                  <FaLink color='#737E88' className='m-1' />
                </span>
              }
              className={`min-w-[100px] max-w-full cursor-pointer truncate border-none bg-[#273340] hover:scale-105 ${theme === 'dark' ? 'bg-[#273340] hover:bg-gray-600' : 'bg-[#EAEAEA] hover:bg-gray-300'}`}
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
              <span
                className={`${theme === 'dark' ? 'bg-[#2E3E4E]' : 'bg-[#FFF]'} ml-1 rounded-full`}
              >
                <FaLink color='#737E88' className='m-1' />
              </span>
            }
            className={`cursor-pointer border-none bg-[#273340] hover:scale-105 ${theme === 'dark' ? 'bg-[#273340] hover:bg-gray-600' : 'bg-[#EAEAEA] hover:bg-gray-300'}`}
          >
            <span className='m-1'>{`Unknown`}</span>
          </Chip>
        </div>
      )}
    </div>
  );
};

export default PaperLinkSection;
