import React from 'react';

import { Accordion, AccordionItem, Button, Tooltip } from '@heroui/react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { FaPlayCircle } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { RiVoiceAiLine } from 'react-icons/ri';

import ErrorContent from './error-content';
import { SummaryType } from './summary-wrapper';

interface SummaryAccordionProps {
  summaryLevels: SummaryType[];
  paperTitle: string;
  isAuthenticated: boolean;
  showSignInModal: (message: string) => void;
  onVoiceGenerate: (summary: SummaryType) => void;
  onPlayVoice: (speechUrl: string, speechId: string, title: string) => void;
  link?: string;
}

const SummaryAccordion = ({
  summaryLevels,
  paperTitle,
  isAuthenticated,
  showSignInModal,
  onVoiceGenerate,
  onPlayVoice,
  link
}: SummaryAccordionProps) => {
  const { theme } = useTheme();

  return (
    <div className='w-full'>
      <Accordion
        className='w-full px-0'
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              height: 'auto',
              overflowY: 'unset',
              transition: {
                height: {
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                  duration: 1
                },
                opacity: {
                  easings: 'ease',
                  duration: 1
                }
              }
            },
            exit: {
              y: -10,
              opacity: 0,
              height: 0,
              overflowY: 'hidden',
              transition: {
                height: {
                  easings: 'ease',
                  duration: 0.25
                },
                opacity: {
                  easings: 'ease',
                  duration: 0.3
                }
              }
            }
          }
        }}
        variant='splitted'
      >
        {summaryLevels.map((level, index) => (
          <AccordionItem
            key={index}
            textValue={level.title}
            startContent={
              <Image
                priority
                alt='NERDBUNNY LOGO'
                className='rounded-lg'
                height='30'
                src={level.image}
                width='30'
              />
            }
            indicator={({ isOpen }) => (isOpen ? <IoIosArrowForward /> : <IoIosArrowDown />)}
            className={`w-full ${theme === 'dark' ? 'bg-[#2E3E4E]' : 'bg-[#FFF]'} items-center md:min-h-[68px]`}
            title={
              <div className='flex w-full flex-row items-center justify-between'>
                <span className='text-lg' style={{ fontWeight: '500' }}>
                  {level.title}
                </span>
                {link && (
                  <Tooltip
                    content={
                      <strong className='text-md text-center font-bold'>Voice Generator</strong>
                    }
                    placement='top'
                    closeDelay={1000}
                  >
                    {level.speech_url ? (
                      <Button
                        isIconOnly
                        variant='bordered'
                        onPress={() => {
                          onPlayVoice(
                            level.speech_url as string,
                            level.speech_id as string,
                            paperTitle
                          );
                        }}
                        className={`h-[30px] w-[38px] border-none hover:bg-transparent hover:text-pink-600`}
                      >
                        <FaPlayCircle className='w-full p-2' style={{ height: 'fit-content' }} />
                      </Button>
                    ) : (
                      <Button
                        isIconOnly
                        variant='bordered'
                        onPress={() => {
                          isAuthenticated
                            ? onVoiceGenerate(level)
                            : showSignInModal('You need to sign in to continue.');
                        }}
                        className={`h-[30px] w-[38px] border-none border-[#DEE5EB] hover:bg-transparent hover:text-pink-600`}
                      >
                        <RiVoiceAiLine className='w-full p-2' style={{ height: 'fit-content' }} />
                      </Button>
                    )}
                  </Tooltip>
                )}
              </div>
            }
            value={index.toString()}
          >
            {level.value === 'ErrorSummary' ? (
              <div key={index}>
                <ErrorContent content={level.content} />
              </div>
            ) : (
              <div>
                <p
                  className={`text-md font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-slate-800'}`}
                >
                  {level.content}
                </p>
              </div>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default SummaryAccordion;
