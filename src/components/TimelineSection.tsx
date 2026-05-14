import { motion } from 'motion/react';
import { config } from '../config/content';

export function TimelineSection() {
  return (
    <section id="timeline" className="py-24 px-6 md:px-12 bg-white/20 backdrop-blur-sm z-10 relative">
      <div className="max-w-2xl mx-auto flex flex-col md:flex-row gap-12">
        <div className="md:w-1/3">
          <motion.h4 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase tracking-[0.4em] mb-4 text-rose-400 font-bold italic"
          >
            {config.timeline.title}
          </motion.h4>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg font-serif text-text-dark"
          >
            {config.timeline.subtitle}
          </motion.p>
        </div>

        <div className="md:w-2/3 pl-8 border-l border-rose-100 flex flex-col justify-center space-y-10">
          {config.timeline.events.map((event, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative pl-6"
            >
              <div className="absolute left-[-5px] top-1.5 w-2 h-2 bg-rose-300 rounded-full shadow-[0_0_10px_rgba(251,113,133,0.5)]"></div>
              <div className="text-[10px] opacity-40 uppercase tracking-widest text-text-dark mb-1">{event.date}</div>
              <h3 className="font-serif text-lg text-text-dark mb-1">{event.title}</h3>
              <div className="font-serif text-sm italic text-text-main opacity-80">{event.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
