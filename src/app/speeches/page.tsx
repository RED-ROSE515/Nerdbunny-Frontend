'use client';

import React, { useEffect, useState } from 'react';

import AudioPlayer from '@/components/audio/audio-player';

const SpeechesPage = () => {
  return (
    <div className='flex w-screen flex-row justify-center'>
      <div className={`flex h-[80vh] w-[85%] flex-row justify-center md:p-4`}>
        <AudioPlayer id={null} autoplay={true} />
      </div>
    </div>
  );
};

export default SpeechesPage;
