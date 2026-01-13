import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-red-dark text-white py-16 px-6 md:px-12">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-12 items-center text-center md:text-left">
          {/* Logo & Brand */}
          <div className="space-y-8">
            {/* 32px brand text gutter as requested (mb-8 on container or specific spacing) */}
            <div>
              <h3 className="text-3xl font-bold mb-4">
                <span className="font-script text-4xl text-golden">Native</span> {t('hero.title3')}
              </h3>
              <p className="text-white/80 text-base max-w-xs mx-auto md:mx-0 leading-relaxed">
                {t('footer.tagline')}
              </p>
            </div>
          </div>

          {/* Address */}
          <div className="text-white/80 text-base space-y-2">
            <h4 className="font-bold text-lg mb-4 text-[#FFD700]">Address</h4>
            <p className="leading-relaxed">{t('contact.address')}</p>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right space-y-4">
            <p className="text-white/60 text-sm">
              © 2026 {t('footer.brand')}. <br /> All rights reserved.
            </p>
            <p className="text-white/40 text-xs mt-2 italic">
              {t('footer.love')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
