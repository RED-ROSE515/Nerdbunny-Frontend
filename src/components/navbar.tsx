'use client';

import React, { useTransition } from 'react'; // Added import for React

import { motion } from 'framer-motion';
import { FileAudio, FileChartColumn, Loader2, Menu, ScanLine, TextCursorInput } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import DarkLogo from 'public/LogoLime.png';
import LightLogo from 'public/LogoPurple.png';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

import UserMenu from './auth/user-menu';
import ThemeToggle from './theme-toggle';
import { SidebarTrigger } from './ui/sidebar';

export default function Navbar() {
  const { isAuthenticated } = useAuth();
  const [signInPending, startSignInTransition] = useTransition();
  const [signUpPending, startSingUpTransition] = useTransition();
  const router = useRouter();
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

      <div className='hidden items-center space-x-4 md:flex'>
        <NavLink href='/ai-editor'>
          <TextCursorInput className='mr-2' />
          AI Editor
        </NavLink>
        <NavLink href='/speeches'>
          <FileAudio className='mr-2' /> Past Recordings
        </NavLink>
        <NavLink href='/check'>
          <ScanLine className='mr-2' />
          Analyze
        </NavLink>
        <NavLink href='/results/eddii'>
          <FileChartColumn className='mr-2' />
          EDDII
        </NavLink>
      </div>

      <div className='hidden items-center space-x-4 md:flex'>
        <ThemeToggle />

        {isAuthenticated ? (
          <UserMenu />
        ) : (
          <React.Fragment>
            <Link href='/auth/signin' prefetch={true}>
              <Button
                variant='ghost'
                className='text-foreground hover:text-primary'
                onClick={() =>
                  startSignInTransition(() => {
                    router.push('/auth/signin');
                  })
                }
              >
                {signInPending ? (
                  <>
                    <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                    Please wait
                  </>
                ) : (
                  <p>Sign In</p>
                )}
              </Button>
            </Link>
            <Link href='/auth/signup' prefetch={true}>
              <Button
                className='bg-primary text-primary-foreground hover:bg-primary/90'
                onClick={() =>
                  startSingUpTransition(() => {
                    router.push('/auth/signup');
                  })
                }
              >
                {signUpPending ? (
                  <>
                    <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                    Please wait
                  </>
                ) : (
                  <>Get Started</>
                )}
              </Button>
            </Link>
          </React.Fragment>
        )}
      </div>
      <SidebarTrigger />
      <Button variant='ghost' size='icon' className='text-foreground md:hidden'>
        <Menu className='h-6 w-6' />
      </Button>
    </motion.nav>
  );
}

function NavLink({
  href,
  children,
  className
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group relative flex flex-row justify-between text-muted-foreground transition-colors hover:text-foreground ${className}`}
    >
      {children}
      <span className='absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all group-hover:w-full' />
    </Link>
  );
}
