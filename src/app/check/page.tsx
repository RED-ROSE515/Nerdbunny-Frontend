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

type TriggerRefType = {
  current: (() => void) | null;
};

export default function CheckPageApp() {
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
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [hasAccepted, setHasAccepted] = useState(false);
  const [currentTab, setCurrentTab] = useState<string>('ResearchCheck');
  const [isLoading, setIsLoading] = useState(false);
  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
  const triggerUploadRef: TriggerRefType = useRef(null);
  const tabs = [
    {
      id: 'ResearchCheck',
      label: 'Analyse Manuscript',
      icon: <GiArchiveResearch className={`h-8 w-8 text-pink-500 dark:text-white`} />,
      title: 'Research & Analytics',
      content:
        'Our AI agent analyzes the research paper and provides a report with the percentage of errors and discrepancies.',
      image: '/placeholder.svg?height=200&width=200'
    },
    {
      id: 'GenerateArticle',
      label: 'Summarise Manuscript',
      icon: <GrArticle className={`h-8 w-8 text-slate-400 dark:text-white`} />,
      title: 'Summary and Articles',
      content:
        'Our AI agent creates summaries and articles from academic papers, making complex research accessible to everyone.',
      image: '/placeholder.svg?height=200&width=200'
    },
    {
      id: 'ExtractFigures',
      label: 'EDDII',
      icon: <RiBarChartBoxAiFill className={`h-8 w-8 text-slate-400 dark:text-white`} />,
      title: 'Extract Figures',
      content:
        'Our AI agent creates summaries and articles from academic papers, making complex research accessible to everyone.',
      image: '/placeholder.svg?height=200&width=200'
    }
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
  useEffect(() => {
    if (handleProtectedAction()) {
      setIsLoading(true);
      const accepted = localStorage.getItem('disclaimerAccepted');
      if (accepted === 'true') {
        setHasAccepted(true);
        setShowDisclaimer(false);
      }
      setIsLoading(false);
    }
  }, []);

  // useEffect(() => {
  //   if (postId) {
  //     if (processType.includes('ResearchCheck')) {
  //       router.push(DOMAIN + '/results/discrepancies/' + postId);
  //     } else {
  //       router.push(DOMAIN + '/results/articles/' + postId);
  //     }
  //   }
  // }, [postId]);
  const handleAccept = () => {
    setHasAccepted(true);
    setShowDisclaimer(false);
    localStorage.setItem('disclaimerAccepted', 'true');
  };

  const handleDeny = () => {
    setHasAccepted(false);
    setShowDisclaimer(false);
  };

  const handleProtectedAction = () => {
    if (!isAuthenticated) {
      setShowSignIn(true);
      return false;
    }
    return true;
  };

  return (
    <div className='flex min-h-[80vh] w-full flex-col items-center justify-start'>
      <SignInDialog isOpen={showSignIn} onClose={() => setShowSignIn(false)} />
      {isLoading ? (
        <Spinner className='my-4' color='primary' />
      ) : (
        <>
          {showDisclaimer && isAuthenticated && (
            <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4'>
              <Card className={`max-w-3xl rounded-lg bg-[#fff] p-6 pt-8 dark:bg-[#1C243E]`}>
                <div
                  className={`max-h-[80vh] overflow-y-auto rounded-lg bg-[#ddd] p-3 dark:bg-[#0B1022]`}
                >
                  <h2 className='mb-4 text-2xl font-bold'>
                    Disclaimer & Upload Guidelines for AI Discrepancies Detection
                  </h2>
                  <div className='prose mb-6 max-w-none space-y-4'>
                    <p>
                      By uploading a document to NobleBlocks.com or NerdBunny.com, you agree to the
                      following terms and conditions. Our AI-powered system will analyze the
                      document for errors, and if set to public, other users may interact with it by
                      leaving comments, critiques, and reactions.
                    </p>

                    <div>
                      <h3 className='text-lg font-semibold'>
                        1. Acceptable Use & Content Responsibility
                      </h3>
                      <ul className='list-disc pl-6'>
                        <li>
                          You must have the legal right to upload the document. Do not upload
                          copyrighted materials without proper authorization.
                        </li>
                        <li>No illegal, offensive, or unethical content is allowed.</li>
                        <li>
                          You are solely responsible for the content you upload and any consequences
                          resulting from its publication.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className='text-lg font-semibold'>2. Privacy & Visibility</h3>
                      <ul className='list-disc pl-6'>
                        <li>
                          By default, you can choose privacy settings: Public, Followers Only,
                          Specific Users, or Private.
                        </li>
                        <li>
                          If set to Public, the document will be accessible to all registered users
                          for discussion, peer interaction, and feedback.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className='text-lg font-semibold'>
                        3. Intellectual Property & Copyright
                      </h3>
                      <ul className='list-disc pl-6'>
                        <li>
                          NobleBlocks and NerdBunny do not claim ownership of uploaded content.
                        </li>
                        <li>
                          We reserve the right to remove any content flagged for copyright
                          infringement or legal violations.
                        </li>
                        <li>
                          If you believe your work has been uploaded without permission, contact us
                          at info@nobleblocks.com for takedown requests.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className='text-lg font-semibold'>4. AI Analysis & Accuracy</h3>
                      <ul className='list-disc pl-6'>
                        <li>
                          Our AI-powered tool provides error detection and quality assessments, but
                          it does not replace human peer review.
                        </li>
                        <li>
                          AI-generated reports should be considered as advisory and not as
                          definitive evaluations of a document's validity.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className='text-lg font-semibold'>5. Content Removal & Moderation</h3>
                      <ul className='list-disc pl-6'>
                        <li>
                          We reserve the right to moderate, flag, or remove content that violates
                          our terms.
                        </li>
                        <li>
                          Users found violating these guidelines may have their accounts restricted
                          or suspended.
                        </li>
                      </ul>
                    </div>

                    <p className='mt-4'>
                      By proceeding with your upload, you confirm that you understand and agree to
                      these terms. For any inquiries, contact info@nobleblocks.com.
                    </p>
                  </div>
                </div>
                <div className='mt-4 flex justify-center gap-4'>
                  <button
                    onClick={handleDeny}
                    className='rounded bg-gray-300 px-4 py-2 text-black hover:bg-gray-400'
                  >
                    Deny
                  </button>
                  <button
                    onClick={handleAccept}
                    className='rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
                  >
                    Accept
                  </button>
                </div>
              </Card>
            </div>
          )}

          <div className='h-full w-full px-2 md:mt-10 md:w-5/6 md:px-0'>
            <div className='h-full w-full items-start'>
              {hasAccepted ? (
                isChecking ? (
                  <div className='flex w-full flex-col items-center justify-center'>
                    <Loader />
                    {summary && (
                      <div className='my-8 w-[1100px]'>
                        <SummaryWrapper
                          summary={summary}
                          reportPost={() => alert(`report ${summary.metadata.paper_id}`)}
                          totalData={summary}
                          postDate={summary.post_date}
                          speechData={[]}
                          showSignInModal={() => {}}
                          link={DOMAIN + '/results/discrepancies/' + postId}
                          userData={paperOwner}
                        />
                      </div>
                    )}
                    {analysisResult && (
                      <AnalysisResultWrapper
                        results={analysisResult}
                        total_summary={totalSummary}
                      />
                    )}
                  </div>
                ) : (
                  <>
                    {/* <div className='flex flex-row items-center justify-center'>
                      <PaperGlobe />
                    </div> */}
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
                          className={`grid grid-cols-3 border-b border-gray-100 dark:border-[#090E16] dark:bg-slate-800`}
                        >
                          {tabs.map((tab) => (
                            <button
                              key={tab.id}
                              onClick={() => {
                                setCurrentTab(tab.id);
                                setProcessType(tab.id);
                                if (tab.id !== 'PlagiarismCheck') console.log('Plagiarism check');
                              }}
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
                          ))}
                        </div>
                        {/* Content */}
                        {(currentTab === 'ResearchCheck' ||
                          currentTab === 'GenerateArticle' ||
                          currentTab === 'ExtractFigures') && (
                          <div className={`p-8`}>
                            <div className='flex w-full flex-col items-center gap-8 md:flex-row'>
                              <PaperInputWrapper getPdfList={() => {}} paperType={currentTab} />
                            </div>
                          </div>
                        )}
                        {currentTab === 'PlagiarismCheck' && (
                          <div className={`p-8`}>
                            <div className='flex w-full flex-col items-center justify-center gap-8 md:flex-row'>
                              <p className='p-16 text-center text-2xl font-bold'>Comming Soon...</p>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </>
                )
              ) : (
                !showDisclaimer && (
                  <div className='rounded border p-4 text-center'>
                    <p>You must accept the terms and conditions to upload files.</p>
                    <button
                      onClick={() => setShowDisclaimer(true)}
                      className='mt-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
                    >
                      View Terms & Conditions
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
