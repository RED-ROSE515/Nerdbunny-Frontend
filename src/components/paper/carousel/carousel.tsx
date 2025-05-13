'use client';

import { useEffect, useRef, useState } from 'react';

import type React from 'react';

import {
  Checkbox,
  CheckboxGroup,
  Chip,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Tab,
  Tabs,
  Tooltip,
  useDisclosure
} from '@heroui/react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BookCopy,
  ChevronLeft,
  ChevronRight,
  FileChartColumn,
  Newspaper,
  OctagonX
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { IoSettingsOutline } from 'react-icons/io5';
import { SiRoamresearch } from 'react-icons/si';

import { citations, Option } from '@/components/paper/paper-input-wrapper';
import { Button } from '@/components/ui/button';
import { useAnalyze } from '@/contexts/AnalyzeContext';
import useGetData from '@/lib/service/get-data';

import { AppCard } from './carousel-card';

const noScrollbarCSS = `
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

interface CarouselProps {
  id: any;
}

export const Carousel: React.FC<CarouselProps> = ({ id }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const { data: paperData, isLoading: paperLoading } = useGetData(`papers/${id}/`);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [processType, setProcessType] = useState('');
  const [visibility, setVisibility] = useState([paperData?.visibility]);
  const [selected, setSelected] = useState('equal');
  const [citation, setCitation] = useState('APA');
  const [users, setUsers] = useState<Option[]>([]);
  const { handleAnalyze } = useAnalyze();
  const [summaryOption, setSummaryOption] = useState('Basic');
  const [advancedMethods, setAdvancedMethods] = useState<string[]>(['Method']);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

  const items = [
    {
      Icon: OctagonX,
      title: 'Discrepancies',
      subActionTitle: 'Analyze Research Paper',
      isDisabled: !(
        paperData?.has_analysis &&
        paperData?.has_summary &&
        paperData?.has_error_summary
      ),
      description: 'Error Detection Results',
      action: () => router.push(DOMAIN + '/results/discrepancies/' + id),
      subAction: () => {
        setProcessType('ResearchCheck');
        onOpen();
      }
    },
    {
      Icon: Newspaper,
      title: 'Article',
      subActionTitle: 'Summarise Research Paper',
      isDisabled: !paperData?.has_article,
      description: 'Article Generation Results',
      action: () => router.push(DOMAIN + '/results/articles/' + id),
      subAction: () => {
        setProcessType('GenerateArticle');
        onOpen();
      }
    },
    {
      Icon: FileChartColumn,
      title: 'EDDII',
      subActionTitle: 'Extract Data',
      isDisabled: !paperData?.has_images,
      description: 'Data Extraction Feature EDDII',
      action: () => router.push(DOMAIN + '/results/eddii/' + id),
      subAction: () => {
        setProcessType('ExtractFigures');
        onOpen();
      }
    },
    {
      Icon: BookCopy,
      title: 'Plagiarism',
      subActionTitle: 'Plagiarism Check',
      isDisabled: !paperData?.has_plagiarism,
      description: 'Check Research Paper for Plagiarism',
      action: () => router.push(DOMAIN + '/results/plagiarism/' + id),
      subAction: () => {
        setProcessType('PlagiarismCheck');
        onOpen();
      }
    }
  ];

  const updateScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', updateScrollButtons);
      return () => carousel.removeEventListener('scroll', updateScrollButtons);
    }
  }, [carouselRef.current]); // Added carouselRef.current as a dependency

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollTo =
        direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;

      carouselRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <>
      <style>{noScrollbarCSS}</style>
      <div className='relative w-full max-w-5xl rounded-3xl border border-border/20 bg-gradient-to-b from-background/80 to-background/40 px-8 py-2 shadow-lg backdrop-blur-xl dark:shadow-2xl'>
        <motion.div
          ref={carouselRef}
          className='no-scrollbar flex space-x-6 overflow-x-auto py-4 scrollbar-hide'
          style={{ scrollSnapType: 'x mandatory', msOverflowStyle: 'none', scrollbarWidth: 'none' }}
        >
          {items.map((item, index) => (
            <motion.div key={index} className='flex-shrink-0' style={{ scrollSnapAlign: 'start' }}>
              <AppCard
                Icon={item.Icon}
                title={item.title}
                subActionTitle={item.subActionTitle}
                isDisabled={item.isDisabled}
                description={item.description}
                onClick={item.action}
                subAction={item.subAction}
              />
            </motion.div>
          ))}
        </motion.div>
        <AnimatePresence>
          {canScrollLeft && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => scroll('left')}
              className='absolute left-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white/80 p-2 shadow-lg backdrop-blur-md transition-colors hover:bg-white'
            >
              <ChevronLeft className='h-6 w-6 text-gray-800' />
            </motion.button>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {canScrollRight && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => scroll('right')}
              className='absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white/80 p-2 shadow-lg backdrop-blur-md transition-colors hover:bg-white'
            >
              <ChevronRight className='h-6 w-6 text-gray-800' />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      <Modal backdrop='opaque' isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                {processType === 'ResearchCheck'
                  ? 'Analyse Manuscript'
                  : processType === 'GenerateArticle'
                    ? 'Summarise Manuscript'
                    : processType === 'ExtractFigures'
                      ? 'Extract Figures'
                      : 'Plagiarism Check'}
              </ModalHeader>
              <ModalBody className='flex flex-col items-center justify-center'>
                {processType === 'ResearchCheck' ? (
                  <div className='min-h-[150px]'>
                    <span>
                      Analyze the paper for inconsistencies, flawed reasoning, or methodological
                      issues.
                    </span>
                  </div>
                ) : processType === 'GenerateArticle' ? (
                  <div className='flex min-h-[250px] flex-col items-center justify-center'>
                    <Tabs
                      aria-label='Options'
                      color='primary'
                      variant='bordered'
                      className='mt-2'
                      selectedKey={summaryOption}
                      onSelectionChange={(key) => setSummaryOption(key as string)}
                    >
                      <Tab
                        key='Basic'
                        title={
                          <div className='flex items-center space-x-2'>
                            <IoSettingsOutline />
                            <span>Basic</span>
                          </div>
                        }
                      >
                        <div className='min-h-[250px]'>
                          <span>Generate the basic concept summary for this research paper.</span>
                        </div>
                      </Tab>
                      <Tab
                        key='Advanced'
                        title={
                          <div className='flex items-center space-x-2'>
                            <SiRoamresearch />
                            <span>Advanced</span>
                          </div>
                        }
                      >
                        <div className='flex min-h-[250px] flex-col gap-2'>
                          <RadioGroup
                            label='Select your favorite city'
                            value={selected}
                            onValueChange={setSelected}
                          >
                            <Radio value='equal'>Weight all sections equally</Radio>
                            <Radio value='seperate'>Based on these methods</Radio>
                          </RadioGroup>
                          <CheckboxGroup
                            isDisabled={selected === 'equal'}
                            defaultValue={['Method']}
                            value={advancedMethods}
                            onValueChange={(keys) => {
                              setAdvancedMethods(keys as string[]);
                              console.log(advancedMethods);
                            }}
                            label='Select methods'
                          >
                            <Checkbox value='Method'>Focus on methods</Checkbox>
                            <Checkbox value='Result'>Focus on Result</Checkbox>
                            <Checkbox value='Limitation'>Highlight limitations</Checkbox>
                            <Checkbox value='Finding'>
                              Highlight main findings/take home messages
                            </Checkbox>
                            <Checkbox value='Data'>Data availability</Checkbox>
                          </CheckboxGroup>
                          <div className='flex flex-row justify-between'>
                            <Select
                              key={'outside'}
                              className='max-w-[200px]'
                              defaultSelectedKeys={['APA']}
                              label='Citation Format'
                              labelPlacement={'outside'}
                              selectedKeys={new Set([citation])}
                              placeholder='Select Citation Format'
                            >
                              {citations.map((citation) => (
                                <SelectItem
                                  key={citation.key}
                                  onClick={() => setCitation(citation.key)}
                                >
                                  {citation.label}
                                </SelectItem>
                              ))}
                            </Select>
                            <Image
                              alt='HeroUI hero Image with delay'
                              height={100}
                              src={citations.find((value) => value.key === citation)?.image.src}
                              width={100}
                            />
                          </div>
                        </div>
                      </Tab>
                    </Tabs>
                  </div>
                ) : processType === 'ExtractFigures' ? (
                  <div className='min-h-[150px]'>
                    <span>
                      Extract all figures from the paper and create a report for each figure.
                    </span>
                  </div>
                ) : (
                  <div className='min-h-[150px]'>
                    <span>Check the research paper for plagiarism and create a report.</span>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='ghost' onClick={onClose}>
                  Close
                </Button>
                <Button
                  color='primary'
                  onClick={() => {
                    if (processType === 'ResearchCheck') {
                      handleAnalyze(id, visibility[0] || '', users, ['ResearchCheck']);
                    } else if (processType === 'GenerateArticle') {
                      handleAnalyze(
                        id,
                        visibility[0] || '',
                        users,
                        ['GenerateArticle'],
                        summaryOption,
                        advancedMethods,
                        citation
                      );
                    } else if (processType === 'ExtractFigures') {
                      handleAnalyze(id, visibility[0] || '', users, ['ExtractFigures']);
                    } else if (processType === 'PlagiarismCheck') {
                      handleAnalyze(id, visibility[0] || '', users, ['PlagiarismCheck']);
                    }
                    onClose();
                  }}
                >
                  <span className='text-primary-foreground'>Generate</span>
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
