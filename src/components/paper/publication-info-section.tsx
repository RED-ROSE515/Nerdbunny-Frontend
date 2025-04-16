import React from 'react';

import { useTheme } from 'next-themes';
import { FaClock, FaGlobe } from 'react-icons/fa';

interface PublicationInfoSectionProps {
  date?: string;
  journal?: string;
}

const PublicationInfoSection = ({ date, journal }: PublicationInfoSectionProps) => {
  const { theme } = useTheme();

  return (
    <div>
      <span
        className={`text-md w-full md:w-auto md:text-lg ${theme === 'dark' ? 'text-[#AAB5C7]' : 'text-[#828489]'}`}
      >
        Publication Info:
      </span>
      <div className='mb:gap-10 mb-2 flex flex-wrap gap-2'>
        <div
          className={`flex flex-row items-center justify-center gap-1 ${theme === 'dark' ? `text-gray-100` : 'text-[#252629]'}`}
        >
          <span className={`${theme === 'dark' ? 'text-[#495D72]' : 'text-[#828489]'} mr-1`}>
            <FaClock />
          </span>
          <span>Date: </span>
          {date || 'Unknown'}
        </div>
        <div
          className={`mb:items-center ml-8 flex flex-row items-start justify-center gap-1 ${theme === 'dark' ? `text-gray-100` : 'text-[#252629]'}`}
        >
          <span className='flex flex-row items-center justify-center'>
            <span className={`${theme === 'dark' ? 'text-[#495D72]' : 'text-[#828489]'} mr-1`}>
              <FaGlobe />
            </span>
            <span>Source: </span>
          </span>
          <span>{journal || 'Unknown'}</span>
        </div>
      </div>
    </div>
  );
};

export default PublicationInfoSection;
