import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Gift, Truck, ChefHat } from 'lucide-react';
import blueCrateImg from '@/assets/blue-crate.jpeg';

const wholesaleOptions = [
  {
    icon: Gift,
    title: 'Corporate Gifting',
    description: 'Premium packaging for Diwali, festivals & corporate events. Make your gifts unforgettable.',
    cta: 'Get Quote',
  },
  {
    icon: Truck,
    title: 'Wholesale / Retail',
    description: 'Daily bulk dispatch to Pune & Mumbai markets. Reliable supply for fruit sellers.',
    cta: 'Partner Now',
  },
  {
    icon: ChefHat,
    title: 'HORECA',
    description: 'Direct supply to Hotels, Restaurants & Chefs. Premium quality for premium establishments.',
    cta: 'Connect',
  },
];

const WholesaleSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="wholesale" className="section-padding bg-soil text-cream relative overflow-hidden" ref={ref}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-secondary font-semibold text-sm tracking-widest uppercase mb-4 block">
            B2B Partnership
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4">
            Partner with the Source
          </h2>
          <p className="text-cream/70 max-w-2xl mx-auto">
            Cut out the middlemen. Work directly with third-generation farmers for the freshest supply chain.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-heavy">
              <img
                src={blueCrateImg}
                alt="Fresh strawberries in blue crate ready for wholesale"
                className="w-full h-80 md:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-soil/40 to-transparent" />
            </div>
            {/* Floating stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute -bottom-6 -right-6 glass-card-heavy p-4 bg-cream/90 text-foreground"
            >
              <div className="font-serif text-3xl font-bold text-primary">500kg+</div>
              <div className="text-sm text-muted-foreground">Daily Capacity</div>
            </motion.div>
          </motion.div>

          {/* Cards */}
          <div className="space-y-6">
            {wholesaleOptions.map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
                className="bg-cream/10 backdrop-blur-sm border border-cream/20 rounded-2xl p-6 hover:bg-cream/15 transition-all duration-300 card-3d"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0">
                    <option.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-xl font-bold mb-2">
                      {option.title}
                    </h3>
                    <p className="text-cream/70 text-sm mb-4">
                      {option.description}
                    </p>
                    <a
                      href="https://wa.me/919356257779?text=Hi!%20I%20am%20interested%20in%20B2B%20partnership"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary font-semibold text-sm hover:text-secondary/80 transition-colors inline-flex items-center gap-1"
                    >
                      {option.cta} →
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WholesaleSection;
