import { Reveal } from '@/components/ui/Reveal';
import { Gift, Truck, ChefHat } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import blueCrateImg from '@/assets/blue-crate.jpeg';

const options = [
  {
    icon: Gift,
    title: 'Corporate Gifting',
    description: 'Premium packaging for Diwali, festivals & corporate events.',
  },
  {
    icon: Truck,
    title: 'Retail Supply',
    description: 'Direct delivery to supermarkets and organic stores.',
  },
  {
    icon: ChefHat,
    title: 'Chefs & Hotels',
    description: 'Consistent quality supply for premium restaurants.',
  }
];

const WholesaleSection = () => {
  const { t } = useLanguage();

  const options = [
    {
      icon: Gift,
      title: t('wholesale.opt1.title'),
      description: t('wholesale.opt1.desc'),
    },
    {
      icon: Truck,
      title: t('wholesale.opt2.title'),
      description: t('wholesale.opt2.desc'),
    },
    {
      icon: ChefHat,
      title: t('wholesale.opt3.title'),
      description: t('wholesale.opt3.desc'),
    }
  ];

  return (
    <section id="wholesale" className="min-h-screen section-light py-20 px-6 md:px-12 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <Reveal>
              <p className="text-red-deep font-semibold text-sm tracking-widest uppercase mb-4">
                {t('nav.wholesale')}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-script leading-tight py-2">
                {t('wholesale.title')}
              </h2>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                {t('wholesale.desc')}
              </p>
            </Reveal>

            {/* 2x2 Grid for Options - Clean Layout */}
            <div className="grid sm:grid-cols-2 gap-6">
              {options.map((option, index) => (
                <Reveal key={option.title} delay={0.4 + (index * 0.1)}>
                  <div className="flex flex-col gap-3 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all h-full">
                    <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
                      <option.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg mb-1">{option.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{option.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.7}>
              <button
                onClick={() => window.open('https://wa.me/919309393216', '_blank')}
                className="mt-10 bg-red-700 text-white px-8 py-4 rounded-full font-bold hover:bg-red-800 transition-colors shadow-lg hover:shadow-xl w-full sm:w-auto transform hover:-translate-y-1"
              >
                {t('wholesale.partner')}
              </button>
            </Reveal>
          </div>

          {/* Image */}
          <Reveal delay={0.5}>
            <div className="relative order-1 lg:order-2">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
                <img
                  src={blueCrateImg}
                  alt="Wholesale Strawberries"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl max-w-[200px] border border-gray-100">
                <p className="font-bold text-3xl text-red-600 mb-1">25+</p>
                <p className="text-gray-600 text-sm font-medium leading-tight">{t('wholesale.excellence')}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default WholesaleSection;
