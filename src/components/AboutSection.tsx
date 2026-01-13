import { Reveal } from '@/components/ui/Reveal';
import { motion } from 'framer-motion';
import { Sprout, Leaf, Home, Truck } from 'lucide-react';
import farmLandscapeImg from '@/assets/farm-landscape.jpeg';
import heroFarmImg from '@/assets/hero-farm.jpeg';
import { useLanguage } from '@/context/LanguageContext';

const AboutSection = () => {
  const { t } = useLanguage();

  const timelineData = [
    {
      year: "1920s",
      title: t('timeline.1920.title'),
      description: t('timeline.1920.desc'),
      icon: Sprout,
      color: "bg-green-500"
    },
    {
      year: "1930s",
      title: t('timeline.1930.title'),
      description: t('timeline.1930.desc'),
      icon: Leaf,
      color: "bg-emerald-500"
    },
    {
      year: "1999",
      title: t('timeline.1999.title'),
      description: t('timeline.1999.desc'),
      icon: Home,
      color: "bg-red-deep"
    },
    {
      year: t('timeline.today.time'),
      title: t('timeline.today.title'),
      description: t('timeline.today.desc'),
      icon: Truck,
      color: "bg-golden"
    }
  ];

  return (
    <section id="about" className="min-h-screen section-light py-10 md:py-20 px-6 md:px-12 relative overflow-hidden">
      {/* Decorative strawberry outlines */}
      <div className="absolute top-20 left-10 opacity-10">
        <svg className="w-32 h-32 text-red-deep" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 10 C20 20, 10 50, 30 80 C40 95, 60 95, 70 80 C90 50, 80 20, 50 10" />
        </svg>
      </div>

      <div className="container mx-auto">
        {/* About Section */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center mb-16 md:mb-24">
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
          <div className="lg:pl-8 mt-12 lg:mt-0 space-y-8">
            <Reveal>
              <p className="text-red-deep font-semibold text-sm tracking-widest uppercase mb-4">
                {t('about.label')}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-red-dark leading-tight mb-4 md:mb-6 py-2">
                {t('about.title1')}<br />
                <span className="font-script text-red-deep">{t('about.title2')}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.4}>
              <p className="text-base md:text-lg text-muted-foreground mb-6 leading-[28px]">
                {t('about.desc1')}
              </p>
            </Reveal>
            <Reveal delay={0.5}>
              <p className="text-muted-foreground mb-6 md:mb-8 leading-[28px] text-sm md:text-base">
                {t('about.desc2')}
              </p>
            </Reveal>

            <Reveal delay={0.6}>
              <blockquote className="border-l-4 border-red-deep pl-6 mb-8 py-2">
                <p className="text-lg md:text-xl font-medium text-red-dark italic leading-relaxed">
                  {t('about.quote')}
                </p>
              </blockquote>
            </Reveal>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mt-16 md:mt-24 relative">
          <div className="text-center mb-16 md:mb-20">
            <p className="text-red-deep font-semibold text-sm tracking-widest uppercase mb-4">
              {t('about.journey')}
            </p>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-red-dark">
              {t('about.legacy')} <span className="font-script text-red-deep">{t('about.years')}</span>
            </h3>
          </div>

          {/* Timeline Container */}
          <div className="relative max-w-4xl mx-auto space-y-8 md:space-y-0">
            {/* Vertical Line - Left on mobile, Center on Desktop */}
            <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gray-200"></div>

            {timelineData.map((item, index) => (
              <motion.div
                key={item.year}
                className={`relative flex items-center mb-12 md:mb-24 last:mb-0 md:justify-between ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                {/* Content Card - Full width with padding on mobile, 5/12 on desktop */}
                <div className={`w-full pl-20 md:pl-0 md:w-[45%] ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
                  }`}>
                  <div className="bg-transparent md:bg-white md:p-0">
                    <span className={`inline-block px-4 py-1.5 rounded-full text-white text-xs font-bold mb-3 shadow-md ${item.color}`}>
                      {item.year}
                    </span>
                    <h4 className="text-xl md:text-2xl font-bold text-red-dark mb-3">{item.title}</h4>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{item.description}</p>
                  </div>
                </div>

                {/* Center/Left Icon */}
                <div className="absolute left-2 md:left-1/2 transform md:-translate-x-1/2 z-10 flex items-center justify-center">
                  <div className={`w-10 h-10 md:w-16 md:h-16 rounded-full ${item.color} flex items-center justify-center shadow-lg border-4 border-white`}>
                    <item.icon className="w-5 h-5 md:w-8 md:h-8 text-white" />
                  </div>
                </div>

                {/* Empty space for alternating layout on desktop - hidden on mobile */}
                <div className="hidden md:block md:w-[45%]"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
