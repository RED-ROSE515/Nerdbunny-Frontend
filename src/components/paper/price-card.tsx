import React from 'react';

import { commify } from '@/lib/utils/number';

import { Card } from '../ui/card';

interface PriceCardProps {
  input_tokens: string;
  output_tokens: string;
  cost: string;
}
export default function PriceCard({ input_tokens, output_tokens, cost }: PriceCardProps) {
  return (
    <React.Fragment>
      {input_tokens && output_tokens ? (
        <Card
          className={`md:text-md flex w-full flex-row items-center justify-center space-x-4 bg-gray-200 p-2 text-sm dark:bg-[#242F3C] md:p-4`}
        >
          <p>{`IN: ${commify(input_tokens)}`}</p>
          <p>|</p>
          <p>{`OUT: ${commify(output_tokens)}`}</p>
        </Card>
      ) : (
        <div />
      )}
    </React.Fragment>
  );
}
