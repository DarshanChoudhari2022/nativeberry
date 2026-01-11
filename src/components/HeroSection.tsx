import { ChevronDown, MessageCircle, Phone, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import singleStrawberry from '@/assets/single-strawberry.jpeg';

const HeroSection = () => {
  const handleWhatsAppOrder = () => {
    window.open('https://wa.me/919356257779?text=Hi! I want to order fresh strawberries from Native Berry Farms.', '_blank');
  };

  return (
    <section className="min-h-screen section-red relative overflow-hidden flex items-center bg-pattern-strawberry">
      {/* Decorative strawberry outlines in background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="absolute top-20 right-20 w-64 h-64" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
          <path d="M50 10 C20 20, 10 50, 30 80 C40 95, 60 95, 70 80 C90 50, 80 20, 50 10" />
        </svg>
        <svg className="absolute bottom-20 left-20 w-48 h-48" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
          <path d="M50 10 C20 20, 10 50, 30 80 C40 95, 60 95, 70 80 C90 50, 80 20, 50 10" />
        </svg>
      </div>

      {/* Logo - Top Left */}
      <div className="absolute top-6 left-6 md:left-12 z-20">
        <div className="flex items-center gap-3">
          {/* Logo Icon */}
          <div className="w-12 h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
            <span className="text-2xl md:text-3xl">🍓</span>
          </div>
          {/* Logo Text */}
          <div>
            <h1 className="font-script text-2xl md:text-3xl text-white leading-none">Native Berry</h1>
            <p className="text-white/80 text-xs md:text-sm tracking-widest uppercase">Farms</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 pt-24 lg:pt-0">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          
          {/* Left: Text Content */}
          <motion.div 
            className="flex-1 text-center lg:text-left max-w-xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <Leaf className="w-4 h-4 text-green-300" />
              <span className="text-white/90 text-sm font-medium">Since 1999 • Gureghar, Mahabaleshwar</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-script text-5xl md:text-7xl lg:text-8xl text-white text-shadow leading-none mb-4">
              Native Berry
            </h1>
            <h2 className="font-script text-4xl md:text-5xl lg:text-6xl text-golden leading-none mb-6">
              Farms
            </h2>

            {/* Tagline */}
            <p className="text-white/90 text-lg md:text-xl mb-4 font-light leading-relaxed">
              The Real Gavakries of Mahabaleshwar
            </p>
            <p className="text-white/70 text-base md:text-lg mb-8 leading-relaxed">
              Farm-fresh strawberries grown with 25+ years of legacy. 
              Harvested at sunrise, delivered to your doorstep. No middlemen.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.button
                onClick={handleWhatsAppOrder}
                className="group flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="w-6 h-6" />
                Order on WhatsApp
              </motion.button>
              
              <motion.a
                href="tel:+919284639747"
                className="group flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/30 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-5 h-5" />
                Call Farmer
              </motion.a>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center gap-6 mt-8 justify-center lg:justify-start">
              <div className="text-center">
                <p className="text-3xl font-bold text-white">25+</p>
                <p className="text-white/60 text-sm">Years</p>
              </div>
              <div className="w-px h-10 bg-white/20"></div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">4</p>
                <p className="text-white/60 text-sm">Berry Types</p>
              </div>
              <div className="w-px h-10 bg-white/20"></div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">10AM</p>
                <p className="text-white/60 text-sm">Daily Dispatch</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Complete Strawberry Image */}
          <motion.div 
            className="flex-1 flex justify-center relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-400/30 to-pink-500/30 blur-3xl rounded-full scale-110"></div>
              
              {/* Main strawberry image - Complete circular */}
              <motion.img
                src={singleStrawberry}
                alt="Fresh Mahabaleshwar Strawberry"
                className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] object-cover rounded-full shadow-2xl"
                style={{ 
                  filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.4))'
                }}
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-full border-4 border-white/20 scale-110"></div>
              
              {/* Floating badge */}
              <motion.div 
                className="absolute -bottom-4 -right-4 bg-golden text-red-900 px-4 py-2 rounded-full font-bold shadow-lg"
                animate={{ rotate: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                100% Fresh
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-white/70" />
        </motion.div>
      </div>

      {/* Bottom Info Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/30 to-transparent py-6">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm">
            <span>📍 Behind Mapro Garden, Gureghar</span>
            <span className="hidden md:inline">•</span>
            <span>📞 +91 93562 57779</span>
            <span className="hidden md:inline">•</span>
            <span>🚚 Daily delivery to Pune & Mumbai</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
