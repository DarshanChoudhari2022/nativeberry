import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MessageCircle, Phone, HelpCircle, MapPin } from 'lucide-react';
import farmLandscapeImg from '@/assets/farm-landscape.jpeg';

const contactCards = [
  {
    icon: MessageCircle,
    title: 'WhatsApp Order',
    subtitle: 'Place your order via chat',
    phone: '+91 9356257779',
    link: 'https://wa.me/919356257779?text=Hi!%20I%20want%20to%20order%20fresh%20berries',
    color: 'primary',
    description: 'Quick orders & inquiries',
  },
  {
    icon: Phone,
    title: 'Talk to Farmer',
    subtitle: 'Direct line to the farm',
    phone: '+91 9284639747',
    link: 'tel:+919284639747',
    color: 'secondary',
    description: 'Speak directly with us',
  },
  {
    icon: HelpCircle,
    title: 'Order Support',
    subtitle: 'Any doubts? We help!',
    phone: '+91 9623214755',
    link: 'tel:+919623214755',
    color: 'accent',
    description: 'Tracking & assistance',
  },
];

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="section-padding bg-background relative" ref={ref}>
      {/* Subtle background */}
      <div className="absolute inset-0 opacity-5">
        <img
          src={farmLandscapeImg}
          alt=""
          className="w-full h-full object-cover"
        />
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
            Get in Touch
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">
            Ready to Taste the Difference?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Three ways to connect with us. Choose what suits you best.
          </p>
        </motion.div>

        {/* Contact Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {contactCards.map((card, index) => (
            <motion.a
              key={card.title}
              href={card.link}
              target={card.link.startsWith('http') ? '_blank' : undefined}
              rel={card.link.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="glass-card-heavy p-8 text-center group cursor-pointer"
            >
              {/* Icon */}
              <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                card.color === 'primary' 
                  ? 'bg-primary/10 text-primary' 
                  : card.color === 'secondary'
                  ? 'bg-secondary/20 text-secondary'
                  : 'bg-accent/10 text-accent'
              }`}>
                <card.icon className="w-8 h-8" />
              </div>

              {/* Content */}
              <h3 className="font-serif text-xl font-bold text-foreground mb-1">
                {card.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                {card.subtitle}
              </p>
              
              {/* Phone Number */}
              <div className={`font-semibold text-lg mb-2 ${
                card.color === 'primary' 
                  ? 'text-primary' 
                  : card.color === 'secondary'
                  ? 'text-secondary'
                  : 'text-accent'
              }`}>
                {card.phone}
              </div>
              
              <p className="text-muted-foreground text-xs">
                {card.description}
              </p>
            </motion.a>
          ))}
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="glass-card-heavy p-6 md:p-8 max-w-4xl mx-auto"
        >
          <div className="flex flex-col md:flex-row gap-6 items-center">
            {/* Map Embed */}
            <div className="w-full md:w-2/3 h-64 md:h-80 rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3795.7069837831467!2d73.66097831539882!3d17.926447687608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc265c8c8c8c8c8%3A0x0!2sGureghar%2C%20Mahabaleshwar!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Native Berry Farms Location"
              />
            </div>
            
            {/* Location Info */}
            <div className="w-full md:w-1/3 text-center md:text-left">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto md:mx-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                Visit Our Farm
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Parking No 4, Near Mapro Garden,<br />
                Gureghar, Mahabaleshwar
              </p>
              <a
                href="https://maps.app.goo.gl/8DwvM2JSx2Q4hyME9"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary-gradient text-sm inline-flex items-center gap-2"
              >
                Get Directions
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
