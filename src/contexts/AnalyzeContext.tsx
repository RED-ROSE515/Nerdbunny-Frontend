'use client';

import React, { createContext, useContext, useState } from 'react';

import axios from 'axios';

import { useToast } from '@/components/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { useLoading } from '@/contexts/ProgressContext';
import api from '@/lib/utils/api';

interface AnalyzeContextType {
  analysisResult: string;
  summary: any;
  totalSummary: string;
  summaryLoading: boolean;
  checkLoading: boolean;
  isChecking: boolean;
  processType: string;
  postId: string;
  paperOwner: any;
  setPostId: (postId: string) => void;
  setProcessType: (processType: string) => void;
  setPaperOwner: (owner: any) => void;
  handleAnalyze: (
    s3_url: string,
    shower_type: string,
    shower_ids: Option[],
    analyzeOption: string[],
    summaryOption?: string,
    advancedMethods?: string[],
    citation?: string
  ) => Promise<void>;
  resetState: () => void;
}

export interface Option {
  value: string;
  label: string;
  disable?: boolean;
  avatar: string;
  /** fixed option that can't be removed. */
  fixed?: boolean;
  /** Group the options by providing key. */
  [key: string]: string | boolean | undefined;
}

const AnalyzeContext = createContext<AnalyzeContextType>({
  analysisResult: '',
  summary: '',
  totalSummary: '',
  paperOwner: {},
  summaryLoading: false,
  checkLoading: false,
  isChecking: false,
  processType: '',
  postId: '',
  setPostId: () => {},
  setPaperOwner: () => {},
  setProcessType: () => {},
  handleAnalyze: async () => {},
  resetState: () => {}
});

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const AnalyzeProvider = ({ children }: { children: React.ReactNode }) => {
  const [analysisResult, setAnalysisResult] = useState('');
  const [summary, setSummary] = useState('');
  const [paperOwner, setPaperOwner] = useState({});
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [checkLoading, setCheckLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [totalSummary, setTotalSummary] = useState('');
  const [postId, setPostId] = useState('');
  const [processType, setProcessType] = useState('ResearchCheck');
  const { setLoading, setProgress } = useLoading();
  const { toast } = useToast();
  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
  const resetState = () => {
    setAnalysisResult('');
    setSummary('');
    setProcessType('');
    setTotalSummary('');
    setSummaryLoading(false);
    setCheckLoading(false);
    setIsChecking(false);
  };

  const handleAnalyze = async (
    paper_url: string,
    shower_type: string,
    shower_ids: Option[],
    analyzeOption: string[],
    summaryOption?: string,
    advancedMethods?: string[],
    citation?: string
  ) => {
    try {
      setLoading(true);
      setCheckLoading(true);
      setProgress(0);
      let paper_id;
      if (paper_url.startsWith('https://') || paper_url.startsWith('http://')) {
        const paper_response = await api.post(`/papers/`, { paper_url: paper_url });
        paper_id = paper_response.data.id;
      } else paper_id = paper_url;

      await toast({
        title: 'Queued for Processing',
        description: 'Your file has been uploaded and is now in the queue for AI analysis.',
        duration: 2000
      });
      await sleep(2000);
      await toast({
        title: 'Processing Started',
        description: 'Processing now... This may take up to 5 minutes.',
        duration: 2000
      });
      await sleep(2000);
      setLoading(false);
      setCheckLoading(false);
      if (analyzeOption[0] === 'ResearchCheck') {
        setSummary('');
        setAnalysisResult('');
        setIsChecking(true);
        setSummaryLoading(true);

        let totalDuration = 200000;
        let interval = 200;
        let currentProgress = 0;

        const intervalId = setInterval(() => {
          currentProgress += (interval / totalDuration) * 100;
          setProgress(Math.min(currentProgress, 99));

          if (currentProgress.toFixed(1) === '25.0') {
            toast({
              title: 'Processing at 25%',
              description: 'Analyzing text and structure of paper.',
              duration: 5000
            });
          }
          if (currentProgress.toFixed(1) === '50.0') {
            toast({
              title: 'Processing at 50%',
              description: 'Checking for inconsistencies and potential errors in paper.',
              duration: 5000
            });
          }
          if (currentProgress.toFixed(1) === '75.0') {
            toast({
              title: 'Processing at 75%',
              description: 'Verifying results and generating final report for paper.',
              duration: 5000
            });
          }
        }, interval);

        const summary_response = await api.get(`/papers/summaries/${paper_id}/get_summary/`);
        totalDuration = (currentProgress / 35) * totalDuration;

        setSummary(summary_response.data.summary);
        setPaperOwner(summary_response.data.paper_owner);
        // setPostId(summary_response.data.metadata.paper_id);

        const analysis_response = await api.get(`/papers/${paper_id}/get_analysis/`);
        const error_summary_response = await api.get(`/papers/${paper_id}/get_error_summary/`);

        clearInterval(intervalId);
        setProgress(100);
        setSummary(error_summary_response.data.summary);
        setAnalysisResult(analysis_response.data.analysis);
        setTotalSummary(analysis_response.data.summary);
        setIsChecking(false);
        await toast({
          title: 'Processing Complete',
          description: 'Analysis complete for uploaded paper! Click here to view results.',
          action: (
            <ToastAction
              altText='View Paper'
              onClick={() =>
                window.open(
                  '/results/discrepancies/' + error_summary_response.data.metadata.paper_id,
                  '_blank'
                )
              }
            >
              View
            </ToastAction>
          ),
          duration: 5000
        });
        await sleep(1500);
        window.location.href = DOMAIN + '/results/discrepancies/' + paper_id;
      } else if (analyzeOption[0] === 'GenerateArticle') {
        setIsChecking(true);

        let totalDuration = 200000;
        let interval = 200;
        let currentProgress = 0;

        const intervalId = setInterval(() => {
          currentProgress += (interval / totalDuration) * 100;
          setProgress(Math.min(currentProgress, 99));

          if (currentProgress.toFixed(1) === '25.0') {
            toast({
              title: 'Processing at 25%',
              description: 'Analyzing text and structure of paper.',
              duration: 5000
            });
          }
          if (currentProgress.toFixed(1) === '50.0') {
            toast({
              title: 'Processing at 50%',
              description: 'Checking for inconsistencies and potential errors in paper.',
              duration: 5000
            });
          }
          if (currentProgress.toFixed(1) === '75.0') {
            toast({
              title: 'Processing at 75%',
              description: 'Verifying results and generating final report for paper.',
              duration: 5000
            });
          }
        }, interval);

        const article_response = await api.post(`/papers/articles/${paper_id}/get_article/`, {
          summary_type: summaryOption,
          advanced_methods: advancedMethods,
          citation_format: citation
        });

        clearInterval(intervalId);
        setProgress(100);
        setIsChecking(false);
        await toast({
          title: 'Processing Complete',
          description: 'Analysis complete for uploaded paper! Click here to view results.',
          action: (
            <ToastAction
              altText='View Paper'
              onClick={() => window.open('/results/articles/' + article_response.data.id, '_blank')}
            >
              View
            </ToastAction>
          ),
          duration: 5000
        });
        await sleep(1500);
        window.location.href = DOMAIN + '/results/articles/' + paper_id;
      } else if (analyzeOption[0] === 'ExtractFigures') {
        setIsChecking(true);
        let totalDuration = 200000;
        let interval = 200;
        let currentProgress = 0;

        const intervalId = setInterval(() => {
          currentProgress += (interval / totalDuration) * 100;
          setProgress(Math.min(currentProgress, 99));

          if (currentProgress.toFixed(1) === '25.0') {
            toast({
              title: 'Processing at 25%',
              description: 'Analyzing text and structure of paper.',
              duration: 5000
            });
          }
          if (currentProgress.toFixed(1) === '50.0') {
            toast({
              title: 'Processing at 50%',
              description: 'Extracting figures from paper.',
              duration: 5000
            });
          }
          if (currentProgress.toFixed(1) === '75.0') {
            toast({
              title: 'Processing at 75%',
              description: 'Generating final report for paper.',
              duration: 5000
            });
          }
        }, interval);

        const response = await api.get(`/papers/eddii/${paper_id}/extract_all_figures/`);

        clearInterval(intervalId);
        setProgress(100);
        setIsChecking(false);
        await toast({
          title: 'Processing Complete',
          description: 'Extraction complete for uploaded paper! Click here to view results.',
          action: (
            <ToastAction
              altText='View Paper'
              onClick={() => window.open('/results/eddii/' + paper_id, '_blank')}
            >
              View
            </ToastAction>
          ),
          duration: 5000
        });
        await sleep(1500);
        window.location.href = DOMAIN + '/results/eddii/' + paper_id;
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: err.response?.data.message || 'Something went wrong!',
          duration: 1000
        });
      }
    }
  };

  return (
    <AnalyzeContext.Provider
      value={{
        analysisResult,
        summary,
        paperOwner,
        totalSummary,
        summaryLoading,
        checkLoading,
        postId,
        isChecking,
        processType,
        setPostId,
        setPaperOwner,
        setProcessType,
        handleAnalyze,
        resetState
      }}
    >
      {children}
    </AnalyzeContext.Provider>
  );
};

export const useAnalyze = () => useContext(AnalyzeContext);
