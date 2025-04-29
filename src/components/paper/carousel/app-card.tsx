import type { LucideIcon } from 'lucide-react';
import type React from 'react';

import { motion } from 'framer-motion';

interface AppCardProps {
  Icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
}

export const AppCard: React.FC<AppCardProps> = ({ Icon, title, description, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className='w-56 cursor-pointer rounded-2xl bg-[#1c1c1e] p-6 shadow-lg'
      onClick={onClick}
    >
      <div className='flex flex-col items-center text-center'>
        <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#2c2c2e]'>
          <Icon className='h-8 w-8 text-white' />
        </div>
        <h2 className='mb-2 text-lg font-semibold text-white'>{title}</h2>
        <p className='text-sm text-[#8e8e93]'>{description}</p>
      </div>
    </motion.div>
  );
};
