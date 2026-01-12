import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-red-dark text-white py-12 px-6 md:px-12">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8 items-center text-center md:text-left">
          {/* Logo */}
          <div>
            <h3 className="text-2xl font-bold mb-2">
              <span className="font-script text-3xl">Native</span> {t('hero.title3')}
            </h3>
            <p className="text-white/60 text-sm">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Address */}
          <div className="text-white/70 text-sm">
            <p>{t('contact.address')}</p>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-white/60 text-sm">
              © 2026 {t('footer.brand')}.
            </p>
            <p className="text-white/40 text-xs mt-1">
              {t('footer.love')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
