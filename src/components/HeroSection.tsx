import { ChevronDown, MessageCircle, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import singleStrawberry from '@/assets/single-strawberry.jpeg';

const HeroSection = () => {
  const handleWhatsAppOrder = () => {
    window.open('https://wa.me/919356257779?text=Hi! I want to order fresh strawberries from Native Berry Farms.', '_blank');
  };

  return (
    <section className="min-h-screen section-red relative overflow-hidden bg-pattern-strawberry">
      {/* Decorative strawberry outlines in background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="absolute top-20 right-20 w-64 h-64" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
          <path d="M50 10 C20 20, 10 50, 30 80 C40 95, 60 95, 70 80 C90 50, 80 20, 50 10" />
        </svg>
      </div>


      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10 min-h-screen flex items-center py-24 lg:py-0">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 w-full">
          
          {/* Left: Text Content */}
          <motion.div 
            className="flex-1 text-center lg:text-left order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Main Heading */}
            <h1 className="font-script text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white text-shadow leading-[0.95] mb-1">
              Native
            </h1>
            <h1 className="font-script text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white text-shadow leading-[0.95] mb-1">
              Berry
            </h1>
            <h2 className="font-script text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-golden leading-none mb-6 lg:mb-8">
              Farms
            </h2>

            {/* Tagline */}
            <p className="text-white/90 text-lg sm:text-xl md:text-2xl mb-2 font-light">
              The Real Gavakries of Mahabaleshwar
            </p>
            <p className="text-white/70 text-sm sm:text-base md:text-lg mb-6 lg:mb-8 leading-relaxed max-w-md mx-auto lg:mx-0">
              Farm-fresh strawberries grown with 25+ years of legacy. 
              Harvested at sunrise, delivered to your doorstep. No middlemen.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-6 lg:mb-8">
              <motion.button
                onClick={handleWhatsAppOrder}
                className="group flex items-center justify-center gap-2 sm:gap-3 bg-green-500 hover:bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                Order on WhatsApp
              </motion.button>
              
              <motion.a
                href="tel:+919284639747"
                className="group flex items-center justify-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg border border-white/30 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                Call Farmer
              </motion.a>
            </div>

          </motion.div>

          {/* Right: Complete Strawberry Image */}
          <motion.div 
            className="flex-1 flex justify-center lg:justify-end relative order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-pink-500/20 blur-3xl rounded-full scale-125"></div>
              
              {/* Main strawberry image - Complete circular */}
              <motion.img
                src={singleStrawberry}
                alt="Fresh Mahabaleshwar Strawberry"
                className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] xl:w-[480px] xl:h-[480px] object-cover rounded-full shadow-2xl border-4 border-white/10"
                style={{ 
                  filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.4))'
                }}
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Floating badge */}
              <motion.div 
                className="absolute bottom-4 sm:bottom-8 right-0 sm:right-4 bg-golden text-red-900 px-4 sm:px-5 py-2 sm:py-3 rounded-full font-bold shadow-xl text-sm sm:text-lg"
                animate={{ rotate: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                🍓 100% Fresh
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator - positioned properly */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-white/70" />
        </motion.div>
      </div>

      {/* Bottom Info Bar - All info combined */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent py-2.5">
        <div className="container mx-auto px-3">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-white/90 text-[10px] sm:text-xs">
            <span className="font-semibold">25+ Years</span>
            <span className="text-white/40">•</span>
            <span className="font-semibold">4 Berry Types</span>
            <span className="text-white/40">•</span>
            <span>📍 Behind Mapro Garden</span>
            <span className="text-white/40">•</span>
            <span>📞 +91 93562 57779</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
