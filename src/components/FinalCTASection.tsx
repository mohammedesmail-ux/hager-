import { motion } from 'motion/react';
import { useState } from 'react';
import confetti from 'canvas-confetti';
import { config } from '../config/content';

export function FinalCTASection() {
  const [hasAnswered, setHasAnswered] = useState(false);

  const triggerConfetti = () => {
    setHasAnswered(true);
    
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#ffc0cb', '#ff69b4', '#ff1493', '#fff']
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ffc0cb', '#ff69b4', '#ff1493', '#fff']
      });
    }, 250);
  };

  return (
    <section className="py-32 px-6 md:px-12 relative z-10 flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto"
      >
        <h2 className="text-4xl md:text-6xl font-serif text-text-dark mb-12 leading-tight">
          {hasAnswered ? "I love you too. ❤️" : config.cta.headline}
        </h2>

        {!hasAnswered && (
          <div className="flex flex-wrap justify-center gap-6">
            {config.cta.buttons.map((btn, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={triggerConfetti}
                className="px-8 py-3 bg-[#3D3A35] text-white rounded-full text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-rose-900 transition-colors shadow-lg shadow-rose-200/50"
              >
                {btn}
              </motion.button>
            ))}
          </div>
        )}

        {hasAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-serif text-rose-500 italic"
          >
            Forever and always.
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
