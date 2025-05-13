'use client';

import React, { useTransition } from 'react'; // Added import for React

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import DarkLogo from 'public/LogoLime.png';
import LightLogo from 'public/LogoPurple.png';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

import UserMenu from './auth/user-menu';
import { MenuBar } from './home/menu-bar';
import { NavMenuBar } from './home/nav-menu';
import { NavUser } from './home/nav-user';
import ThemeToggle from './theme-toggle';

// import { SidebarTrigger } from './ui/sidebar';
const user = {
  name: 'shadcn',
  email: 'm@example.com',
  avatar: '/avatars/shadcn.jpg'
};
export default function Navbar({ className, isHome }: { className?: string; isHome?: boolean }) {
  const { isAuthenticated } = useAuth();
  const [signInPending, startSignInTransition] = useTransition();
  const [signUpPending, startSingUpTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`z-10 flex items-center justify-between border-b border-border/10 bg-transparent px-6 py-4 backdrop-blur-sm ${isHome && pathname === '/' ? 'hidden' : 'sticky top-0'} ${className}`}
    >
      <Link href='/' className='flex h-12 items-center space-x-2 overflow-hidden'>
        <div className='hidden w-[70%] dark:block md:w-full'>
          <Image
            src={DarkLogo.src}
            className='object-cover'
            width={300}
            height={100}
            alt='Nerdbunny Logo'
          />
        </div>
        <div className='block w-[70%] dark:hidden md:w-full'>
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
        {isAuthenticated && (
          <div className='hidden items-center md:flex'>
            <NavMenuBar />
          </div>
        )}
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
      {/* <SidebarTrigger /> */}
      <div className='flex flex-row items-center justify-center gap-0 text-foreground md:hidden'>
        <div className='w-full'>
          <ThemeToggle />
        </div>
        <NavUser />
      </div>
    </motion.nav>
  );
}

export function NavLink({
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
