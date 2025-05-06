'use client';

import type { ScannedDocument } from '@/lib/types/plagiarism';

import { Calendar, FileText, Languages } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DocumentDetailsProps {
  document: ScannedDocument;
  title: string;
}

export function DocumentDetails({ document, title }: DocumentDetailsProps) {
  return (
    <Card>
      <CardHeader className='pb-2'>
        <CardTitle className='text-lg'>Document Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-6'>
          <div className='flex flex-col gap-6 md:flex-row'>
            <div className='flex-1 space-y-4'>
              <div>
                <h3 className='mb-2 text-sm font-medium'>Document Information</h3>
                <div className='space-y-2'>
                  <div className='flex items-start gap-2'>
                    <FileText className='mt-0.5 h-8 w-8 text-muted-foreground' />
                    <div>
                      <p className='font-medium'>{title}</p>
                      <p className='text-sm text-muted-foreground'>
                        {document.metadata?.filename || 'No filename available'}
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start gap-2'>
                    <Calendar className='mt-0.5 h-4 w-4 text-muted-foreground' />
                    <div>
                      <p className='font-medium'>Scan Date</p>
                      <p className='text-sm text-muted-foreground'>
                        {new Date(document.creationTime).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start gap-2'>
                    <Languages className='mt-0.5 h-4 w-4 text-muted-foreground' />
                    <div>
                      <p className='font-medium'>Language</p>
                      <p className='text-sm text-muted-foreground'>
                        {document.detectedLanguage === 'en' ? 'English' : document.detectedLanguage}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {document.metadata && Object.keys(document.metadata).length > 0 && (
                <div>
                  <h3 className='mb-2 text-sm font-medium'>Metadata</h3>
                  <div className='space-y-2'>
                    {document.metadata.creationDate && (
                      <div className='flex justify-between'>
                        <span className='text-sm text-muted-foreground'>Creation Date:</span>
                        <span className='text-sm'>
                          {new Date(document.metadata.creationDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    {document.metadata.lastModificationDate && (
                      <div className='flex justify-between'>
                        <span className='text-sm text-muted-foreground'>Last Modified:</span>
                        <span className='text-sm'>
                          {new Date(document.metadata.lastModificationDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    {document.metadata.author && (
                      <div className='flex justify-between'>
                        <span className='text-sm text-muted-foreground'>Author:</span>
                        <span className='text-sm'>{document.metadata.author}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className='flex-1 space-y-4'>
              <div>
                <h3 className='mb-2 text-sm font-medium'>Scan Statistics</h3>
                <div className='space-y-2'>
                  <div className='flex justify-between'>
                    <span className='text-sm text-muted-foreground'>Total Words:</span>
                    <span className='text-sm'>{document.totalWords}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-sm text-muted-foreground'>Excluded Words:</span>
                    <span className='text-sm'>{document.totalExcluded}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-sm text-muted-foreground'>Scan ID:</span>
                    <span className='text-sm'>{document.scanId}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-sm text-muted-foreground'>Credits Used:</span>
                    <span className='text-sm'>
                      {document.credits} / {document.expectedCredits}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className='mb-2 text-sm font-medium'>Enabled Features</h3>
                <div className='flex flex-wrap gap-2'>
                  {document.enabled.plagiarismDetection && (
                    <Badge variant='outline' className='bg-green-50 dark:bg-green-800'>
                      Plagiarism Detection
                    </Badge>
                  )}
                  {document.enabled.aiDetection && (
                    <Badge variant='outline' className='bg-green-50 dark:bg-green-800'>
                      AI Detection
                    </Badge>
                  )}
                  {document.enabled.explainableAi && (
                    <Badge variant='outline' className='bg-green-50 dark:bg-green-800'>
                      Explainable AI
                    </Badge>
                  )}
                  {document.enabled.writingFeedback && (
                    <Badge variant='outline' className='bg-green-50 dark:bg-green-800'>
                      Writing Feedback
                    </Badge>
                  )}
                  {document.enabled.pdfReport && (
                    <Badge variant='outline' className='bg-green-50 dark:bg-green-800'>
                      PDF Report
                    </Badge>
                  )}
                  {document.enabled.cheatDetection && (
                    <Badge variant='outline' className='bg-green-50 dark:bg-green-800'>
                      Cheat Detection
                    </Badge>
                  )}
                  {!Object.values(document.enabled).some((value) => value) && (
                    <Badge variant='outline'>No features enabled</Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
