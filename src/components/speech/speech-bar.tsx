import { AnimatePresence, motion } from 'framer-motion';

import SpeechPlayer from '@/components/speech/speech-player';
import { useSpeech } from '@/contexts/SpeechContext';

export default function SpeechBar() {
  const { showSpeech, speechUrl } = useSpeech();
  return (
    <div className='fixed bottom-0 z-10 w-full'>
      <AnimatePresence>
        {showSpeech && speechUrl && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className='mb-4 w-full overflow-hidden sm:px-12'
          >
            <SpeechPlayer audio_url={speechUrl} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
