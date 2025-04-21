'use client';

import React, { useEffect, useState } from 'react';

import AudioPlayer from '@/components/audio/audio-player';

const SpeechesPage = () => {
  return (
    <div className='flex w-screen flex-row justify-center'>
      <div className={`flex h-[80vh] w-full flex-row justify-center md:p-4`}>
        <AudioPlayer id={null} />
      </div>
    </div>
  );
};

export default SpeechesPage;
