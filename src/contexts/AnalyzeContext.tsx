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
    paper_id: string,
    shower_type: string,
    shower_ids: Option[],
    analyzeOption: string[],
    summaryOption?: string,
    advancedMethods?: string[],
    citation?: string
  ) => {
    try {
      setLoading(true);
      setProgress(0);
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
        totalDuration = (currentProgress / 40) * totalDuration;

        setSummaryLoading(false);
        setSummary(summary_response.data.summary);
        setCheckLoading(true);
        setPaperOwner(summary_response.data.paper_owner);
        setPostId(summary_response.data.metadata.paper_id);
        const analysis_response = await api.get(`/papers/${paper_id}/get_analysis/`);
        const error_summary_response = await api.get(`/papers/${paper_id}/get_error_summary/`);
        clearInterval(intervalId);
        setProgress(100);
        setCheckLoading(false);
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
                  '/results/descrepancies/' + error_summary_response.data.metadata.paper_id,
                  '_blank'
                )
              }
            >
              View
            </ToastAction>
          ),
          duration: 5000
        });
        await sleep(5000);
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
