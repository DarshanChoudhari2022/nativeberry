import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import heroImage from '@/assets/hero-farm.jpeg';

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      {/* Parallax Background Image */}
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src={heroImage}
          alt="Native Berry Farms - Fresh strawberries from Mahabaleshwar"
          className="w-full h-[120%] object-cover"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 hero-overlay" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 min-h-screen flex flex-col justify-end pb-20 md:pb-32 px-4 md:px-8"
      >
        <div className="container mx-auto">
          {/* Legacy Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-6"
          >
            <span className="legacy-badge inline-flex items-center gap-2 animate-float">
              <span className="text-lg">🍓</span>
              Since 1999 | Original Soil
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-cream leading-tight max-w-4xl mb-6"
          >
            The Real Gavakries of Mahabaleshwar.
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-cream/90 text-lg md:text-xl lg:text-2xl max-w-2xl font-light leading-relaxed"
          >
            Grown in Gureghar. No Middlemen. Just 25 Years of Mastery.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-wrap gap-4 mt-8"
          >
            <a
              href="https://wa.me/919356257779?text=Hi!%20I%20want%20to%20order%20fresh%20berries"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-gradient text-lg animate-pulse-glow"
            >
              Order Fresh Now
            </a>
            <a
              href="#roots"
              className="px-6 py-3 rounded-full border-2 border-cream/50 text-cream font-semibold hover:bg-cream/10 transition-all duration-300"
            >
              Our Story
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-cream/50 flex items-start justify-center p-2"
        >
          <div className="w-1.5 h-3 bg-cream/70 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
