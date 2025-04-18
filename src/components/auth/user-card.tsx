import React, { useState } from 'react';

import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Skeleton
} from '@heroui/react';
import _ from 'lodash';
import { CheckIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { MdOutlineContentCopy, MdReport } from 'react-icons/md';
import { PiDotsThreeOutlineVerticalFill } from 'react-icons/pi';

import { AnimatedSubscribeButton } from '@/components/magicui/animated-subscribe-button';
import { useAuth } from '@/contexts/AuthContext';
import useGetData from '@/lib/service/get-data';
import { formatTimestamp } from '@/lib/utils/date';
import { commify } from '@/lib/utils/number';

import { useUserActions } from '../../lib/hooks/use-user-actions';
import useDeviceCheck from '../../lib/hooks/user-device-check';
import { useToast } from '../hooks/use-toast';

interface UserDetail {
  id: string;
  is_following: boolean;
  count_following: number;
  count_follower: number;
}

const UserCard = ({
  userData,
  postDate,
  link,
  showSignInModal,
  totalData,
  reportPost,
  showFollow = true,
  input_tokens,
  output_tokens
}: any) => {
  const formattedDate = `Audited on: ` + formatTimestamp(postDate);
  const { isMobile } = useDeviceCheck();
  const { theme } = useTheme();
  const { handleFollow } = useUserActions({
    showSignInModal
  });

  const [isHovered, setIsHovered] = useState(false);
  const { toast } = useToast();
  const { isAuthenticated, user } = useAuth();
  const NOBLEBLOCKS_DOMAIN = process.env.NEXT_PUBLIC_NOBLEBLOCKS_DOMAIN;
  const { data: userDetail, isLoading: userDetailLoading } = useGetData<UserDetail>(
    `auth/profile?user_id=${userData.id}`
  );

  const follow = async () => {
    if (!isAuthenticated) {
      showSignInModal('You need to sign in to continue.');
      return;
    }
    if (!userDetail) return;
    const success = await handleFollow(userDetail.id, userDetail?.is_following);
    // if (success) {
    //   await fetchUserDetail();
    // }
  };

  return userDetailLoading ? (
    <Card className='h-[61px] w-full space-y-5 p-4' radius='lg'>
      <div className='space-y-3'>
        <Skeleton className='w-3/5 rounded-lg'>
          <div className='h-3 w-3/5 rounded-lg bg-default-200' />
        </Skeleton>
        <Skeleton className='w-4/5 rounded-lg'>
          <div className='h-3 w-4/5 rounded-lg bg-default-200' />
        </Skeleton>
        <Skeleton className='w-2/5 rounded-lg'>
          <div className='h-3 w-2/5 rounded-lg bg-default-300' />
        </Skeleton>
      </div>
    </Card>
  ) : (
    <Card className='w-full border-none bg-transparent' shadow='none'>
      <CardBody className='w-full overflow-hidden'>
        <div className='flex w-full flex-row justify-start gap-3'>
          <Popover
            showArrow
            placement='bottom'
            isOpen={isHovered}
            onOpenChange={(open) => setIsHovered(open)}
          >
            <PopoverTrigger>
              <div className='min-w-fit' onMouseEnter={() => setIsHovered(true)}>
                <Image
                  isBlurred
                  isZoomed
                  alt='User Avatar'
                  className='rounded-[50%] object-cover'
                  width={isMobile ? 36 : 36}
                  shadow='lg'
                  style={
                    isMobile ? { height: '36px', width: '36px' } : { height: '36px', width: '36px' }
                  }
                  src={
                    userData.avatar
                      ? userData.avatar
                      : 'https://avatars.githubusercontent.com/u/146516559?s=400&u=8a2fcef9b9079ab60f01db2868d1b1893856a2c3&v=4'
                  }
                />
              </div>
            </PopoverTrigger>
            <PopoverContent className='p-1' onMouseLeave={() => setIsHovered(false)}>
              <Card className='max-w-[300px] border-none bg-transparent' shadow='none'>
                <CardHeader className='justify-between'>
                  <div className='flex gap-3'>
                    <Avatar isBordered radius='full' size='md' src={userData.avatar} />
                    <div className='flex flex-col items-start justify-center'>
                      <h4 className='text-small font-semibold leading-none text-default-600'>
                        {_.truncate(userData.first_name, {
                          length: 15,
                          omission: '...'
                        })}
                      </h4>
                      <Link
                        isExternal
                        href={`${NOBLEBLOCKS_DOMAIN}/@${userData.username}`}
                        size='sm'
                      >
                        <h5 className='text-small tracking-tight text-blue-700'>
                          {`@` + userData.username}
                        </h5>
                      </Link>
                    </div>
                  </div>
                  {
                    <Button
                      className={'ml-2'}
                      color='primary'
                      radius='full'
                      size='sm'
                      variant={'bordered'}
                      onPress={() =>
                        window.open(`${NOBLEBLOCKS_DOMAIN}/@${userData.username}`, '_blank')
                      }
                    >
                      View Profile
                    </Button>
                  }
                </CardHeader>
                <CardBody className='px-3 py-0'>
                  <p className='pl-px text-small text-default-500'>
                    {_.truncate(userData?.about_me, {
                      length: 100,
                      omission: '...'
                    })}
                    <span aria-label='confetti' role='img'>
                      🎉
                    </span>
                  </p>
                </CardBody>
                <CardFooter className='gap-3'>
                  <div className='flex gap-1'>
                    <p className='text-small font-semibold text-default-600'>
                      {userDetail?.count_following}
                    </p>
                    <p className='text-small text-default-500'>Following</p>
                  </div>
                  <div className='flex gap-1'>
                    <p className='text-small font-semibold text-default-600'>
                      {userDetail?.count_follower}
                    </p>
                    <p className='text-small text-default-500'>Followers</p>
                  </div>
                </CardFooter>
              </Card>
            </PopoverContent>
          </Popover>
          <div className='flex w-0 flex-grow items-center justify-between'>
            <div className='flex w-0 flex-grow flex-col gap-[1px]'>
              <span
                className='max-w-[99%] truncate text-[16px] leading-[16px]'
                style={{ fontWeight: 500 }}
              >
                {userData.first_name}
              </span>
              <span className='truncate text-[14px] font-normal leading-[20px] text-gray-500'>
                {formattedDate}
              </span>
            </div>
            {showFollow && (
              <div className='flex flex-row items-center justify-center'>
                <AnimatedSubscribeButton
                  subscribeStatus={userDetail?.is_following}
                  disabled={!isAuthenticated || userDetail?.id === user.detail.id}
                  onClick={() => follow()}
                >
                  <span className='group inline-flex items-center text-sm'>Follow</span>
                  <span className='group inline-flex items-center text-sm'>
                    <CheckIcon className='mr-2 size-4 rounded-full bg-white text-[#118E40]' />
                    Followed
                  </span>
                </AnimatedSubscribeButton>

                <Popover offset={10} placement='bottom-end' backdrop='transparent'>
                  <PopoverTrigger>
                    <Button
                      isIconOnly
                      className='text-default-900/60 data-[hover]:bg-foreground/10'
                      radius='full'
                      variant='light'
                    >
                      <PiDotsThreeOutlineVerticalFill size={17} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className={`min-w-[150px] border-2 ${theme === 'dark' ? 'border-[#4B5C6E] bg-[#2E3E4E]' : 'border-[#A4A4A4] bg-[#F7F7F7]'}`}
                  >
                    {() => (
                      <div
                        className={`flex w-full flex-col gap-2 ${theme === 'dark' ? 'bg-[#2E3E4E]' : 'bg-[#F7F7F7]'}`}
                      >
                        <Button
                          startContent={<MdOutlineContentCopy size={24} />}
                          className='hover:[#3E5061] w-full'
                          variant='light'
                          onPress={() => {
                            navigator.clipboard.writeText(link);
                            toast({
                              title: 'Success',
                              description: 'Successfully Copied the link!'
                            });
                          }}
                        >
                          Share
                        </Button>
                        <Button
                          variant='light'
                          className='w-full'
                          startContent={<MdReport size={24} />}
                          onPress={reportPost}
                        >
                          {totalData.reported_me ? 'UnReport' : 'Report'}
                        </Button>
                        {input_tokens && output_tokens ? (
                          <Card
                            className={`md:text-md flex w-full flex-row items-center justify-center space-x-4 p-2 text-sm md:p-4 ${theme === 'dark' ? 'bg-[#242F3C]' : 'bg-gray-200'}`}
                          >
                            <p>{`IN: ${commify(input_tokens)}`}</p>
                            <p>|</p>
                            <p>{`OUT: ${commify(output_tokens)}`}</p>
                          </Card>
                        ) : (
                          <div />
                        )}
                      </div>
                    )}
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default UserCard;
