import { motion } from 'motion/react';
import { config } from '../config/content';
import { Heart } from 'lucide-react';

interface HeroSectionProps {
  onEnter: () => void;
}

export function HeroSection({ onEnter }: HeroSectionProps) {
  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center p-6 text-center z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="w-48 h-48 md:w-64 md:h-64 mb-8 rounded-full overflow-hidden shadow-2xl border-4 border-white/50 relative"
      >
        <img 
          src="/Images/Hager.jpg" 
          alt="Beautiful bouquet" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-pink-100/20 mix-blend-overlay"></div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="max-w-xl mx-auto flex flex-col items-center pace-y-6"
      >
        <div className="space-y-1 mb-6">
          <p className="text-rose-500 font-serif italic text-xl md:text-2xl">{config.hero.title}</p>
          <h1 className="text-6xl md:text-8xl font-serif leading-[0.9] text-text-dark pb-2">
            {config.herName}
          </h1>
        </div>
        
        <p className="text-sm md:text-base leading-relaxed opacity-80 max-w-[280px] md:max-w-md mx-auto font-light mb-8">
          {config.hero.subtitle}
        </p>

        <motion.button
          onClick={onEnter}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-[#3D3A35] text-white rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:bg-rose-900 transition-all shadow-lg shadow-rose-200 flex items-center justify-center space-x-2 mx-auto group"
        >
          <span>{config.hero.cta}</span>
          <Heart className="w-4 h-4 group-hover:animate-ping" fill="currentColor"/>
        </motion.button>
      </motion.div>
    </section>
  );
}
