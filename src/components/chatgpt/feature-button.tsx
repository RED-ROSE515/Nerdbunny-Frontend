'use client';

import { FileText, ImageIcon, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function FeatureButtons() {
  return (
    <div className='flex justify-center gap-4 py-4'>
      <Button variant='outline' size='sm' className='gap-2'>
        <Search className='h-4 w-4' />
        <span>Search</span>
      </Button>
      <Button variant='outline' size='sm' className='gap-2'>
        <ImageIcon className='h-4 w-4' />
        <span>Create Images</span>
      </Button>
      <Button variant='outline' size='sm' className='gap-2'>
        <FileText className='h-4 w-4' />
        <span>Research</span>
      </Button>
    </div>
  );
}
