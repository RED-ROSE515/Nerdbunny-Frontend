import React from 'react';

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Snippet,
  useDisclosure
} from '@heroui/react';
import _ from 'lodash';
import dynamic from 'next/dynamic';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton
} from 'react-share';

const FiShare = dynamic(() => import('react-icons/fi').then((mod) => mod.FiShare), { ssr: false });
const FaFacebook = dynamic(() => import('react-icons/fa').then((mod) => mod.FaFacebook), {
  ssr: false
});
const FaTwitter = dynamic(() => import('react-icons/fa').then((mod) => mod.FaTwitter), {
  ssr: false
});
const FaLinkedin = dynamic(() => import('react-icons/fa').then((mod) => mod.FaLinkedin), {
  ssr: false
});
const FaTelegram = dynamic(() => import('react-icons/fa').then((mod) => mod.FaTelegram), {
  ssr: false
});
const FaWhatsapp = dynamic(() => import('react-icons/fa').then((mod) => mod.FaWhatsapp), {
  ssr: false
});

const ShareButtons = ({
  url,
  title,
  summary,
  width = '50px',
  height = '50px',
  useIcon = true,
  isSpeech = false
}: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Button
        isIconOnly
        className='min-w-0 capitalize'
        variant={useIcon ? (isSpeech ? 'solid' : 'ghost') : 'light'}
        onPress={onOpen}
        radius='sm'
        style={isSpeech ? { width: width, height: height, marginLeft: '0.5rem ' } : {}}
      >
        {useIcon ? <FiShare size={24} /> : 'Share'}
      </Button>
      <Modal backdrop='blur' isOpen={isOpen} onClose={onClose} radius='lg'>
        <ModalContent>
          <ModalHeader>Share</ModalHeader>
          <ModalBody>
            <div className='mb-2 mt-4 flex items-center justify-center space-x-4'>
              <FacebookShareButton url={url} title={title}>
                <button aria-label='Facebook' className='rounded-lg bg-blue-600 p-3'>
                  <FaFacebook />
                </button>
              </FacebookShareButton>
              <TwitterShareButton url={url} title={title}>
                <button aria-label='Twitter' className='rounded-lg bg-blue-400 p-3'>
                  <FaTwitter />
                </button>
              </TwitterShareButton>
              <LinkedinShareButton url={url} title={title} summary={summary}>
                <button aria-label='LinkedIn' className='rounded-lg bg-blue-700 p-3'>
                  <FaLinkedin />
                </button>
              </LinkedinShareButton>
              <TelegramShareButton url={url} title={title}>
                <button aria-label='Telegram' className='rounded-lg bg-blue-500 p-3'>
                  <FaTelegram />
                </button>
              </TelegramShareButton>
              <WhatsappShareButton url={url} title={title}>
                <button aria-label='WhatsApp' className='rounded-lg bg-green-500 p-3'>
                  <FaWhatsapp />
                </button>
              </WhatsappShareButton>
            </div>
            <span className='w-full'>Or share with link</span>
            <Snippet
              variant='shadow'
              hideSymbol
              classNames={{ base: 'w-full', pre: 'truncate max-w-full' }}
            >
              <span className='w-full'>{url}</span>
            </Snippet>
          </ModalBody>
          <ModalFooter>
            <Button color='danger' variant='light' onPress={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ShareButtons;
