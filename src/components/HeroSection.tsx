import { ChevronDown, MessageCircle, Phone } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import singleStrawberry from '@/assets/single-strawberry.jpeg';

const HeroSection = () => {
  const { t } = useLanguage();

  const handleWhatsAppOrder = () => {
    window.open('https://wa.me/918605589062?text=Hi! I want to order fresh strawberries from Native Berry Farms.', '_blank');
  };

  return (
    <section id="home" className="min-h-screen section-red relative overflow-hidden bg-pattern-strawberry flex items-center">
      {/* Decorative strawberry outlines in background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="absolute top-20 right-20 w-64 h-64" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
          <path d="M50 10 C20 20, 10 50, 30 80 C40 95, 60 95, 70 80 C90 50, 80 20, 50 10" />
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 w-full">

          {/* Left: Text Content - 50% width on LG */}
          <motion.div
            className="w-full lg:w-1/2 text-center lg:text-left order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Main Heading */}
            <div className="mb-6 lg:mb-8 flex flex-col items-center lg:items-start space-y-0">
              {/* Reduced leading and spacing significantly for tightly stacked look */}
              <h1 className="font-script text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white drop-shadow-lg leading-[0.9] pb-0 mb-0">
                {t('hero.title1')}
              </h1>
              <h1 className="font-script text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white drop-shadow-lg leading-[0.9] pb-0 mb-0">
                {t('hero.title2')}
              </h1>
              <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#FFD700] drop-shadow-md leading-tight pt-2">
                {t('hero.title3')}
              </h2>
            </div>

            {/* Tagline & Desc */}
            <p className="text-white text-lg sm:text-xl md:text-2xl mb-4 font-medium tracking-wide">
              {t('hero.tagline')}
            </p>
            <p className="text-white/90 text-base sm:text-lg mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
              {t('hero.desc')}
            </p>

            {/* CTA Buttons - Improved Contrast */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 lg:mb-0">
              <motion.button
                onClick={handleWhatsAppOrder}
                className="group flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Order on WhatsApp"
              >
                <MessageCircle className="w-6 h-6" />
                {t('hero.whatsapp')}
              </motion.button>

              <motion.a
                href="tel:+919284639747"
                className="group flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-[#D32F2F] px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Call Now"
              >
                <Phone className="w-6 h-6" />
                {t('hero.call')}
              </motion.a>
            </div>

          </motion.div>

          {/* Right: Image - 50% width on LG */}
          <motion.div
            className="w-full lg:w-1/2 flex justify-center lg:justify-end relative order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px]">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-red-400/30 blur-[100px] rounded-full scale-90"></div>

              {/* Main strawberry image */}
              <motion.img
                src={singleStrawberry}
                alt="Fresh Mahabaleshwar Strawberry"
                className="relative w-full h-full object-cover rounded-full shadow-2xl border-4 border-white/20"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Floating badge */}
              <motion.div
                className="absolute bottom-4 right-4 lg:bottom-10 lg:right-0 bg-white text-[#D32F2F] px-6 py-3 rounded-full font-bold shadow-xl text-lg border-2 border-red-100"
                animate={{ rotate: [-3, 3, -3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                🍓 {t('hero.badge')}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
