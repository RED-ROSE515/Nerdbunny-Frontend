import React, { useState } from 'react';

import { Chip, Tooltip } from '@heroui/react';
import { FaMinus, FaPlus, FaUser } from 'react-icons/fa';

interface AuthorSectionProps {
  authors: string[];
}

const AuthorSection = ({ authors }: AuthorSectionProps) => {
  const [expand, setExpand] = useState(false);

  return (
    <div className='w-full'>
      <span className={`text-md w-full text-[#828489] dark:text-[#AAB5C7] md:w-auto md:text-lg`}>
        Authors:
      </span>
      <div className='mt-2 flex flex-wrap gap-2'>
        {authors?.map(
          (author: string, index: number) =>
            (index < 3 || expand) && (
              <Tooltip
                key={index}
                content={'(' + author.split('(')[1]}
                placement='bottom'
                className='max-w-[50vw]'
              >
                <Chip
                  variant='dot'
                  startContent={
                    <span className={`ml-1 rounded-full bg-[#FFF] dark:bg-[#2E3E4E]`}>
                      <FaUser color='#737E88' className='m-1' />
                    </span>
                  }
                  className={`cursor-pointer border-none bg-[#EAEAEA] hover:scale-105 hover:bg-gray-300 dark:bg-[#273340] dark:hover:bg-gray-600`}
                >
                  <span className='m-1'>{author.split('(')[0]}</span>
                </Chip>
              </Tooltip>
            )
        )}
        {authors?.length > 3 && (
          <Chip
            variant='bordered'
            endContent={expand ? <FaMinus className='mx-1' /> : <FaPlus className='mx-1' />}
            onClick={() => setExpand(!expand)}
            className={`cursor-pointer border-none bg-[#EAEAEA] font-semibold text-[#828489] hover:scale-105 hover:bg-gray-300 dark:bg-[#273340] dark:text-[#8696AF] dark:hover:bg-gray-600`}
          >
            <p className='font-semibold'>{`${expand ? 'Show Less ' : 'Load More '}`}</p>
          </Chip>
        )}
      </div>
    </div>
  );
};

export default AuthorSection;
