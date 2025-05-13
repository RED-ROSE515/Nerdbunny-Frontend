'use client';

import React, { use, useState } from 'react';

import {
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Tooltip
} from '@heroui/react';

import Loader from '@/components/common/loader';
import UserSearchBar from '@/components/common/user-search';
import AuthorSection from '@/components/paper/author-section';
import { Carousel } from '@/components/paper/carousel/carousel';
import KeywordsSection from '@/components/paper/keywords-section';
import PaperLinkSection from '@/components/paper/papaer-link-section';
import { Option } from '@/components/paper/paper-input-wrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import useGetData from '@/lib/service/get-data';
import { postApis } from '@/lib/utils/apis';

export default function App({ params }: any) {
  const resolvedParams = use(params);
  const { id } = resolvedParams as any;
  const { data: paperData, isLoading: paperLoading } = useGetData(`papers/${id}/`);
  const [visibility, setVisibility] = useState([paperData?.visibility]);
  const { user } = useAuth();
  const [showVisibilityModal, setShowVisibilityModal] = useState(false);
  const [users, setUsers] = useState<Option[]>([]);

  const options = [
    { key: 'public', label: 'Everyone' },
    // { key: 'followers', label: 'My Followers' },
    // { key: 'specific_users', label: 'Specific Users' },
    { key: 'private', label: 'Nobody' }
  ];
  return (
    <div>
      {!paperData ? (
        <Loader />
      ) : (
        <React.Fragment>
          <div className='my-8 flex w-full max-w-[95vw] items-center justify-center gap-8 md:max-w-[90vw]'>
            <Card className='w-full'>
              <CardHeader>
                <div className='flex flex-row items-center justify-around gap-8'>
                  <h1 className='mt-4 text-center text-lg font-bold md:text-3xl'>
                    {paperData.metadata.title}
                  </h1>
                  {paperData.paper_owner?.email === user?.detail?.email && (
                    <Tooltip content='Change Visibility'>
                      <Button onClick={() => setShowVisibilityModal(true)}>
                        <span className='text-primary-foreground'>Set Privacy</span>
                      </Button>
                    </Tooltip>
                  )}
                </div>
              </CardHeader>
              <CardContent className='flex flex-col gap-4 p-1 md:p-6'>
                <div className='flex w-full flex-row items-center justify-end gap-2'>
                  <Chip variant='bordered'>
                    <span className='font-bold'>
                      {paperData?.visibility === 'private'
                        ? 'This post is private.'
                        : paperData?.visibility === 'followers'
                          ? 'This post is visible to followers.'
                          : paperData?.visibility === 'specific_users'
                            ? 'This post is visible to specific users.'
                            : 'This post is public.'}
                    </span>
                  </Chip>
                </div>
                <div className='flex w-full flex-col items-start justify-center gap-10 md:flex-row md:p-2'>
                  <div className='w-full md:w-2/3'>
                    <AuthorSection authors={paperData.metadata.authors} />
                  </div>
                  <div className='w-full md:w-1/3'>
                    <PaperLinkSection paperLink={paperData.metadata.paper_link} />
                  </div>
                </div>
                <div className='flex w-full flex-col items-start justify-center gap-10 md:flex-row md:p-2'>
                  <KeywordsSection keywords={paperData.metadata.keywords} />
                </div>
                <div className='rounded-lg border border-border/20 bg-gradient-to-b from-background/80 to-background/40 p-2 shadow-xl backdrop-blur-lg'>
                  <h2 className='text-md w-full text-[#828489] dark:text-[#AAB5C7] md:mb-2 md:w-auto md:text-xl'>
                    Summary :
                  </h2>
                  <span>{paperData.metadata.abstract}</span>
                </div>
                <div className='flex w-full flex-row items-center justify-center'>
                  <Carousel id={id} />
                </div>
              </CardContent>
            </Card>
          </div>
          <Modal
            backdrop='opaque'
            isOpen={showVisibilityModal}
            onClose={() => setShowVisibilityModal(false)}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className='flex flex-col gap-1 text-red-500'>
                    Change Visibility of your post.
                  </ModalHeader>
                  <ModalBody>
                    <div className='mt-4 flex w-full flex-col justify-center gap-5 pb-16'>
                      <span>
                        Currently, your post is private. You can change the visibility to public or
                        specific users.
                      </span>
                      <div className='w-full md:w-full'>
                        <Select
                          isRequired
                          variant='faded'
                          className='max-w-xs'
                          defaultSelectedKeys={['private']}
                          placeholder='Select visibility.'
                          selectedKeys={new Set(visibility)}
                          onSelectionChange={(keys) => setVisibility([...keys] as string[])}
                        >
                          {options.map((option) => (
                            <SelectItem key={option.key}>{option.label}</SelectItem>
                          ))}
                        </Select>
                      </div>
                      {visibility[0] === 'specific_users' && (
                        <UserSearchBar
                          setUsers={setUsers}
                          users={users}
                          disabled={visibility[0] !== 'specific_users'}
                        />
                      )}
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color='primary'
                      onClick={async () => {
                        setShowVisibilityModal(false);
                        await postApis.changePostVisibility(
                          id,
                          visibility[0],
                          users.map((user) => user.value)
                        );
                      }}
                    >
                      OK
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </React.Fragment>
      )}
    </div>
  );
}
