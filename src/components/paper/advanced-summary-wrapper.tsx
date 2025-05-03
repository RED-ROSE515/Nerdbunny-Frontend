import { Card } from '@heroui/react';
import { useTheme } from 'next-themes';
import { FaCheck, FaCheckCircle } from 'react-icons/fa';

const AdvancedSummaryWrapper = ({ summary }: any) => {
  const { theme } = useTheme();

  return (
    <div className='w-full p-0'>
      <Card
        // borderWidth={3}
        className={`relative flex w-full flex-col items-start justify-start overflow-hidden rounded-lg border p-6 md:shadow-xl ${theme === 'dark' ? 'bg-[#1E2A36]' : 'bg-[#F7F7F7]'} `}
        // color={["#36FF78", "#A07CFE", "#FE8FB5", "#FFBE7B", "#FFEC99"]}
      >
        <span
          className={`text-xl sm:text-2xl ${theme === 'dark' ? `text-white` : 'text-slate-800'} mb-2`}
        >
          Major Concerns
        </span>
        {summary.major_concerns?.map((concern: string, index: number) => (
          <div
            key={index}
            className={`flex flex-row items-start justify-start gap-2 text-sm sm:text-medium ${theme === 'dark' ? `text-[#AAB5C7]` : 'text-slate-700'}`}
          >
            <div className='mt-1'>
              <FaCheckCircle
                size={16}
                className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}
              />
            </div>
            <p>{concern}</p>
          </div>
        ))}

        <span
          className={`mb-2 mt-4 text-xl sm:text-2xl ${theme === 'dark' ? `text-gray-100` : 'text-slate-800'}`}
        >
          Improvement Priority
        </span>
        {summary.improvement_priority?.map((priority: string, index: number) => (
          <div
            key={index}
            className={`flex flex-row items-start justify-start gap-2 text-sm font-semibold sm:text-medium ${theme === 'dark' ? `text-[#AAB5C7]` : 'text-slate-700'}`}
          >
            <div className='mt-1'>
              <FaCheckCircle
                size={16}
                className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}
              />
            </div>
            <p>{priority}</p>
          </div>
        ))}

        <span
          className={`mt-4 text-xl sm:text-2xl ${theme === 'dark' ? `text-gray-100` : 'text-slate-800'}`}
        >
          Overall Assessment
        </span>
        <p
          className={`text-sm font-semibold sm:text-medium ${theme === 'dark' ? `text-gray-400` : 'text-slate-700'}`}
        >
          {summary?.overall_assessment}
        </p>

        <span
          className={`mt-4 w-full rounded-sm p-2 text-xl sm:text-2xl md:px-8 ${theme === 'dark' ? `bg-[#613CB1] text-gray-100` : 'bg-gray-200 text-slate-800'}`}
        >
          Total Quality Score : {summary?.quality_score} out of 10.
        </span>
      </Card>
    </div>
  );
};

export default AdvancedSummaryWrapper;
