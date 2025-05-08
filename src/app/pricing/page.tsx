'use client';

import React from 'react';

import {
  Award,
  Camera,
  Clock,
  FileText,
  Image,
  MapPin,
  Radar,
  Star,
  Users,
  Video
} from 'lucide-react';
import { GiLevelFourAdvanced } from 'react-icons/gi';
import { MdSupport } from 'react-icons/md';

import { PricingCard } from '@/components/pricing/pricing-card';
import { GradientHeading } from '@/components/ui/graident-heading';

export default function Pricing() {
  const plans = [
    {
      name: 'Try Once',
      badge: {
        text: 'New',
        variant: 'new' as const
      },
      description: 'Best For: Testing the tools',
      price: 4.99,
      period: 'per once',
      buttonText: 'Try for $4.99',
      buttonVariant: 'outline' as const,
      features: [
        { name: '100 credits', icon: Award },
        {
          name: 'EDDII: Extract values, measurements, units, relations, interactions from graphed data images',
          icon: Image
        },
        {
          name: 'EDDII Output: Table with labels/units; text with labels, units, relation/interaction descriptions',
          icon: Image
        },
        {
          name: 'Error Detection: Identify methodological flaws, statistical inaccuracies, logical inconsistencies',
          icon: Radar
        },
        {
          name: 'Report: Extracted data in table/text, highlighting patterns; detailed breakdown of errors and issues',
          icon: FileText
        },
        {
          name: 'Standard support',
          icon: MdSupport
        }
      ]
      // footer: {
      //   text: 'Additional hours available at $100/hour'
      // }
    },
    {
      name: 'Monthly',
      badge: {
        text: 'Most popular',
        variant: 'popular' as const
      },
      description: 'Best For Regular researchers.',
      price: 20,
      period: 'per month',
      buttonText: 'Get Started – Popular',
      buttonVariant: 'outline' as const,
      features: [
        { name: '1000 credits', icon: Award },
        {
          name: 'EDDII: Extract values, measurements, units, relations, interactions from graphed data images',
          icon: Image
        },
        {
          name: 'EDDII Output: Table with labels/units; text with labels, units, relation/interaction descriptions',
          icon: Image
        },
        {
          name: 'Error Detection: Identify methodological flaws, statistical inaccuracies, logical inconsistencies',
          icon: Radar
        },
        {
          name: 'Report: Extracted data in table/text, highlighting patterns; detailed breakdown of errors and issues',
          icon: FileText
        },
        {
          name: 'Priority support',
          icon: MdSupport
        }
      ]
      // footer: {
      //   text: 'Engagement shoot included',
      //   link: {
      //     text: 'Learn more',
      //     href: '#'
      //   }
      // }
    },
    {
      name: 'Yearly',
      // badge: {
      //   text: 'Advanced',
      //   variant: 'new' as const
      // },
      description: 'Best For Power users, institutions',
      price: 220,
      period: 'per year',
      buttonText: 'Save with Yearly',
      buttonVariant: 'outline' as const,
      features: [
        { name: '12000 credits', icon: Award },
        {
          name: 'EDDII: Extract values, measurements, units, relations, interactions from graphed data images',
          icon: Image
        },
        {
          name: 'EDDII Output: Table with labels/units; text with labels, units, relation/interaction descriptions',
          icon: Image
        },
        {
          name: 'Error Detection: Identify methodological flaws, statistical inaccuracies, logical inconsistencies',
          icon: Radar
        },
        {
          name: 'Report: Extracted data in table/text, highlighting patterns; detailed breakdown of errors and issues',
          icon: FileText
        },
        {
          name: 'Priority support',
          icon: MdSupport
        },
        {
          name: 'Early access to tool upgrades (e.g., enhanced graph extraction, error detection)',
          icon: GiLevelFourAdvanced
        }
      ]
      // footer: {
      //   text: 'Customizable to your specific needs'
      // }
    }
  ];
  return (
    <div>
      <div className='container mx-auto space-y-32 px-4 py-16'>
        <section>
          <GradientHeading className='mb-12 text-center text-3xl font-bold md:text-4xl'>
            Choose Your Perfect Package
          </GradientHeading>
          <div className='grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-3'>
            {plans.map((plan) => (
              <PricingCard key={plan.name} plan={plan} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
