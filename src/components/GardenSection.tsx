import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { config } from '../config/content';

export function GardenSection() {
  const [selectedFlower, setSelectedFlower] = useState<string | null>(null);

  const activeFlowerDef = config.garden.flowers.find(f => f.id === selectedFlower);

  return (
    <section id="garden" className="py-20 px-4 md:px-8 max-w-7xl mx-auto relative z-10 w-full min-h-screen flex flex-col justify-center">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-serif text-gray-800 mb-4"
        >
          {config.garden.title}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-600"
        >
          {config.garden.subtitle}
        </motion.p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto">
        {config.garden.flowers.map((flower, index) => (
          <motion.div
            key={flower.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            onClick={() => setSelectedFlower(flower.id)}
            className="cursor-pointer group relative aspect-square glass-panel overflow-hidden"
          >
            <img 
              src={flower.image} 
              alt={flower.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2D2A26]/80 via-[#2D2A26]/30 to-transparent flex flex-col justify-end p-5 md:p-6">
              <h3 className="text-white font-serif text-lg md:text-xl drop-shadow-sm mb-1">
                {flower.name}
              </h3>
              <p className="text-[10px] uppercase tracking-widest text-[#FDE2E4] opacity-90">
                Tap to bloom
              </p>
            </div>
            {/* Glow effect on hover/active */}
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedFlower && activeFlowerDef && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedFlower(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="glass-panel bg-white/90 max-w-lg w-full rounded-t-[40px] rounded-b-3xl p-8 shadow-[0_20px_50px_-15px_rgba(253,226,228,0.5)] relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedFlower(null)}
                className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-[#FAF7F2] text-text-main border border-rose-100 hover:bg-rose-50 transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
              
              <div className="w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden border border-rose-200 p-1">
                 <img src={activeFlowerDef.image} alt={activeFlowerDef.name} className="w-full h-full object-cover rounded-full" />
              </div>
              
              <div className="text-center">
                <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-rose-500 mb-3 block">
                  {activeFlowerDef.unlockText}
                </span>
                <h3 className="text-3xl font-serif text-text-dark mb-4">
                  {activeFlowerDef.name}
                </h3>
                <p className="text-text-main leading-relaxed font-serif italic text-lg px-2">
                  "{activeFlowerDef.message}"
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
