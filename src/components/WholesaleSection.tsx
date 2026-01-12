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
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <Reveal>
              <p className="text-red-deep font-semibold text-sm tracking-widest uppercase mb-4">
                {t('nav.wholesale')}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-script leading-normal py-2">
                {t('wholesale.title')}
              </h2>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                {t('wholesale.desc')}
              </p>
            </Reveal>

            <div className="space-y-6">
              {options.map((option, index) => (
                <Reveal key={option.title} delay={0.4 + (index * 0.1)}>
                  <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/50 transition-colors">
                    <div className="p-3 bg-red-50 text-red-600 rounded-xl">
                      <option.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{option.title}</h3>
                      <p className="text-gray-500 text-sm">{option.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.7}>
              <button
                onClick={() => window.open('https://wa.me/918605589062', '_blank')}
                className="mt-10 bg-red-700 text-white px-8 py-4 rounded-full font-bold hover:bg-red-800 transition-colors shadow-lg hover:shadow-xl w-full sm:w-auto"
              >
                {t('wholesale.partner')}
              </button>
            </Reveal>
          </div>

          {/* Image */}
          <Reveal delay={0.5}>
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={blueCrateImg}
                  alt="Wholesale Strawberries"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl max-w-[200px]">
                <p className="font-bold text-3xl text-red-600 mb-1">25+</p>
                <p className="text-gray-600 text-sm font-medium">{t('wholesale.excellence')}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default WholesaleSection;
