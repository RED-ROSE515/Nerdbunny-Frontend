'use client';

import React from 'react';

import { Award, Camera, Clock, Image, MapPin, Star, Users, Video } from 'lucide-react';

import { PricingCard } from '@/components/pricing/pricing-card';
import { GradientHeading } from '@/components/ui/graident-heading';

export default function Pricing() {
  const plans = [
    {
      name: 'Basic',
      badge: {
        text: 'New',
        variant: 'new' as const
      },
      description: 'Perfect for individuals',
      price: 19,
      // period: 'per session',
      buttonText: 'Get Credits',
      buttonVariant: 'outline' as const,
      features: [
        { name: '2-hour photo session', icon: Camera },
        { name: '50 edited digital photos', icon: Image },
        { name: 'Online gallery', icon: Star },
        { name: '1 location', icon: Users }
      ]
      // footer: {
      //   text: 'Additional hours available at $100/hour'
      // }
    },
    {
      name: 'Premium',
      badge: {
        text: 'Most popular',
        variant: 'popular' as const
      },
      description: 'Ideal for professionals.',
      price: 49,
      buttonText: 'Book Now',
      buttonVariant: 'outline' as const,
      features: [
        { name: 'Full-day coverage (up to 8 hours)', icon: Camera },
        { name: '200 edited digital photos', icon: Image },
        { name: 'Online gallery with downloads', icon: Star },
        { name: 'Multiple locations', icon: Users }
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
      name: 'Commercial',
      badge: {
        text: 'Advanced',
        variant: 'new' as const
      },
      description: 'For businesses and professional needs.',
      price: 99,
      buttonText: 'Get Credits',
      buttonVariant: 'outline' as const,
      features: [
        { name: 'Full-day photo and video shoot', icon: Camera },
        { name: '100 edited photos', icon: Image },
        { name: '5-minute promotional video', icon: Video },
        { name: 'Commercial usage rights', icon: Star }
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
