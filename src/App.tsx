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
    <div className="min-h-screen bg-champagne text-text-main relative selection:bg-rose-100 overflow-hidden overflow-y-auto" style={{ background: 'radial-gradient(circle at top right, var(--color-ivory) 0%, var(--color-blush) 50%, var(--color-champagne) 100%)' }}>
      {/* Background Shapes */}
      <div className="fixed bottom-10 left-10 opacity-20 pointer-events-none rotate-12 z-0">
         <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path d="M50 10C50 10 35 30 35 50C35 70 50 90 50 90C50 90 65 70 65 50C65 30 50 10 50 10Z" fill="#F43F5E" />
           <path d="M10 50C10 50 30 35 50 35C70 35 90 50 90 50C90 50 70 65 50 65C30 65 10 50 10 50Z" fill="#F43F5E" />
         </svg>
      </div>
      <div className="fixed top-20 right-10 opacity-10 pointer-events-none -rotate-45 z-0">
         <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path d="M50 10C50 10 35 30 35 50C35 70 50 90 50 90C50 90 65 70 65 50C65 30 50 10 50 10Z" fill="#F43F5E" />
           <path d="M10 50C10 50 30 35 50 35C70 35 90 50 90 50C90 50 70 65 50 65C30 65 10 50 10 50Z" fill="#F43F5E" />
         </svg>
      </div>

      <audio ref={audioRef} src={audioUrl} loop />

      {/* Top Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 md:px-12 flex justify-between items-center pointer-events-none">
        <div className="flex items-center space-x-3 pointer-events-auto">
          <div className="w-8 h-8 rounded-full border border-rose-300 flex items-center justify-center">
            <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse"></div>
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-rose-500 hidden sm:block">The Eternal Garden</span>
        </div>
        <div className="flex items-center space-x-4 md:space-x-8 text-[11px] uppercase tracking-widest pointer-events-auto">
          {hasEntered && (
            <>
              <a href="#garden" className="opacity-60 hover:opacity-100 transition-opacity hidden md:block">The Garden</a>
              <a href="#timeline" className="opacity-60 hover:opacity-100 transition-opacity hidden md:block">Our Story</a>
            </>
          )}
          <button 
            onClick={toggleMute}
            className="px-4 py-2 bg-[#3D3A35] text-white rounded-full cursor-pointer hover:bg-rose-900 transition-colors shadow-lg shadow-rose-200/50"
            aria-label={isMuted ? "Unmute music" : "Mute music"}
          >
            {isMuted ? "Play Piano" : "Mute Piano"}
          </button>
        </div>
      </nav>

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
