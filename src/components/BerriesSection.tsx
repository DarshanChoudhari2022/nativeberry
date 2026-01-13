import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import strawberryImg from '@/assets/strawberry_hero.png';
import mulberryImg from '@/assets/mulberry_hero.png';
import raspberryImg from '@/assets/raspberry_hero.png';
import goldenBerryImg from '@/assets/golden_berry_hero.png';

const berries = [
  {
    name: 'Strawberries',
    image: strawberryImg,
    // Using a deep organic green to match the "Explore the berry patch" reference style
    color: 'text-[#4A6741]',
    link: '/strawberries',
  },
  {
    name: 'Mulberries',
    image: mulberryImg,
    color: 'text-[#4A6741]',
    link: '/mulberries',
  },
  {
    name: 'Raspberries',
    image: raspberryImg,
    color: 'text-[#4A6741]',
    link: '/raspberries',
  },
  {
    name: 'Golden Berries',
    image: goldenBerryImg,
    color: 'text-[#4A6741]',
    link: '/golden-berries',
  },
];

const BerriesSection = () => {
  const { t } = useLanguage();
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Map vertical scroll to horizontal movement
  // Adjusted scroll range for a comfortable pace
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);
  const fade = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  return (
    <section id="berries" ref={targetRef} className="relative bg-[#F9F7F2]">

      {/* ---------------- MOBILE VIEW (Native Horizontal Scroll) ---------------- */}
      <div className="md:hidden py-16 min-h-screen flex flex-col justify-center">
        <div className="text-center px-4 mb-8">
          <h2 className="text-5xl font-bold text-[#2D3A26] font-script mb-2 drop-shadow-sm leading-normal py-2">
            {t('berries.title')}
          </h2>
          <p className="text-[#5C6B50] text-xs tracking-[0.2em] uppercase font-medium leading-relaxed py-1">
            {t('berries.subtitle')}
          </p>
        </div>

        {/* Native Scroll Container */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-8 scrollbar-hide w-full">
          {berries.map((berry) => (
            <Link to={berry.link} key={berry.name} className="snap-center flex-shrink-0 w-[85vw] flex flex-col items-center justify-center p-4">
              <div className="relative w-64 h-64 mb-6">
                <img
                  src={berry.image}
                  alt={berry.name}
                  className="w-full h-full object-contain filter drop-shadow-xl"
                  style={{ filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.15))' }}
                />
              </div>
              <div className="flex items-center gap-2">
                <h3 className={`text-4xl font-script font-bold ${berry.color} drop-shadow-sm`}>
                  {t(`berry.${berry.name.toLowerCase().replace(' ', '')}`)}
                </h3>
                <ChevronRight className={`w-6 h-6 ${berry.color} opacity-80`} />
              </div>
            </Link>
          ))}
          {/* Padding End */}
          <div className="w-6 flex-shrink-0"></div>
        </div>
      </div>


      {/* ---------------- DESKTOP VIEW (Insane Sticky Scroll) ---------------- */}
      <div className="hidden md:block h-[250vh] relative">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">

          {/* Decorative Horizontal Line */}
          <div className="absolute top-[55%] left-0 w-full h-[1px] bg-neutral-200/60 -z-10" />

          {/* Floating Header */}
          <motion.div
            style={{ opacity: fade, scale, willChange: 'opacity, transform' }}
            className="absolute top-[5vh] w-full text-center z-10 px-4 pointer-events-none"
          >
            <h2 className="text-6xl lg:text-7xl font-bold text-[#2D3A26] font-script mb-4 drop-shadow-sm leading-normal py-2">
              {t('berries.title')}
            </h2>
            <p className="text-[#5C6B50] text-base tracking-[0.2em] uppercase font-medium mt-2 leading-relaxed py-1">
              {t('berries.subtitle')}
            </p>
          </motion.div>

          {/* Horizontal Scroll Track */}
          {/* Reduced padding-left to center the start better, adjusted gap */}
          <motion.div style={{ x }} className="flex items-center gap-16 pl-[15vw] pt-[35vh]">
            {berries.map((berry) => (
              <Link to={berry.link} key={berry.name}>
                <div
                  className="group relative flex-shrink-0 w-[280px] flex flex-col items-center justify-center cursor-pointer py-6"
                >
                  {/* Image Area - Significantly smaller to match screenshot */}
                  <div className="relative w-48 h-48 lg:w-56 lg:h-56 flex items-center justify-center transition-all duration-500 ease-out group-hover:-translate-y-4 group-hover:scale-110">
                    <img
                      src={berry.image}
                      alt={berry.name}
                      className="w-full h-full object-contain filter drop-shadow-xl"
                      style={{ filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.15))', willChange: 'transform' }}
                    />
                  </div>

                  {/* Title & Arrow - Scaled down */}
                  <div className="mt-6 flex items-center justify-center gap-2 transition-all duration-300 group-hover:gap-3">
                    <h3 className={`text-3xl lg:text-4xl font-script font-bold ${berry.color} drop-shadow-sm`}>
                      {t(`berry.${berry.name.toLowerCase().replace(' ', '')}`)}
                    </h3>
                    <ChevronRight className={`w-6 h-6 ${berry.color} opacity-80 transition-transform duration-300 group-hover:translate-x-1`} />
                  </div>
                </div>
              </Link>
            ))}

            {/* Spacer */}
            <div className="w-[20vw]"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BerriesSection;
