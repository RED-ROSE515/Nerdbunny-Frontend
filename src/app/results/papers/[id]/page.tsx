'use client';

import React, { use, useState } from 'react';

import {
  Button,
  Checkbox,
  CheckboxGroup,
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
  useDisclosure
} from '@heroui/react';
import { FileChartColumn, Newspaper, OctagonX } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { IoSettingsOutline } from 'react-icons/io5';
import { SiRoamresearch } from 'react-icons/si';

import Loader from '@/components/common/loader';
import AuthorSection from '@/components/paper/author-section';
import { Carousel } from '@/components/paper/carousel/carousel';
import KeywordsSection from '@/components/paper/keywords-section';
import PaperLinkSection from '@/components/paper/papaer-link-section';
import { citations, Option } from '@/components/paper/paper-input-wrapper';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useAnalyze } from '@/contexts/AnalyzeContext';
import useGetData from '@/lib/service/get-data';

export default function App({ params }: any) {
  const router = useRouter();
  const resolvedParams = use(params);
  const { id } = resolvedParams as any;
  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
  const { data: paperData, isLoading: paperLoading } = useGetData(`papers/${id}/`);
  const { handleAnalyze, isChecking } = useAnalyze();
  const [visibility, setVisibility] = useState(['nobody']);
  const [users, setUsers] = useState<Option[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [processType, setProcessType] = useState('');
  const [selected, setSelected] = useState('equal');
  const [citation, setCitation] = useState('APA');
  const [summaryOption, setSummaryOption] = useState('Basic');
  const [advancedMethods, setAdvancedMethods] = useState<string[]>(['Method']);
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
      subActionTitle: 'Generate Article',
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
    }
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
                <h1 className='mt-4 text-center text-lg font-bold md:text-3xl'>
                  {paperData.metadata.title}
                </h1>
              </CardHeader>
              <CardContent className='flex flex-col gap-4 p-1 md:p-6'>
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
                    Abstract :
                  </h2>
                  <span>{paperData.metadata.abstract}</span>
                </div>
                <div className='flex w-full flex-row items-center justify-center'>
                  <Carousel items={items} />
                </div>
              </CardContent>
            </Card>
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
                        : 'Extract All Figures'}
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
                              <span>
                                Generate the basic concept summary for this research paper.
                              </span>
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
                                      onPress={() => setCitation(citation.key)}
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
                    ) : (
                      <div className='min-h-[150px]'>
                        <span>
                          Extract all figures from the paper and create a report for each figure.
                        </span>
                      </div>
                    )}
                  </ModalBody>
                  <ModalFooter>
                    <Button color='danger' variant='light' onPress={onClose}>
                      Close
                    </Button>
                    <Button
                      color='primary'
                      onPress={() => {
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
                        }
                        onClose();
                      }}
                    >
                      Generate
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
