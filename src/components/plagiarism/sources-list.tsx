'use client';

import { useState } from 'react';

import type { Source } from '@/lib/types/plagiarism';

import {
  Building,
  Calendar,
  ChevronDown,
  ExternalLink,
  FileText,
  Search,
  User
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SourcesListProps {
  sources: Source[];
}

export function SourcesList({ sources }: SourcesListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'matchedWords' | 'title'>('matchedWords');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Filter and sort sources
  const filteredSources = sources
    .filter(
      (source) =>
        source.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        source.url.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'matchedWords') {
        return sortOrder === 'desc'
          ? b.matchedWords - a.matchedWords
          : a.matchedWords - b.matchedWords;
      } else {
        const titleA = a.title || a.url;
        const titleB = b.title || b.url;
        return sortOrder === 'desc' ? titleB.localeCompare(titleA) : titleA.localeCompare(titleB);
      }
    });

  const toggleSort = (field: 'matchedWords' | 'title') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <Card className='w-full max-w-[99%] px-0'>
      <CardHeader className='pb-2'>
        <CardTitle className='text-lg'>Sources ({sources.length})</CardTitle>
      </CardHeader>
      <CardContent className='w-full px-1 md:px-6'>
        <div className='w-full space-y-4'>
          <div className='flex gap-2'>
            <div className='relative flex-1'>
              <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Search sources...'
                className='pl-8'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              variant='outline'
              onClick={() => toggleSort('matchedWords')}
              className='whitespace-nowrap'
            >
              Sort by {sortBy === 'matchedWords' ? 'Matches' : 'Title'}
              <ChevronDown
                className={`ml-1 h-4 w-4 transition-transform ${
                  sortBy === 'matchedWords' && sortOrder === 'asc' ? 'rotate-180' : ''
                }`}
              />
            </Button>
          </div>

          <div className='h-[500px] w-full overflow-x-hidden overflow-y-scroll md:pr-4'>
            <div className='w-full space-y-4'>
              {filteredSources.length > 0 ? (
                filteredSources.map((source) => (
                  <Collapsible key={source.id} className='w-full rounded-md border'>
                    <div className='p-2 md:p-4'>
                      <div className='flex w-full items-start justify-between gap-2'>
                        <div className='w-1/2 space-y-1'>
                          <h3 className='line-clamp-1 truncate font-medium'>
                            {source.title || 'Untitled Source'}
                          </h3>
                          <p className='line-clamp-1 max-w-[70vw] text-sm text-muted-foreground'>
                            {source.url}
                          </p>
                        </div>
                        <div className='flex shrink-0 items-center gap-2'>
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

                      <div className='mt-2 flex flex-wrap gap-2'>
                        {source.identicalWords > 0 && (
                          <Badge variant='outline' className='bg-red-50 dark:bg-red-900'>
                            {source.identicalWords} identical
                          </Badge>
                        )}
                        {source.similarWords > 0 && (
                          <Badge variant='outline' className='bg-orange-50 dark:bg-orange-600'>
                            {source.similarWords} similar
                          </Badge>
                        )}
                        {source.paraphrasedWords > 0 && (
                          <Badge variant='outline' className='bg-yellow-50 dark:bg-green-600'>
                            {source.paraphrasedWords} paraphrased
                          </Badge>
                        )}
                      </div>

                      <CollapsibleTrigger asChild>
                        <Button variant='ghost' size='sm' className='mt-2 w-full'>
                          <span>Details</span>
                          <ChevronDown className='ml-1 h-4 w-4' />
                        </Button>
                      </CollapsibleTrigger>
                    </div>

                    <CollapsibleContent>
                      <div className='border-t px-4 pb-4 pt-0'>
                        {source.introduction && (
                          <div className='mt-2'>
                            <h4 className='mb-1 text-sm font-medium'>Introduction</h4>
                            <p className='text-sm text-muted-foreground'>{source.introduction}</p>
                          </div>
                        )}

                        {source.metadata && Object.keys(source.metadata).length > 0 && (
                          <div className='mt-3'>
                            <h4 className='mb-1 text-sm font-medium'>Metadata</h4>
                            <div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
                              {source.metadata.publishDate && (
                                <div className='flex items-center gap-1 text-sm'>
                                  <Calendar className='h-3.5 w-3.5 text-muted-foreground' />
                                  <span>
                                    {new Date(source.metadata.publishDate).toLocaleDateString()}
                                  </span>
                                </div>
                              )}
                              {source.metadata.author && (
                                <div className='flex items-center gap-1 text-sm'>
                                  <User className='h-3.5 w-3.5 text-muted-foreground' />
                                  <span>{source.metadata.author}</span>
                                </div>
                              )}
                              {source.metadata.organization && (
                                <div className='flex items-center gap-1 text-sm'>
                                  <Building className='h-3.5 w-3.5 text-muted-foreground' />
                                  <span>{source.metadata.organization}</span>
                                </div>
                              )}
                              {source.metadata.filename && (
                                <div className='flex items-center gap-1 text-sm'>
                                  <FileText className='h-3.5 w-3.5 text-muted-foreground' />
                                  <span className='truncate'>{source.metadata.filename}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        <div className='mt-3 flex justify-end'>
                          <Button variant='outline' size='sm' asChild>
                            <a href={source.url} target='_blank' rel='noopener noreferrer'>
                              Visit Source
                              <ExternalLink className='ml-1 h-3.5 w-3.5' />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))
              ) : (
                <div className='py-8 text-center text-muted-foreground'>
                  No sources found matching your search.
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
