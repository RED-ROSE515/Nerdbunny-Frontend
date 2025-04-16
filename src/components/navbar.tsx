'use client';

import React from 'react'; // Added import for React

import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import DarkLogo from 'public/LogoLime.png';
import LightLogo from 'public/LogoPurple.png';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

import UserMenu from './auth/user-menu';
import ThemeToggle from './theme-toggle';

export default function Navbar() {
  const { isAuthenticated } = useAuth();
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className='z-10 flex items-center justify-between border-b border-border/10 bg-transparent px-6 py-4 backdrop-blur-sm'
    >
      <Link href='/' className='flex h-12 items-center space-x-2 overflow-hidden'>
        <div className='hidden w-[50%] dark:block md:w-full'>
          <Image
            src={DarkLogo.src}
            className='object-cover'
            width={300}
            height={100}
            alt='Nerdbunny Logo'
          />
        </div>
        <div className='block w-[50%] dark:hidden md:w-full'>
          <Image
            src={LightLogo.src}
            className='object-cover'
            width={300}
            height={100}
            alt='Nerdbunny Logo'
          />
        </div>
      </Link>

      <div className='hidden items-center space-x-8 md:flex'>
        {/* <NavLink href='/features'>Features</NavLink>
        <NavLink href='/how-it-works'>How it Works</NavLink>
        <NavLink href='/examples'>Examples</NavLink>
        <NavLink href='/pricing'>Pricing</NavLink> */}
      </div>

      <div className='hidden items-center space-x-4 md:flex'>
        <ThemeToggle />

        {isAuthenticated ? (
          <UserMenu />
        ) : (
          <React.Fragment>
            <Link href='/auth/signin' prefetch={true}>
              <Button variant='ghost' className='text-foreground hover:text-primary'>
                Sign In
              </Button>
            </Link>
            <Link href='/auth/signup' prefetch={true}>
              <Button className='bg-primary text-primary-foreground hover:bg-primary/90'>
                Get Started
              </Button>
            </Link>
          </React.Fragment>
        )}
      </div>

      <Button variant='ghost' size='icon' className='text-foreground md:hidden'>
        <Menu className='h-6 w-6' />
      </Button>
    </motion.nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className='group relative text-muted-foreground transition-colors hover:text-foreground'
    >
      {children}
      <span className='absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all group-hover:w-full' />
    </Link>
  );
}
