import React from 'react';

import { bookmarkPlugin } from '@react-pdf-viewer/bookmark';
import { ProgressBar, Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { fullScreenPlugin } from '@react-pdf-viewer/full-screen';
import { localeSwitcherPlugin } from '@react-pdf-viewer/locale-switcher';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import { searchPlugin } from '@react-pdf-viewer/search';
import { thumbnailPlugin } from '@react-pdf-viewer/thumbnail';
import { useTheme } from 'next-themes';

import { Card } from '../ui/card';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';
import '@react-pdf-viewer/thumbnail/lib/styles/index.css';
import '@react-pdf-viewer/search/lib/styles/index.css';
import '@react-pdf-viewer/full-screen/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PDFViewer = ({ pdf_url }: { pdf_url: string }) => {
  const { resolvedTheme } = useTheme();
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const localeSwitcherPluginInstance = localeSwitcherPlugin();

  const searchPluginInstance = searchPlugin();
  const thumbnailPluginInstance = thumbnailPlugin();
  const bookmarkPluginInstance = bookmarkPlugin();
  const fullScreenPluginInstance = fullScreenPlugin();
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <Worker workerUrl='/pdf.worker.min.js'>
      <Card className='shadow-xl'>
        <div
          className='h-[80vh] rounded-lg'
          style={{
            flex: 1,
            overflow: 'hidden'
          }}
        >
          <Viewer
            fileUrl={pdf_url}
            theme={resolvedTheme}
            plugins={[
              defaultLayoutPluginInstance,
              bookmarkPluginInstance,
              fullScreenPluginInstance,
              localeSwitcherPluginInstance,
              searchPluginInstance,
              thumbnailPluginInstance,
              pageNavigationPluginInstance
            ]}
            renderLoader={(percentages: number) => (
              <div style={{ width: '240px' }}>
                <ProgressBar progress={Math.round(percentages)} />
              </div>
            )}
          />
        </div>
      </Card>
    </Worker>
  );
};

export default PDFViewer;
