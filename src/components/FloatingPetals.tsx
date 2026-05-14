import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface Petal {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  duration: number;
  delay: number;
}

export function FloatingPetals({ count = 20 }: { count?: number }) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const generatePetals = () => {
      const newPetals: Petal[] = [];
      for (let i = 0; i < count; i++) {
        newPetals.push({
          id: i,
          x: Math.random() * 100, // percentage of screen width
          y: Math.random() * 100 - 20, // start slightly above screen or randomly
          rotation: Math.random() * 360,
          scale: 0.5 + Math.random() * 0.8,
          duration: 10 + Math.random() * 20,
          delay: Math.random() * 10,
        });
      }
      setPetals(newPetals);
    };

    generatePetals();
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute opacity-60"
          initial={{ 
            x: `${petal.x}vw`, 
            y: '-10vh', 
            rotate: petal.rotation,
            scale: petal.scale 
          }}
          animate={{ 
            y: '110vh', 
            rotate: petal.rotation + (Math.random() > 0.5 ? 360 : -360),
            x: `${petal.x + (Math.random() * 10 - 5)}vw` 
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: "linear",
          }}
        >
          {/* Simple SVG Petal shape */}
          <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5228 10 24 10 24C10 24 20 15.5228 20 10C20 4.47715 15.5228 0 10 0Z" fill="var(--color-blush)" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
