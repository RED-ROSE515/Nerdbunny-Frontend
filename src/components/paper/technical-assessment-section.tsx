import React from 'react';

import { Chip } from '@heroui/react';
import { useTheme } from 'next-themes';

interface TechnicalAssessmentSectionProps {
  technicalAssessment: any;
}

const getColorForScore = (score: number) => {
  switch (true) {
    case score >= 9:
      return '#2E7D32'; // Dark green
    case score >= 8:
      return '#4CAF50'; // Green
    case score >= 7:
      return '#8BC34A'; // Light green
    case score >= 6:
      return '#673AB7'; // Deep purple
    case score >= 5:
      return '#9C27B0'; // Purple
    case score >= 4:
      return '#FF9800'; // Orange
    case score >= 3:
      return '#FF5722'; // Deep orange
    case score >= 2:
      return '#F44336'; // Red
    default:
      return '#D32F2F'; // Dark red
  }
};

// Custom capitalize function to replace mui/material dependency
const capitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const TechnicalAssessmentSection = ({ technicalAssessment }: TechnicalAssessmentSectionProps) => {
  const { theme } = useTheme();

  if (!technicalAssessment) return null;

  return (
    <div>
      <span className={`text-md w-full text-[#828489] dark:text-[#AAB5C7] md:w-auto md:text-lg`}>
        Technical Assessment:
      </span>
      <div className='mt-2 flex flex-wrap gap-2'>
        {Object.entries(technicalAssessment).map(([key, value]: any) => (
          <Chip
            key={key}
            className='sm:text-md text-sm font-bold text-slate-400'
            style={{
              backgroundColor: getColorForScore(value),
              color: 'white'
            }}
            variant='shadow'
          >
            {`${capitalize(key).replace('_', ' ')}: ${value}`}
          </Chip>
        ))}
      </div>
    </div>
  );
};

export default TechnicalAssessmentSection;
