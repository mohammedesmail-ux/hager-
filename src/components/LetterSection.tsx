import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { config } from '../config/content';
import { Heart } from 'lucide-react';

export function LetterSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-24 px-6 md:px-12 relative z-10 flex flex-col items-center justify-center min-h-[70vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12 flex flex-col items-center"
      >
        <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center text-xl text-[#B8860B] mb-4">✉</div>
        <p className="text-[10px] uppercase tracking-widest font-bold text-rose-400 mb-2">Waiting for you</p>
        <h2 className="text-3xl md:text-5xl font-serif text-text-dark mb-4">
          {config.letter.title}
        </h2>
        <p className="text-text-main opacity-80 italic font-serif">There is a letter for you inside...</p>
      </motion.div>

      <div className="relative w-full max-w-lg mx-auto aspect-[4/3] perspective-1000">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="envelope"
              initial={{ rotateX: 10, scale: 0.95 }}
              animate={{ rotateX: 0, scale: 1 }}
              exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.3 } }}
              onClick={() => setIsOpen(true)}
              className="absolute inset-0 cursor-pointer group"
            >
              {/* Envelope Body */}
              <div className="w-full h-full bg-white rounded-t-[40px] rounded-b-[20px] shadow-[0_20px_50px_-15px_rgba(253,226,228,0.5)] border border-rose-50 relative overflow-hidden flex flex-col items-center justify-center">
                 {/* Flap simulation */}
                 <div className="absolute top-0 left-0 right-0 h-1/2 bg-rose-50/30 skew-y-12 origin-top-left border-b border-rose-100/50"></div>
                 <div className="absolute top-0 left-0 right-0 h-1/2 bg-rose-50/30 -skew-y-12 origin-top-right border-b border-rose-100/50"></div>
                 
                 <button className="bg-rose-500 text-white px-8 py-3 rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:bg-rose-600 transition-all shadow-lg shadow-rose-200 z-10 group-hover:scale-105">
                   Open Heart
                 </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="letter"
              initial={{ y: 50, opacity: 0, rotateX: -10 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-white p-8 md:p-12 absolute inset-0 md:-inset-x-8 md:-inset-y-12 overflow-y-auto flex flex-col justify-center text-center shadow-[0_20px_50px_-15px_rgba(253,226,228,0.5)] border border-rose-50 rounded-t-[40px] rounded-b-[20px]"
            >
               <h3 className="text-2xl font-serif text-text-dark mb-6">{config.letter.greeting}</h3>
               <p className="text-text-main font-serif leading-loose italic text-lg md:text-xl mb-8 opacity-80">
                 {config.letter.body}
               </p>
               <div className="font-serif italic text-rose-500 text-xl font-medium">
                 {config.letter.signoff}
               </div>

               <button 
                  onClick={() => setIsOpen(false)}
                  className="mt-12 text-[10px] font-bold text-text-main/50 uppercase tracking-[0.2em] hover:text-rose-500 transition-colors"
                >
                  Close Letter
                </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
