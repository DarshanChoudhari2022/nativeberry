import { motion } from 'framer-motion';
import { Sprout } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-soil text-cream py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo & Tagline */}
          <div className="text-center md:text-left">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="flex items-center gap-2 justify-center md:justify-start mb-3"
            >
              <Sprout className="w-6 h-6 text-secondary" />
              <span className="font-serif text-xl font-bold tracking-wide">
                NATIVE BERRY FARMS
              </span>
            </motion.div>
            <p className="text-cream/60 text-sm">
              The Real Gavakries of Mahabaleshwar
            </p>
          </div>

          {/* Address */}
          <div className="text-center">
            <p className="text-cream/80 text-sm leading-relaxed">
              Parking No 4, Near Mapro Garden,<br />
              Gureghar, Mahabaleshwar
            </p>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-cream/60 text-sm">
              © 2026 Native Berry Farms.
            </p>
            <p className="text-cream/40 text-xs mt-1">
              Grown with ❤️ in Gureghar
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-cream/10 mt-8 pt-6">
          <p className="text-center text-cream/40 text-xs">
            Since 1999 • Three Generations • Direct from Farm
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
