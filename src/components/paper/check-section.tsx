import React from 'react';

import { GiArchiveResearch } from 'react-icons/gi';
import { MdPlagiarism } from 'react-icons/md';

import { useAnalyze } from '@/contexts/AnalyzeContext';
import { useSearch } from '@/contexts/SearchContext';

import { Card, CardContent, CardHeader } from '../ui/card';
import PaperInputWrapper from './paper-input-wrapper';

const CheckSection = () => {
  const { setProcessType, processType } = useAnalyze();
  const { getTotalResults } = useSearch();
  const tabs = [
    {
      id: 'ResearchCheck',
      label: 'Analyse Manuscript',
      icon: <GiArchiveResearch className={`h-8 w-8 text-pink-500 dark:text-white`} />,
      title: 'Research & Analytics',
      content:
        'Our AI agent analyzes the research paper and provides a report with the percentage of errors and discrepancies.',
      image: '/placeholder.svg?height=200&width=200'
    }
    // {
    //   id: "GenerateArticle",
    //   label: "Summarise Manuscript",
    //   icon: (
    //     <GrArticle
    //       className={`h-8 w-8 ${theme === "dark" ? "text-white" : "text-slate-400"}`}
    //     />
    //   ),
    //   title: "Summary and Articles",
    //   content:
    //     "Our AI agent creates summaries and articles from academic papers, making complex research accessible to everyone.",
    //   image: "/placeholder.svg?height=200&width=200",
    // },
    // {
    //   id: 'PlagiarismCheck',
    //   label: 'Plagiarism Check',
    //   icon: <MdPlagiarism className={`h-8 w-8 text-slate-400 dark:text-white`} />,
    //   title: 'Plagiarism Check',
    //   content:
    //     'We check for plagiarism in the research paper and provide a report with the percentage of plagiarism.',
    //   image: '/placeholder.svg?height=200&width=200'
    // }
  ];

  return (
    <Card className='z-10 mx-auto w-full overflow-hidden rounded-xl bg-wrapper shadow-2xl'>
      <CardHeader>
        <div className='border-b-2 p-6'>
          <h2 className={`text-center text-2xl font-bold text-muted-foreground`}>
            Analyze a Research Paper
          </h2>
          <p className='my-2 text-sm font-semibold'>
            Submit research papers that matter to you—whether they’re trending in your field,
            influencing public conversations, or raising important questions.NerdBunny helps uncover
            inconsistencies, flawed reasoning, or methodological issues and publishes the results
            for open community review.
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div
          className={`grid grid-cols-1 border-b border-gray-100 dark:border-[#090E16] dark:bg-slate-800`}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setProcessType(tab.id);
                // if (tab.id !== 'PlagiarismCheck') getTotalResults(tab.id);
              }}
              className={`z-10 flex flex-col items-center justify-center p-4 transition-colors ${
                processType === tab.id
                  ? `border-b-3 border-pink-500 bg-white dark:border-[#C8E600] dark:bg-transparent`
                  : `bg-gray-50 hover:bg-gray-100 dark:bg-[#090E16] dark:hover:bg-gray-700`
              }`}
            >
              <div className='mb-2'>
                {React.cloneElement(tab.icon, {
                  className: `h-8 w-8 ${processType === tab.id ? 'dark:text-[#C8E600] text-pink-500' : 'text-slate-400'}`
                })}
              </div>
              <span
                className={`text-sm ${processType === tab.id ? 'text-pink-500 dark:text-[#C8E600]' : 'text-slate-400'}`}
              >
                {tab.label}
              </span>
            </button>
          ))}
        </div>
        {/* Content */}
        {(processType === 'ResearchCheck' || processType === 'GenerateArticle') && (
          <div className={`p-8`}>
            <div className='flex w-full flex-col items-center gap-8 md:flex-row'>
              <PaperInputWrapper getPdfList={() => {}} />
            </div>
          </div>
        )}
        {processType === 'PlagiarismCheck' && (
          <div className={`p-8`}>
            <div className='flex w-full flex-col items-center justify-center gap-8 md:flex-row'>
              <p className='p-16 text-center text-2xl font-bold'>Comming Soon...</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CheckSection;
