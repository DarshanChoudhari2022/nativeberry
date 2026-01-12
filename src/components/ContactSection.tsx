import { useRef } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { MessageCircle, Phone, HelpCircle, MapPin, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const ContactSection = () => {
  const { t } = useLanguage();
  return (
    <section id="contact" className="min-h-screen section-red py-20 px-6 md:px-12 relative overflow-hidden bg-pattern-strawberry">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Reveal width="100%">
            <p className="text-white/70 font-semibold text-sm tracking-widest uppercase mb-4">
              {t('nav.contact')}
            </p>
          </Reveal>
          <Reveal width="100%" delay={0.2}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-normal py-2">
              {t('contact.title')}
            </h2>
          </Reveal>
          <Reveal width="100%" delay={0.3}>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              {t('contact.desc')}
            </p>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {/* WhatsApp Card */}
          <Reveal delay={0.1}>
            <a
              href="https://wa.me/918605589062"
              target="_blank"
              className="block group p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 h-full"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-green-500/20 flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 text-center">{t('hero.whatsapp')}</h3>
              <p className="text-white/60 mb-6 font-mono text-center">+91 86055 89062</p>
              <div className="flex items-center justify-center text-green-400 font-semibold group-hover:gap-2 transition-all">
                {t('contact.chat')} <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </a>
          </Reveal>

          {/* Call Card */}
          <Reveal delay={0.2}>
            <a
              href="tel:+919284639747"
              className="block group p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 h-full"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 text-center">{t('hero.call')}</h3>
              <p className="text-white/60 mb-6 font-mono text-center">+91 92846 39747</p>
              <div className="flex items-center justify-center text-blue-400 font-semibold group-hover:gap-2 transition-all">
                {t('contact.call_action')} <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </a>
          </Reveal>

          {/* Visit Card */}
          <Reveal delay={0.3}>
            <div className="block group p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 h-full">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-red-500/20 flex items-center justify-center text-red-400">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 text-center">{t('contact.visit')}</h3>
              <p className="text-white/60 mb-6 text-center text-sm md:text-base">
                {t('contact.address')}
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                className="flex items-center justify-center text-red-400 font-semibold hover:gap-2 transition-all cursor-pointer"
              >
                {t('contact.directions')} <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </Reveal>
        </div>

        {/* Map Section */}
        <Reveal width="100%" delay={0.4}>
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-4 md:p-6 max-w-6xl mx-auto border border-white/10">
            <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden bg-neutral-800 relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3795.7069837831467!2d73.66097831539882!3d17.926447687608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc265c8c8c8c8c8%3A0x0!2sGureghar%2C%20Mahabaleshwar!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Native Berry Farms Location"
                className="absolute inset-0 grayscale opacity-80 hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ContactSection;
