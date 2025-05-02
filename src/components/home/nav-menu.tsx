'use client';

import type * as React from 'react';

import { motion } from 'framer-motion';
import { FileAudio, FileChartColumn, ScanLine, TextCursorInput } from 'lucide-react';

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  gradient: string;
  iconColor: string;
}

const menuItems: MenuItem[] = [
  {
    icon: <ScanLine className='h-5 w-5' />,
    label: 'Analyze',
    href: '/check',
    gradient:
      'radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)',
    iconColor: 'text-green-500'
  },
  {
    icon: <FileChartColumn className='h-5 w-5' />,
    label: 'Papers',
    href: '/results/papers',
    gradient:
      'radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)',
    iconColor: 'text-red-500'
  },
  {
    icon: <FileAudio className='h-5 w-5' />,
    label: 'Past Recordings',
    href: '/speeches',
    gradient:
      'radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)',
    iconColor: 'text-orange-500'
  },
  {
    icon: <TextCursorInput className='h-5 w-5' />,
    label: 'AI Editor',
    href: '/ai-editor',
    gradient:
      'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)',
    iconColor: 'text-blue-500'
  }
];
const navGlowVariants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

export function NavMenuBar() {
  return (
    <motion.nav
      className='relative overflow-hidden rounded-lg border border-border/20 bg-gradient-to-b from-background/80 to-background/40 p-2 shadow-lg backdrop-blur-lg'
      initial='initial'
      whileHover='hover'
    >
      <motion.div
        className={`bg-gradient-radial pointer-events-none absolute -inset-2 z-0 rounded-3xl from-transparent via-blue-400/20 via-purple-400/20 via-red-400/20 via-30% via-60% via-90% to-transparent dark:via-blue-400/30 dark:via-purple-400/30 dark:via-red-400/30 dark:via-30% dark:via-60% dark:via-90%`}
        variants={navGlowVariants}
      />
      <ul className='relative z-10 flex items-center gap-2'>
        {menuItems.map((item, index) => (
          <motion.li key={item.label} className='relative'>
            <motion.div
              className='group relative block overflow-visible rounded-xl'
              style={{ perspective: '600px' }}
              whileHover='hover'
              initial='initial'
            >
              <motion.div
                className='pointer-events-none absolute inset-0 z-0'
                style={{
                  background: item.gradient,
                  opacity: 0,
                  borderRadius: '16px'
                }}
              />
              <motion.a
                href={item.href}
                className='relative z-10 flex items-center gap-2 rounded-xl bg-transparent px-4 py-2 text-muted-foreground transition-colors group-hover:text-foreground'
                style={{ transformStyle: 'preserve-3d', transformOrigin: 'center bottom' }}
              >
                <span>{item.label}</span>
              </motion.a>
            </motion.div>
          </motion.li>
        ))}
      </ul>
    </motion.nav>
  );
}
