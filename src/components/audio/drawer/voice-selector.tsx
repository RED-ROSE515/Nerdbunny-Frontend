import React from 'react';

import { Select, SelectItem } from '@heroui/react';

export interface Voice {
  key: string;
  label: string;
}

interface VoiceSelectorProps {
  voices: Voice[];
  selectedVoice: string;
  onVoiceChange: (voice: string) => void;
  className?: string;
}

export const VoiceSelector: React.FC<VoiceSelectorProps> = ({
  voices,
  selectedVoice,
  onVoiceChange,
  className = ''
}) => {
  return (
    <Select
      isRequired
      className={`max-w-sm ${className}`}
      selectedKeys={[selectedVoice]}
      label='Select Voice'
      placeholder='Choose a voice'
    >
      {voices.map((voice) => (
        <SelectItem onPress={() => onVoiceChange(voice.key)} key={voice.key}>
          {voice.label}
        </SelectItem>
      ))}
    </Select>
  );
};
