'use client';

import { useState } from 'react';

import type { ReportData } from '@/lib/types/plagiarism';

import { ChevronDown, ExternalLink, FileText, Info } from 'lucide-react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { DocumentDetails } from './document-details';
import { MatchedPassages } from './matched-passages';
import { PlagiarismScoreGauge } from './plagiarism-score-gauge';
import { SourcesList } from './sources-list';

interface PlagiarismReportProps {
  data: ReportData;
}

export function PlagiarismReport({ data }: PlagiarismReportProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Access the nested data structure correctly
  const { scannedDocument, results } = data.data;
  const { score } = results;

  // Calculate the severity level based on the aggregated score
  const getSeverityLevel = (score: number) => {
    if (score >= 75) return 'Critical';
    if (score >= 50) return 'High';
    if (score >= 25) return 'Moderate';
    return 'Low';
  };

  const severityLevel = getSeverityLevel(score.aggregatedScore);
  const severityColor = {
    Critical: 'text-red-600',
    High: 'text-orange-500',
    Moderate: 'text-yellow-500',
    Low: 'text-green-500'
  }[severityLevel];

  // Get top sources by matched words
  const topSources = [...results.internet]
    .sort((a, b) => b.matchedWords - a.matchedWords)
    .slice(0, 5);

  return (
    <div className='w-full space-y-6'>
      <Card>
        <CardHeader className='pb-2'>
          <CardTitle className='mb-2 text-center text-lg font-bold md:text-3xl'>
            {data.title}
          </CardTitle>
          <CardDescription>
            Scan ID: {scannedDocument.scanId} •{' '}
            {new Date(scannedDocument.creationTime).toLocaleString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
              <div className='flex flex-col items-center justify-center'>
                <PlagiarismScoreGauge score={score.aggregatedScore} />
                <div className='mt-2 text-center'>
                  <p className='text-sm text-muted-foreground'>Similarity Score</p>
                  <p className={`text-lg font-bold ${severityColor}`}>
                    {severityLevel} ({score.aggregatedScore}%)
                  </p>
                </div>
              </div>

              <div className='col-span-2'>
                <div className='space-y-4'>
                  <div>
                    <div className='mb-1 flex justify-between'>
                      <span className='text-sm font-medium'>Identical Content</span>
                      <span className='text-sm text-muted-foreground'>
                        {score.identicalWords} words (
                        {((score.identicalWords / scannedDocument.totalWords) * 100).toFixed(1)}%)
                      </span>
                    </div>
                    <Progress
                      value={(score.identicalWords / scannedDocument.totalWords) * 100}
                      className='h-2 bg-gray-200 [&>.indicator]:bg-red-500'
                      // Use .indicator class in the component's CSS instead
                    />
                  </div>

                  <div>
                    <div className='mb-1 flex justify-between'>
                      <span className='text-sm font-medium'>Minor Changes</span>
                      <span className='text-sm text-muted-foreground'>
                        {score.minorChangedWords} words (
                        {((score.minorChangedWords / scannedDocument.totalWords) * 100).toFixed(1)}
                        %)
                      </span>
                    </div>
                    <Progress
                      value={(score.minorChangedWords / scannedDocument.totalWords) * 100}
                      className='h-2 bg-gray-200 [&>.indicator]:bg-orange-400'
                    />
                  </div>

                  <div>
                    <div className='mb-1 flex justify-between'>
                      <span className='text-sm font-medium'>Related Meaning</span>
                      <span className='text-sm text-muted-foreground'>
                        {score.relatedMeaningWords} words (
                        {((score.relatedMeaningWords / scannedDocument.totalWords) * 100).toFixed(
                          1
                        )}
                        %)
                      </span>
                    </div>
                    <Progress
                      value={(score.relatedMeaningWords / scannedDocument.totalWords) * 100}
                      className='h-2 bg-gray-200 [&>.indicator]:bg-yellow-400'
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='mt-8'>
              <span className='text-lg font-bold'>Understanding Your Report</span>
              <div className='p-4'>
                <p className='mb-2'>
                  This report analyzes your document for potential plagiarism by comparing it
                  against billions of internet sources, publications, and academic databases.
                </p>
                <ul className='list-inside list-disc space-y-1'>
                  <li>
                    <span className='font-medium text-red-500'>Identical Content:</span> Text that
                    exactly matches other sources
                  </li>
                  <li>
                    <span className='font-medium text-orange-500'>Minor Changes:</span> Text with
                    slight modifications from the original
                  </li>
                  <li>
                    <span className='font-medium text-yellow-500'>Related Meaning:</span>{' '}
                    Paraphrased content with similar meaning
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs
        defaultValue='overview'
        value={activeTab}
        onValueChange={setActiveTab}
        className='w-full'
      >
        <TabsList className='flex w-full gap-2 bg-transparent p-1'>
          <TabsTrigger
            value='overview'
            className='flex-1 rounded-t-lg py-3 transition-all data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-slate-300 data-[state=inactive]:bg-muted/40 data-[state=active]:shadow-sm data-[state=inactive]:hover:bg-muted/70 dark:data-[state=active]:bg-slate-700'
          >
            <div className='flex items-center justify-center gap-2'>
              <Info className='h-4 w-4' />
              <span>Overview</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value='sources'
            className='flex-1 rounded-t-lg py-3 transition-all data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-slate-300 data-[state=inactive]:bg-muted/40 data-[state=active]:shadow-sm data-[state=inactive]:hover:bg-muted/70 dark:data-[state=active]:bg-slate-700'
          >
            <div className='flex items-center justify-center gap-2'>
              <ExternalLink className='h-4 w-4' />
              <span>Sources ({results.internet.length})</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value='matches'
            className='flex-1 rounded-t-lg py-3 transition-all data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-slate-300 data-[state=inactive]:bg-muted/40 data-[state=active]:shadow-sm data-[state=inactive]:hover:bg-muted/70 dark:data-[state=active]:bg-slate-700'
          >
            <div className='flex items-center justify-center gap-2'>
              <FileText className='h-4 w-4' />
              <span>Matched Passages</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value='document'
            className='flex-1 rounded-t-lg py-3 transition-all data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-slate-300 data-[state=inactive]:bg-muted/40 data-[state=active]:shadow-sm data-[state=inactive]:hover:bg-muted/70 dark:data-[state=active]:bg-slate-700'
          >
            <div className='flex items-center justify-center gap-2'>
              <FileText className='h-4 w-4' />
              <span>Document Details</span>
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value='overview' className='w-full space-y-4 sm:space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <Alert
                  variant='destructive'
                  className={score.aggregatedScore >= 75 ? 'bg-red-50' : 'hidden'}
                >
                  <Info className='h-4 w-4' />
                  <AlertDescription>
                    This document contains a critical level of similarity with existing sources.
                    {score.aggregatedScore >= 90
                      ? ' The content appears to be almost entirely copied from other sources.'
                      : ''}
                  </AlertDescription>
                </Alert>

                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <div className='space-y-2'>
                    <h3 className='text-sm font-medium'>Document Statistics</h3>
                    <ul className='space-y-2 rounded-lg border p-3 text-sm'>
                      <li className='flex justify-between'>
                        <span className='text-muted-foreground'>Total Words:</span>
                        <span>{scannedDocument.totalWords}</span>
                      </li>
                      <li className='flex justify-between'>
                        <span className='text-muted-foreground'>Matched Words:</span>
                        <span>
                          {score.identicalWords +
                            score.minorChangedWords +
                            score.relatedMeaningWords}
                        </span>
                      </li>
                      <li className='flex justify-between'>
                        <span className='text-muted-foreground'>Language:</span>
                        <span>
                          {scannedDocument.detectedLanguage === 'en'
                            ? 'English'
                            : scannedDocument.detectedLanguage}
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className='space-y-2'>
                    <h3 className='text-sm font-medium'>Match Breakdown</h3>
                    <ul className='space-y-2 rounded-lg border p-3 text-sm'>
                      <li className='flex justify-between'>
                        <span className='text-muted-foreground'>Internet Sources:</span>
                        <span>{results.internet.length}</span>
                      </li>
                      <li className='flex justify-between'>
                        <span className='text-muted-foreground'>Primary Source Match:</span>
                        <span>
                          {Math.max(...results.internet.map((source) => source.matchedWords))} words
                        </span>
                      </li>
                      <li className='flex justify-between'>
                        <span className='text-muted-foreground'>Excluded Words:</span>
                        <span>{scannedDocument.totalExcluded}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className='space-y-2'>
                  <h3 className='text-sm font-medium'>Top Sources</h3>
                  <div className='space-y-2'>
                    {topSources.map((source, index) => (
                      <div
                        key={source.id}
                        className='flex flex-col gap-2 rounded-md bg-gray-50 p-3 dark:bg-gray-800 sm:flex-row sm:items-center sm:justify-between'
                      >
                        <div className='flex items-center gap-2 overflow-hidden'>
                          <Badge variant='outline' className='shrink-0'>
                            {index + 1}
                          </Badge>
                          <span className='truncate text-sm'>{source.title || source.url}</span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <Badge variant={source.matchedWords > 100 ? 'destructive' : 'outline'}>
                            {source.matchedWords} words
                          </Badge>
                          <Button variant='ghost' size='icon' asChild>
                            <a href={source.url} target='_blank' rel='noopener noreferrer'>
                              <ExternalLink className='h-4 w-4' />
                              <span className='sr-only'>Visit source</span>
                            </a>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button
                    variant='outline'
                    className='mt-2 w-full'
                    onClick={() => setActiveTab('sources')}
                  >
                    View All Sources
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='rounded-md bg-amber-50 p-3 dark:bg-slate-700'>
                  <h3 className='mb-1 font-medium'>Actions Required</h3>
                  <ul className='list-inside list-disc space-y-1 text-sm'>
                    <li>Review all highlighted passages and properly cite the original sources</li>
                    <li>Rewrite content with significant similarity to avoid plagiarism</li>
                    <li>Add proper citations and references for all borrowed ideas and text</li>
                    <li>Consider running another scan after making changes</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='sources'>
          <SourcesList sources={results.internet} />
        </TabsContent>

        <TabsContent value='matches'>
          <MatchedPassages sources={results.internet} />
        </TabsContent>

        <TabsContent value='document'>
          <DocumentDetails document={scannedDocument} title={data.title} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
