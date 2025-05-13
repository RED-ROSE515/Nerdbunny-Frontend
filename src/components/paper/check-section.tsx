'use client';

import React, { useEffect, useRef, useState } from 'react';

import { Spinner } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { GiArchiveResearch } from 'react-icons/gi';
import { GrArticle } from 'react-icons/gr';
import { MdPlagiarism } from 'react-icons/md';
import { RiBarChartBoxAiFill } from 'react-icons/ri';

import SignInDialog from '@/components/auth/signin-dialog';
import Loader from '@/components/common/loader';
import AnalysisResultWrapper from '@/components/paper/analysis-result-wrapper';
import PaperInputWrapper from '@/components/paper/paper-input-wrapper';
import SummaryWrapper from '@/components/paper/summary-wrapper';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useAnalyze } from '@/contexts/AnalyzeContext';
import { useAuth } from '@/contexts/AuthContext';

import { Separator } from '../ui/separator';

interface Tab {
  id: string;
  label: string;
  icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  title: string;
  content: string;
  showInMobile: boolean;
}

interface TabButtonProps {
  tab: Tab;
  currentTab: string;
  onClick: () => void;
}

const tabs: Tab[] = [
  {
    id: 'ResearchCheck',
    label: 'Analyse Manuscript',
    icon: <GiArchiveResearch />,
    title: 'Research & Analytics',
    content:
      'Uncover insights in your research paper. Our tool examines structure, methodology, and findings, identifying inconsistencies and issues to refine your work.',
    showInMobile: true
  },
  {
    id: 'GenerateArticle',
    label: 'Summarise Manuscript',
    icon: <GrArticle />,
    title: 'Summary and Articles',
    content:
      "Quickly grasp any research paper's essence. Get a concise summary of objectives, results, and conclusions in seconds.",
    showInMobile: false
  },
  {
    id: 'ExtractFigures',
    label: 'EDDII',
    icon: <RiBarChartBoxAiFill />,
    title: 'Extract Figures',
    content:
      'Interact with your research paper using EDDII. Ask questions, reveal insights, and engage dynamically to spark ideas.',
    showInMobile: true
  },
  {
    id: 'PlagiarismCheck',
    label: 'Plagiarism Check',
    icon: <MdPlagiarism />,
    title: 'Plagiarism Check',
    content:
      'We check for plagiarism in the research paper and provide a report with the percentage of plagiarism.',
    showInMobile: false
  }
];

const mobile_tabs = tabs.filter((tab) => tab.showInMobile);

const TabButton: React.FC<TabButtonProps> = ({ tab, currentTab, onClick }) => (
  <button
    onClick={onClick}
    className={`z-10 flex flex-col items-center justify-center p-4 transition-colors ${
      currentTab === tab.id
        ? `border-b-3 border-pink-500 bg-white dark:border-[#C8E600] dark:bg-transparent`
        : `bg-gray-50 hover:bg-gray-100 dark:bg-[#090E16] dark:hover:bg-gray-700`
    }`}
  >
    <div className='mb-2'>
      {React.cloneElement(tab.icon, {
        className: `h-8 w-8 ${currentTab === tab.id ? 'dark:text-[#C8E600] text-pink-500' : 'text-slate-400'}`
      })}
    </div>
    <span
      className={`text-sm ${currentTab === tab.id ? 'text-pink-500 dark:text-[#C8E600]' : 'text-slate-400'}`}
    >
      {tab.label}
    </span>
  </button>
);

const CheckSection = () => {
  const {
    isChecking,
    paperOwner,
    postId,
    processType,
    setProcessType,
    summary,
    analysisResult,
    totalSummary
  } = useAnalyze();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [showSignIn, setShowSignIn] = useState(false);
  const [currentTab, setCurrentTab] = useState<string>('ResearchCheck');

  return (
    <Card className='z-10 mx-auto mb-4 w-full overflow-hidden rounded-xl bg-wrapper shadow-2xl'>
      <CardHeader>
        <div className='border-b-2 p-6'>
          <h2 className={`text-center text-2xl font-bold text-muted-foreground`}>
            Analyze a Research Paper
          </h2>
        </div>
      </CardHeader>
      <CardContent>
        <div
          className={`hidden grid-cols-2 border-b border-gray-100 dark:border-[#090E16] dark:bg-slate-800 md:grid md:grid-cols-4`}
        >
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              tab={tab}
              currentTab={currentTab}
              onClick={() => {
                setCurrentTab(tab.id);
                setProcessType(tab.id);
              }}
            />
          ))}
        </div>
        <div
          className={`grid grid-cols-2 border-b border-gray-100 dark:border-[#090E16] dark:bg-slate-800 md:hidden`}
        >
          {mobile_tabs.map((tab) => (
            <TabButton
              key={tab.id}
              tab={tab}
              currentTab={currentTab}
              onClick={() => {
                setCurrentTab(tab.id);
                setProcessType(tab.id);
              }}
            />
          ))}
        </div>
        <div className='mt-4 text-center text-muted-foreground'>
          {tabs.find((tab) => tab.id === currentTab)?.content}
        </div>
        <Separator className='my-2' />
        {/* Content */}
        {currentTab && (
          <div className={`p-8`}>
            <div className='flex w-full flex-col items-center gap-8 md:flex-row'>
              <PaperInputWrapper getPdfList={() => {}} paperType={currentTab} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CheckSection;
