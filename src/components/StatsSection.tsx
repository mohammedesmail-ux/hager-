import { motion } from 'motion/react';
import { config } from '../config/content';

export function StatsSection() {
  return (
    <section className="py-24 px-6 md:px-12 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-serif text-gray-800 mb-16"
        >
          {config.stats.title}
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {config.stats.items.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring" }}
              className="flex flex-col items-center justify-center text-center group"
            >
              <span className="text-4xl md:text-5xl font-serif text-rose-400 mb-2 group-hover:scale-105 transition-transform duration-300">
                {stat.value}
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium opacity-60 text-text-main max-w-[120px]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
