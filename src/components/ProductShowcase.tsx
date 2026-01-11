import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import strawberryImg from '@/assets/strawberry-closeup.jpeg';
import growingImg from '@/assets/growing-strawberry.jpeg';
import harvestImg from '@/assets/fresh-harvest.jpeg';
import singleImg from '@/assets/single-strawberry.jpeg';

const products = [
  {
    name: 'Strawberry',
    tagline: 'The Mahabaleshwar Classic',
    description: 'Sweet, Red, & Juicy. The crown jewel of our farm.',
    image: strawberryImg,
    badge: 'Hero Berry',
    featured: true,
  },
  {
    name: 'Mulberry',
    tagline: 'The Wild Dark Pearl',
    description: 'Deep purple, intensely sweet with earthy undertones.',
    image: growingImg,
    badge: 'Seasonal',
    featured: false,
  },
  {
    name: 'Raspberry',
    tagline: 'Exotic Tartness',
    description: 'Perfect balance of sweet and tart. A true delicacy.',
    image: harvestImg,
    badge: 'Premium',
    featured: false,
  },
  {
    name: 'Golden Berry',
    tagline: 'The Cape Gooseberry',
    description: "Nature's Wrapped Candy. Sweet with a citrus twist.",
    image: singleImg,
    badge: 'Unique',
    featured: false,
  },
];

const ProductShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="berries" className="section-padding bg-muted/30" ref={ref}>
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-secondary font-semibold text-sm tracking-widest uppercase mb-4 block">
            Our Harvest
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">
            The Fab Four
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Four exceptional berries, each with its own character. All grown with love in Gureghar's rich soil.
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -16, transition: { duration: 0.3 } }}
              className={`glass-card-heavy overflow-hidden cursor-pointer group ${
                product.featured ? 'ring-2 ring-primary/30' : ''
              }`}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-soil/60 to-transparent" />
                
                {/* Badge */}
                <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                  product.featured 
                    ? 'bg-gradient-primary text-primary-foreground' 
                    : 'bg-gradient-gold text-soil'
                }`}>
                  {product.badge}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-serif text-2xl font-bold text-foreground mb-1">
                  {product.name}
                </h3>
                <p className="text-primary font-semibold text-sm mb-3">
                  {product.tagline}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute -inset-4 bg-primary/5 blur-2xl" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <a
            href="https://wa.me/919356257779?text=Hi!%20I%20want%20to%20know%20about%20all%20berries%20available"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-gradient inline-flex items-center gap-2"
          >
            Check Availability
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductShowcase;
