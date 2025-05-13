'use client';

import React from 'react';

import { Card, CardBody, Tab, Tabs } from '@heroui/react';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { AiOutlineAudit } from 'react-icons/ai';
import { ImProfile } from 'react-icons/im';
import { IoNewspaper } from 'react-icons/io5';
import { MdLogin } from 'react-icons/md';

import { useAuth } from '@/contexts/AuthContext';

import { MusicIcon, TelegramSvg, TiktokSvg, TwitterSvg } from './common/svgs';
import { NavLink } from './navbar';

export default function Footer() {
  const { isAuthenticated, user } = useAuth();
  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
  const NOBLEBLOCKS_DOMAIN = process.env.NEXT_PUBLIC_NOBLEBLOCKS_DOMAIN;
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  return (
    <footer className='flex w-full items-center justify-center border-t border-border bg-transparent text-sm backdrop-blur-sm'>
      <div className='flex w-full flex-col items-center justify-center md:py-2'>
        <div className='flex w-full flex-col items-center justify-center p-4 px-1 md:hidden'>
          <Card className='mb-4 w-full'>
            <CardBody>
              <div
                className={`flex w-full flex-row items-center justify-between gap-3 px-4 text-slate-800 dark:text-[#697078]`}
              >
                <div className='flex flex-col items-start justify-center gap-1'>
                  <a href='https://nerdbunny.gitbook.io/nerdbunny'>Whitepaper</a>
                  <a href='https://nerdbunny.gitbook.io/nerdbunny/about-nerdbunny'>About Us</a>
                  <a href='https://nerdbunny.gitbook.io/nerdbunny/our-team'>Our Team</a>
                  <a href='https://nerdbunny.gitbook.io/nerdbunny/tokenomics'>Tokenomics</a>
                  <a href='https://nerdbunny.gitbook.io/nerdbunny/roadmap'>Roadmap</a>
                </div>
                <div className='flex flex-col items-start justify-center gap-1'>
                  <a href='https://nerdbunny.gitbook.io/nerdbunny/faq'>FAQ</a>
                  <a href='https://nerdbunny.gitbook.io/nerdbunny/disclaimer'>Disclaimer</a>
                  <a href='https://nerdbunny.gitbook.io/nerdbunny/cookie-policy'>Cookie Policy</a>
                  <a href='https://nerdbunny.gitbook.io/nerdbunny/terms'>Terms of Service</a>
                  <a href='https://nerdbunny.gitbook.io/nerdbunny/privacy-policy'>Privacy Policy</a>
                </div>
              </div>
            </CardBody>
          </Card>

          <Tabs
            aria-label='Options'
            classNames={{
              tabList: 'gap-4 w-full relative rounded-none p-0 border-t border-divider',
              cursor: 'w-full bg-[#22d3ee]',
              tab: 'max-w-fit px-0 h-12',
              tabContent: 'group-data-[selected=true]:text-[#06b6d4]'
            }}
            selectedKey={pathname}
            color='primary'
            variant='underlined'
          >
            <Tab
              key='/'
              href='/'
              title={
                <div className='flex items-center space-x-2'>
                  <IoNewspaper size={24} />
                  <span>Papers</span>
                </div>
              }
            />
            {isAuthenticated && (
              <Tab
                key='/speeches'
                href='/speeches'
                title={
                  <div className='flex items-center'>
                    <MusicIcon />
                    <span>Speeches</span>
                  </div>
                }
              />
            )}
            <Tab
              key='/check'
              href='/check'
              title={
                <div className='flex items-center space-x-2'>
                  <AiOutlineAudit size={24} />
                  <span>Audit</span>
                </div>
              }
            />
            {!isAuthenticated ? (
              <Tab
                key='login'
                href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login_with_nobleblocks?app_name=NerdBunny&redirect_url=${DOMAIN + '/login_with_nobleblocks'}`}
                title={
                  <div className='flex items-center space-x-2'>
                    <MdLogin size={24} />
                    <span>Login</span>
                  </div>
                }
              />
            ) : (
              <Tab
                key='profile'
                href={`${NOBLEBLOCKS_DOMAIN}/@${user?.detail.user_name}`}
                title={
                  <div className='flex items-center space-x-2'>
                    <ImProfile size={24} />
                    <span>Profile</span>
                  </div>
                }
              />
            )}
          </Tabs>
        </div>
        <div className='hidden w-full flex-col items-center justify-center gap-3 px-20 md:flex'>
          <div
            className={`flex w-full flex-row items-center justify-center gap-1 text-[14px] text-slate-800 dark:text-[#697078] md:gap-[16px] md:text-sm`}
          >
            <div className='flex flex-row items-center justify-center gap-10'>
              <NavLink href='https://nerdbunny.gitbook.io/nerdbunny'>Whitepaper</NavLink>
              <NavLink href='https://nerdbunny.gitbook.io/nerdbunny/about-nerdbunny'>
                About Us
              </NavLink>
              <NavLink href='https://nerdbunny.gitbook.io/nerdbunny/our-team'>Our Team</NavLink>
              <NavLink href='https://nerdbunny.gitbook.io/nerdbunny/tokenomics'>Tokenomics</NavLink>
              <NavLink href='https://nerdbunny.gitbook.io/nerdbunny/roadmap'>Roadmap</NavLink>
              <NavLink href='https://nerdbunny.gitbook.io/nerdbunny/faq'>FAQ</NavLink>
              <NavLink href='https://nerdbunny.gitbook.io/nerdbunny/disclaimer'>Disclaimer</NavLink>
              <NavLink href='https://nerdbunny.gitbook.io/nerdbunny/cookie-policy'>
                Cookie Policy
              </NavLink>
              <NavLink href='https://nerdbunny.gitbook.io/nerdbunny/terms'>
                Terms of Service
              </NavLink>
              <NavLink href='https://nerdbunny.gitbook.io/nerdbunny/privacy-policy'>
                Privacy Policy
              </NavLink>
            </div>
          </div>

          <div className='hidden flex-row justify-center gap-3 md:mt-2 md:flex'>
            <TelegramSvg theme={resolvedTheme} />
            <TwitterSvg theme={resolvedTheme} />
            <TiktokSvg theme={resolvedTheme} />
          </div>
          <div className='flex w-full flex-col items-center text-center text-[#697078]'>
            <span>Contact us: info@nobleblocks.com</span>
            <span>Copyright © 2025 NerdBunny</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
