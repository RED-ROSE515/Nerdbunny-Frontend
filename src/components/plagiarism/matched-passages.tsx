'use client';

import type { Source } from '@/lib/types/plagiarism';

import { ExternalLink, FileText } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface MatchedPassagesProps {
  sources: Source[];
}

export function MatchedPassages({ sources }: MatchedPassagesProps) {
  // For a real implementation, we would have actual passage data
  // Here we're simulating it based on the source data

  // Sort sources by matched words to show most significant matches first
  const sortedSources = [...sources].sort((a, b) => b.matchedWords - a.matchedWords).slice(0, 10);

  return (
    <Card>
      <CardHeader className='pb-2'>
        <CardTitle className='text-lg'>Matched Passages</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue='all'>
          <TabsList className='mb-4'>
            <TabsTrigger value='all'>All Matches</TabsTrigger>
            <TabsTrigger value='identical'>Identical</TabsTrigger>
            <TabsTrigger value='similar'>Similar</TabsTrigger>
            <TabsTrigger value='paraphrased'>Paraphrased</TabsTrigger>
          </TabsList>

          <TabsContent value='all'>
            <div className='h-[500px] overflow-x-hidden overflow-y-scroll pr-4'>
              <div className='space-y-6'>
                {sortedSources.map((source) => (
                  <PassageCard key={source.id} source={source} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value='identical'>
            <div className='h-[500px] overflow-x-hidden overflow-y-scroll pr-4'>
              <div className='space-y-6'>
                {sortedSources
                  .filter((source) => source.identicalWords > 0)
                  .map((source) => (
                    <PassageCard key={source.id} source={source} matchType='identical' />
                  ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value='similar'>
            <div className='h-[500px] overflow-x-hidden overflow-y-scroll pr-4'>
              <div className='space-y-6'>
                {sortedSources
                  .filter((source) => source.similarWords > 0)
                  .map((source) => (
                    <PassageCard key={source.id} source={source} matchType='similar' />
                  ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value='paraphrased'>
            <div className='h-[500px] overflow-x-hidden overflow-y-scroll pr-4'>
              <div className='space-y-6'>
                {sortedSources
                  .filter((source) => source.paraphrasedWords > 0)
                  .map((source) => (
                    <PassageCard key={source.id} source={source} matchType='paraphrased' />
                  ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

interface PassageCardProps {
  source: Source;
  matchType?: 'identical' | 'similar' | 'paraphrased';
}

function PassageCard({ source, matchType }: PassageCardProps) {
  // Generate a simulated passage based on the introduction
  const generateSimulatedPassage = () => {
    if (!source.introduction || source.introduction === '...') {
      return 'No preview available for this matched passage.';
    }

    // Use the introduction as a base for our simulated passage
    const text =
      source.introduction.length > 150
        ? source.introduction.substring(0, 150) + '...'
        : source.introduction;

    return text;
  };

  const passage = generateSimulatedPassage();

  // Determine which match count to display based on matchType
  const getMatchCount = () => {
    if (matchType === 'identical') return source.identicalWords;
    if (matchType === 'similar') return source.similarWords;
    if (matchType === 'paraphrased') return source.paraphrasedWords;
    return source.matchedWords;
  };

  // Determine highlight color based on match type
  const getHighlightClass = () => {
    if (matchType === 'identical') return 'bg-red-100 border-l-4 border-red-500 dark:bg-red-800';
    if (matchType === 'similar')
      return 'bg-orange-100 border-l-4 border-orange-500 dark:bg-orange-800';
    if (matchType === 'paraphrased')
      return 'bg-yellow-100 border-l-4 border-yellow-500 dark:bg-yellow-800';
    return 'bg-gray-100 border-l-4 border-gray-500 dark:bg-gray-800';
  };

  return (
    <div className='overflow-hidden rounded-md border'>
      <div className='flex items-center justify-between border-b bg-gray-50 p-3 dark:bg-gray-700'>
        <div className='flex items-center gap-2'>
          <FileText className='h-4 w-4 text-muted-foreground' />
          <h3 className='text-sm font-medium'>{source.title || 'Untitled Source'}</h3>
        </div>
        <div className='flex items-center gap-2'>
          <span className='text-xs text-muted-foreground'>{getMatchCount()} words matched</span>
          <Button variant='ghost' size='icon' asChild className='h-8 w-8'>
            <a href={source.url} target='_blank' rel='noopener noreferrer'>
              <ExternalLink className='h-4 w-4' />
              <span className='sr-only'>Visit source</span>
            </a>
          </Button>
        </div>
      </div>

      <div className={`p-4 ${getHighlightClass()}`}>
        <p className='text-sm'>{passage}</p>
      </div>

      <div className='border-t bg-gray-50 p-3 dark:bg-gray-700'>
        <div className='flex items-center justify-between'>
          <span className='max-w-[70%] truncate text-xs'>{source.url}</span>
          <Button variant='outline' size='sm' asChild>
            <a href={source.url} target='_blank' rel='noopener noreferrer'>
              View Source
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
