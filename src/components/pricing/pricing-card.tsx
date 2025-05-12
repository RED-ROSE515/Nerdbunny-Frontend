'use client';

import type React from 'react';

import { motion } from 'framer-motion';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { CardGlow } from '@/components/ui/card-glow';
import { cn } from '@/lib/utils';

interface PricingCardProps {
  plan: {
    name: string;
    badge?: {
      text: string;
      variant: 'new' | 'popular';
    };
    description: string;
    price: number;
    period?: string;
    features: { name: string; icon: React.ComponentType<{ className?: string }> }[];
    buttonText: string;
    buttonVariant: 'primary' | 'outline';
    footer?: {
      text: string;
      link?: {
        text: string;
        href: string;
      };
    };
  };
}

export function PricingCard({ plan }: PricingCardProps) {
  return (
    <CardGlow className='h-full'>
      <Card className='relative flex h-full flex-col overflow-hidden rounded-[12px] border-0 bg-white/80 backdrop-blur-xl backdrop-saturate-200 dark:bg-[#0D1117]/80'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.05),rgba(37,99,235,0))]' />
        <div className='bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.95),rgba(255,255,255,0.98)) absolute inset-0 dark:bg-[radial-gradient(circle_at_top_right,rgba(13,17,23,0.95),rgba(13,17,23,0.98))]' />

        <CardContent className='relative z-10 flex-1 p-6'>
          <div className='flex h-full flex-col items-stretch justify-between space-y-4'>
            {plan.badge && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Badge
                  variant='outline'
                  className={cn(
                    'absolute right-6 top-6 border backdrop-blur-3xl',
                    plan.badge.variant === 'new' &&
                      'border-[#3FB950]/20 bg-[#3FB950]/10 text-[#3FB950]',
                    plan.badge.variant === 'popular' &&
                      'border-[#8B5CF6]/30 bg-gradient-to-r from-[#8B5CF6]/20 to-[#6366F1]/20 text-[#A78BFA]'
                  )}
                >
                  {plan.badge.text}
                </Badge>
              </motion.div>
            )}

            <div>
              <motion.h3
                className='text-[24px] font-semibold tracking-tight text-gray-900 dark:text-white'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {plan.name}
              </motion.h3>
              <motion.p
                className='mt-2 text-[14px] leading-relaxed text-gray-600 dark:text-gray-400'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                {plan.description}
              </motion.p>
            </div>

            <motion.div
              className='pt-4'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <div className='flex items-baseline'>
                <span className='text-[48px] font-semibold tracking-tight text-gray-900 dark:text-white'>
                  ${plan.price}
                </span>
                <span className='ml-1 text-[14px] text-gray-600 dark:text-gray-400'>USD</span>
              </div>
              <p className='mt-1 text-[14px] text-gray-600 dark:text-gray-400'>{plan.period}</p>
            </motion.div>

            <motion.ul
              className='space-y-3 py-4'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              {plan.features.map((feature, index) => (
                <li key={index} className='flex w-full items-center'>
                  <feature.icon className='mr-3 h-5 w-5 text-green-600 dark:text-green-400' />
                  <span className='w-full text-[14px] text-gray-700 dark:text-gray-300'>
                    {feature.name}
                  </span>
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <Button
                className={cn(
                  'w-full transition-all duration-200',
                  plan.buttonVariant === 'primary' &&
                    'bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-[#0D1117] dark:hover:bg-gray-100 dark:hover:text-black',
                  plan.buttonVariant === 'outline' &&
                    'border-[0.5px] border-gray-200 bg-transparent text-gray-900 hover:bg-gray-900 hover:text-white dark:border-gray-800 dark:text-white dark:hover:bg-white dark:hover:text-black'
                )}
                variant={plan.buttonVariant === 'primary' ? 'default' : 'outline'}
              >
                <span className='relative'>
                  {plan.buttonText}
                  <motion.span
                    className='absolute bottom-0 left-0 h-[1px] w-full bg-current'
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </span>
              </Button>
            </motion.div>
          </div>
        </CardContent>
        {plan.footer && (
          <CardFooter className='relative z-10 border-t border-gray-800/30 px-6 py-4'>
            <motion.p
              className='text-[14px] text-gray-400'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              {plan.footer.text}
              {plan.footer.link && (
                <a
                  href={plan.footer.link.href}
                  className='ml-1 text-blue-400 hover:text-blue-300 hover:underline'
                >
                  {plan.footer.link.text}
                </a>
              )}
            </motion.p>
          </CardFooter>
        )}
      </Card>
    </CardGlow>
  );
}
