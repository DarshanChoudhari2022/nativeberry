import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-red-dark text-white pt-20 pb-10 px-6 md:px-12 border-t border-white/10">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6 text-center md:text-left">
            <div>
              <h3 className="text-3xl font-bold mb-2">
                <span className="font-script text-4xl text-golden">Native</span> {t('hero.title3')}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
                {t('footer.tagline')}
              </p>
            </div>
            <div className="flex gap-4 justify-center md:justify-start">
              {/* Social Placeholders */}
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">📸</div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">📘</div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">💬</div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="font-bold text-lg mb-6 text-[#FFD700]">Quick Links</h4>
            <ul className="space-y-4 text-white/80 text-sm">
              <li><a href="/#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/#berries" className="hover:text-white transition-colors">Our Berries</a></li>
              <li><a href="/#wholesale" className="hover:text-white transition-colors">Wholesale</a></li>
              <li><a href="/#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Products */}
          <div className="text-center md:text-left">
            <h4 className="font-bold text-lg mb-6 text-[#FFD700]">Our Berries</h4>
            <ul className="space-y-4 text-white/80 text-sm">
              <li><a href="/strawberries" className="hover:text-white transition-colors">{t('berry.strawberries')}</a></li>
              <li><a href="/mulberries" className="hover:text-white transition-colors">{t('berry.mulberries')}</a></li>
              <li><a href="/raspberries" className="hover:text-white transition-colors">{t('berry.raspberries')}</a></li>
              <li><a href="/golden-berries" className="hover:text-white transition-colors">{t('berry.goldenberries')}</a></li>
            </ul>
          </div>

          {/* Contact & Legals */}
          <div className="text-center md:text-left">
            <h4 className="font-bold text-lg mb-6 text-[#FFD700]">Contact</h4>
            <p className="text-white/80 text-sm leading-relaxed mb-6">
              {t('contact.address')}
            </p>
            <p className="text-white/60 text-xs">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a> • <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-white/40 text-xs">
            © 2026 {t('footer.brand')}. All rights reserved.
          </p>
          <p className="text-white/40 text-xs italic flex items-center gap-1">
            {t('footer.love')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
