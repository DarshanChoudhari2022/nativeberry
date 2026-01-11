import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import farmRowsImg from '@/assets/farm-rows.jpeg';

const timelineEvents = [
  {
    year: '1920s',
    title: 'The British Legacy',
    description: 'British introduce strawberries to the hills of Mahabaleshwar.',
  },
  {
    year: '1930s',
    title: 'Gureghar Adopts',
    description: 'Our ancestors in Gureghar village embrace the new crop, learning its secrets.',
  },
  {
    year: '1999',
    title: 'Native Berry Farms',
    description: 'The Gade family formally establishes Native Berry Farms with a vision.',
  },
  {
    year: 'Today',
    title: 'Direct to You',
    description: 'Three generations later, we bring farm-fresh berries straight to your doorstep.',
  },
];

const TimelineSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding bg-background relative overflow-hidden" ref={ref}>
      {/* Background Image with overlay */}
      <div className="absolute inset-0 opacity-5">
        <img
          src={farmRowsImg}
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
            Our Legacy
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">
            A Century of Berries
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From British gardens to your table — a legacy of passion, patience, and perfect berries.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent transform md:-translate-x-1/2" />

          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.year}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex items-center gap-8 mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background transform -translate-x-1/2 z-10" />

              {/* Content Card */}
              <div
                className={`ml-20 md:ml-0 md:w-[calc(50%-2rem)] ${
                  index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'
                }`}
              >
                <div className="glass-card p-6 card-3d">
                  <span className="legacy-badge text-xs mb-3 inline-block">
                    {event.year}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                    {event.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {event.description}
                  </p>
                </div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block md:w-[calc(50%-2rem)]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
