import { motion } from 'framer-motion';
import { Sprout, Leaf, Home, Truck } from 'lucide-react';
import farmLandscapeImg from '@/assets/farm-landscape.jpeg';
import heroFarmImg from '@/assets/hero-farm.jpeg';

const timelineData = [
  {
    year: "1920s",
    title: "British Introduction",
    description: "British introduce strawberries to Mahabaleshwar hill station.",
    icon: Sprout,
    color: "bg-green-500"
  },
  {
    year: "1930s",
    title: "Gureghar Adopts",
    description: "Gureghar village adopts the crop. Our ancestors begin cultivation.",
    icon: Leaf,
    color: "bg-emerald-500"
  },
  {
    year: "1999",
    title: "Native Berry Farms",
    description: "The Gade family establishes Native Berry Farms officially.",
    icon: Home,
    color: "bg-red-deep"
  },
  {
    year: "Today",
    title: "Direct to Doorstep",
    description: "Delivering farm-fresh berries directly to Pune, Mumbai & beyond.",
    icon: Truck,
    color: "bg-golden"
  }
];

const AboutSection = () => {
  return (
    <section id="about" className="min-h-screen section-light py-20 px-6 md:px-12 relative overflow-hidden">
      {/* Decorative strawberry outlines */}
      <div className="absolute top-20 left-10 opacity-10">
        <svg className="w-32 h-32 text-red-deep" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 10 C20 20, 10 50, 30 80 C40 95, 60 95, 70 80 C90 50, 80 20, 50 10" />
        </svg>
      </div>

      <div className="container mx-auto">
        {/* About Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Images Stack */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src={heroFarmImg}
                alt="Berry farm in Mahabaleshwar"
                className="w-full max-w-md rounded-3xl shadow-2xl mx-auto"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 md:right-0 z-20">
              <img
                src={farmLandscapeImg}
                alt="Landscape view"
                className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-2xl shadow-xl border-4 border-white"
              />
            </div>
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-red-deep/10 rounded-full"></div>
          </div>

          {/* Content */}
          <div className="lg:pl-8">
            <p className="text-red-deep font-semibold text-sm tracking-widest uppercase mb-4">
              About Us
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-red-dark leading-tight mb-6">
              It's a Berry's<br />
              <span className="font-script text-red-deep">World!</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Discover the essence of Native Berry Farms. What started with a small farm in Gureghar, Mahabaleshwar has grown into a legacy spanning 25+ years.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Native Berry Farms is more than just a brand; it's a passion for quality. The Gade family cultivates our berries with care, ensuring every bite is a delight.
            </p>

            <blockquote className="border-l-4 border-red-deep pl-6 mb-8">
              <p className="text-xl font-medium text-red-dark italic">
                "It's not just what we grow. It's how we grow it—with care, consistency, and purpose."
              </p>
            </blockquote>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mt-16">
          <div className="text-center mb-16">
            <p className="text-red-deep font-semibold text-sm tracking-widest uppercase mb-4">
              Our Journey
            </p>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-red-dark">
              A Legacy of <span className="font-script text-red-deep">100 Years</span>
            </h3>
          </div>

          {/* Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-green-500 via-red-deep to-golden rounded-full"></div>

            {timelineData.map((item, index) => (
              <motion.div
                key={item.year}
                className={`relative flex items-center mb-16 last:mb-0 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Content Card */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <motion.div 
                    className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <span className={`inline-block px-4 py-1 rounded-full text-white text-sm font-bold mb-3 ${item.color}`}>
                      {item.year}
                    </span>
                    <h4 className="text-xl font-bold text-red-dark mb-2">{item.title}</h4>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </motion.div>
                </div>

                {/* Center Icon */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                  <motion.div 
                    className={`w-14 h-14 rounded-full ${item.color} flex items-center justify-center shadow-lg border-4 border-white`}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <item.icon className="w-6 h-6 text-white" />
                  </motion.div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
