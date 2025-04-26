'use client';

import React from 'react';

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Image,
  Link
} from '@heroui/react';
import _ from 'lodash';
import { IoNewspaper } from 'react-icons/io5';
import { MdLogout } from 'react-icons/md';

import { useAuth } from '@/contexts/AuthContext';

import useDeviceCheck from '../../lib/hooks/user-device-check';
import { ResearchAuditSVG, SpeechBookSVG } from '../common/svgs';

export default function UserMenu() {
  const { isAuthenticated, user, logout } = useAuth();
  const { isMobile } = useDeviceCheck();
  const NOBLEBLOCKS_DOMAIN = process.env.NEXT_PUBLIC_NOBLEBLOCKS_DOMAIN;

  const iconClasses = `text-xl dark:text-[#E2D8DF] text-[#222429] pointer-events-none flex-shrink-0`;
  const navigateTo = (link: string) => {
    window.location.href = link;
  };
  return (
    <Dropdown
      placement='bottom-end'
      classNames={{
        base: 'before:bg-default-200', // change arrow background
        content:
          'py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black'
      }}
    >
      <DropdownTrigger>
        <Image
          isBlurred
          isZoomed
          alt='User Avatar'
          className='cursor-pointer rounded-md object-cover'
          width={36}
          shadow='lg'
          style={{ height: '36px', width: '36px' }}
          src={
            isAuthenticated
              ? (user?.detail.avatar_url ??
                'https://avatars.githubusercontent.com/u/146516559?s=400&u=8a2fcef9b9079ab60f01db2868d1b1893856a2c3&v=4')
              : 'https://avatars.githubusercontent.com/u/146516559?s=400&u=8a2fcef9b9079ab60f01db2868d1b1893856a2c3&v=4'
          }
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label='Dropdown menu with description'
        variant='faded'
        className='w-[340px]'
      >
        <DropdownSection title=''>
          <DropdownItem key='avatar'>
            <div className='flex justify-between gap-3'>
              <div className='flex flex-row items-center justify-start gap-4'>
                <Image
                  isBlurred
                  isZoomed
                  alt='User Avatar'
                  radius='full'
                  className='object-cover'
                  shadow='lg'
                  style={
                    isMobile ? { height: '30px', width: '30px' } : { height: '50px', width: '50px' }
                  }
                  src={
                    isAuthenticated
                      ? (user?.detail.avatar_url ??
                        'https://avatars.githubusercontent.com/u/146516559?s=400&u=8a2fcef9b9079ab60f01db2868d1b1893856a2c3&v=4')
                      : 'https://avatars.githubusercontent.com/u/146516559?s=400&u=8a2fcef9b9079ab60f01db2868d1b1893856a2c3&v=4'
                  }
                />
                <div className='flex flex-col items-start justify-center'>
                  <Link
                    isExternal
                    href={`${NOBLEBLOCKS_DOMAIN}/@${user?.detail.user_name}`}
                    size='sm'
                    isDisabled={!isAuthenticated}
                  >
                    <h4 className='text-large font-bold leading-none text-default-600'>
                      {_.truncate(user?.detail.first_name, {
                        length: 15,
                        omission: '...'
                      })}
                    </h4>
                  </Link>
                  {/* <Link
                    isExternal
                    href={`${NOBLEBLOCKS_DOMAIN}/@${user?.detail.user_name}`}
                    size='sm'
                    isDisabled={!isAuthenticated}
                  >
                    <h5 className={`text-medium tracking-tight text-[#828489] dark:text-[#798FA6]`}>
                      @{isAuthenticated ? user?.detail.user_name : 'guest'}
                    </h5>
                  </Link> */}
                </div>
              </div>
              {isAuthenticated && (
                <Button
                  className={`rounded-full`}
                  variant='bordered'
                  onPress={() => window.open(`${NOBLEBLOCKS_DOMAIN}/settings`)}
                >
                  Manage Profile
                </Button>
              )}
            </div>
          </DropdownItem>
        </DropdownSection>
        <DropdownSection
          title=''
          classNames={{
            base: 'border-none',
            heading: 'max-h-[320px]'
          }}
          className='w-full rounded-md border-2 border-default-200 p-2'
        >
          <DropdownItem
            key='Research Audit'
            //shortcut="⌘C"
            startContent={
              <>
                <ResearchAuditSVG className={`${iconClasses} hidden dark:block`} color='#E2D8DF' />
                <ResearchAuditSVG className={`${iconClasses} block dark:hidden`} color='#222429' />
              </>
            }
            onPress={() => {
              navigateTo('/check');
            }}
          >
            <span className=''>Research Audit</span>
          </DropdownItem>
          <DropdownItem
            key='speeches'
            //shortcut="⌘S"
            startContent={
              <>
                <SpeechBookSVG className={`${iconClasses} hidden dark:block`} color='#E2D8DF' />
                <SpeechBookSVG className={`${iconClasses} block dark:hidden`} color='#222429' />
              </>
            }
            onPress={() => {
              navigateTo('/speeches');
            }}
          >
            Past Recordings
          </DropdownItem>
          <DropdownItem
            key='whitepaper'
            startContent={<IoNewspaper className={iconClasses} />}
            onPress={() => {
              navigateTo(`https://nerdbunny.gitbook.io/nerdbunny`);
            }}
          >
            WhitePaper
          </DropdownItem>
          <DropdownItem
            key='logout'
            //shortcut="⌘Q"
            color='danger'
            startContent={<MdLogout className={iconClasses} />}
            onPress={() => {
              logout();
              navigateTo('');
            }}
          >
            Log out
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
