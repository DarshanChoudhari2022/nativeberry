import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { X, Check, Truck, Users, Clock, Sprout } from 'lucide-react';

const WhyUsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="roots" className="section-padding bg-background" ref={ref}>
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-secondary font-semibold text-sm tracking-widest uppercase mb-4 block">
            Why Choose Us
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">
            The Difference is Clear
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Not all berries are created equal. See why natives choose the source.
          </p>
        </motion.div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* The Resellers - Left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-8 border-destructive/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <X className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-muted-foreground">
                The Resellers
              </h3>
            </div>
            
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                <span>Sourced from anonymous networks</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                <span>Stored in cold chains for days</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                <span>Corporate managed operations</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                <span>Multiple middlemen markup</span>
              </li>
            </ul>
          </motion.div>

          {/* Native Berry Farms - Right */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-card-heavy p-8 border-primary/30 relative overflow-hidden"
          >
            {/* Highlight glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
            
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-foreground">
                    Native Berry Farms
                  </h3>
                  <span className="legacy-badge text-xs py-1 px-3">The Original</span>
                </div>
              </div>
              
              <ul className="space-y-4 text-foreground">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Grown by the Gade Family in Gureghar</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Harvested at sunrise, dispatched by 10 AM</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Direct from farm to your doorstep</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="font-semibold">We own the soil — 25+ years</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {[
            { icon: Sprout, value: '25+', label: 'Years Farming' },
            { icon: Truck, value: '10AM', label: 'Daily Dispatch' },
            { icon: Users, value: '3', label: 'Generations' },
            { icon: Clock, value: '24hrs', label: 'Farm to Door' },
          ].map((stat, index) => (
            <div key={index} className="glass-card p-6 text-center card-3d">
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="font-serif text-3xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyUsSection;
