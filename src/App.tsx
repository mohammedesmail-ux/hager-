import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX } from 'lucide-react';
import { HeroSection } from './components/HeroSection';
import { GardenSection } from './components/GardenSection';
import { TimelineSection } from './components/TimelineSection';
import { StatsSection } from './components/StatsSection';
import { LetterSection } from './components/LetterSection';
import { FinalCTASection } from './components/FinalCTASection';
import { FloatingPetals } from './components/FloatingPetals';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // We use a free romantic piano track URL
  const audioUrl = "https://cdn.pixabay.com/download/audio/2022/03/15/audio_24751f9850.mp3?filename=romantic-piano-108210.mp3";

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      } else {
        audioRef.current.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  const handleEnter = () => {
    setHasEntered(true);
    // Optional: Try to play music automatically, but browsers might block it.
    // That's why we have a visible toggle.
  };

  return (
    <div className="min-h-screen bg-champagne text-text-main relative selection:bg-rose-100" style={{ background: 'radial-gradient(circle at top right, var(--color-ivory) 0%, var(--color-blush) 50%, var(--color-champagne) 100%)' }}>
      <audio ref={audioRef} src={audioUrl} loop />

      {/* Music Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button 
          onClick={toggleMute}
          className="p-3 bg-white/40 backdrop-blur-md rounded-full shadow-sm hover:bg-white/60 transition-colors border border-white/50 text-gray-600"
          aria-label={isMuted ? "Unmute music" : "Mute music"}
        >
          {isMuted ? <VolumeX className="w-5 h-5"/> : <Volume2 className="w-5 h-5"/>}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <motion.div key="hero" exit={{ opacity: 0, scale: 1.1 }} transition={{ duration: 1 }}>
            <FloatingPetals count={15} />
            <HeroSection onEnter={handleEnter} />
          </motion.div>
        ) : (
          <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
            <FloatingPetals count={30} />
            
            <main className="relative pb-24">
              <GardenSection />
              <TimelineSection />
              <StatsSection />
              <LetterSection />
              <FinalCTASection />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
