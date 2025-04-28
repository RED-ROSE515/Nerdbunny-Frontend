import { Eye, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

export default function PaperImagesTable({ data }: any) {
  const router = useRouter();
  return (
    <div className='h-full w-full rounded-lg border shadow-xl'>
      <Table className='overflow-hidden'>
        <TableHeader>
          <TableRow>
            <TableHead className='text-center'>Paper</TableHead>
            <TableHead className='text-center'>Title</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data ? (
            data.map((paper: any) => (
              <TableRow key={paper.id}>
                <TableCell align='center'>
                  <FileText size={24} />
                </TableCell>
                <TableCell className='font-medium'>{paper.title}</TableCell>
                <TableCell className='text-right'>
                  <Button
                    variant='ghost'
                    className='px-3'
                    size='sm'
                    onClick={() => {
                      router.push('/results/eddii/' + paper.id);
                    }}
                  >
                    <Eye size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className='font-medium'>{'No Data'}</TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            {/* <TableCell colSpan={3}>Total</TableCell>
            <TableCell className='text-right'>$2,500.00</TableCell> */}
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
