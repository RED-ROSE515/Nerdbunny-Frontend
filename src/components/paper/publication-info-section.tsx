import React from 'react';

import { FaClock, FaGlobe } from 'react-icons/fa';

interface PublicationInfoSectionProps {
  date?: string;
  journal?: string;
}

const PublicationInfoSection = ({ date, journal }: PublicationInfoSectionProps) => {
  return (
    <div>
      <span className={`text-md w-full text-[#828489] dark:text-[#AAB5C7] md:w-auto md:text-lg`}>
        Publication Info:
      </span>
      <div className='mb:gap-10 mb-2 flex flex-wrap gap-2'>
        <div
          className={`flex flex-row items-center justify-center gap-1 text-[#252629] dark:text-gray-100`}
        >
          <span className={`mr-1 text-[#828489] dark:text-[#495D72]`}>
            <FaClock />
          </span>
          <span>Date: </span>
          {date || 'Unknown'}
        </div>
        <div
          className={`mb:items-center ml-8 flex flex-row items-start justify-center gap-1 text-[#252629] dark:text-gray-100`}
        >
          <span className='flex flex-row items-center justify-center'>
            <span className={`mr-1 text-[#828489] dark:text-[#495D72]`}>
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
