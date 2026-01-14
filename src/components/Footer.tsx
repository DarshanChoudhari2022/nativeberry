import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Check } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 500);
  };

  return (
    <footer className="bg-red-dark text-white pt-20 pb-10 px-6 md:px-12 border-t border-white/10">
      <div className="container mx-auto">
        {/* Newsletter CTA */}
        <div className="bg-red-800/30 rounded-2xl p-8 mb-16 flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold font-script mb-2">{t('news.title')}</h3>
            <p className="text-white/70 text-sm">{t('news.desc')}</p>
          </div>
          {status === 'success' ? (
            <div className="flex items-center gap-2 text-[#FFD700] font-bold bg-white/10 px-6 py-3 rounded-full animate-fade-in">
              <Check className="w-5 h-5" />
              <span>Subscribed Successfully!</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('news.placeholder')}
                className="bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:bg-white/20 w-full md:w-64"
                required
              />
              <button type="submit" className="bg-[#FFD700] text-red-900 px-6 py-2 rounded-full font-bold text-sm hover:bg-yellow-400 transition-colors">
                {t('news.btn')}
              </button>
            </form>
          )}
        </div>

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
            {/* <div className="flex gap-4 justify-center md:justify-start"> */}
            {/* Social Placeholders */}
            {/* <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">📸</div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">📘</div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">💬</div> */}
            {/* </div> */}
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
            <div className="space-y-4 text-white/80 text-sm mb-6">
              <p>{t('contact.address')}</p>
              <div>
                <span className="block text-[#FFD700] text-xs uppercase tracking-widest font-bold">Orders & Support</span>
                <a href="tel:+919623214755" className="hover:text-white transition-colors">+91 96232 14755</a>
              </div>
              <div>
                <span className="block text-[#FFD700] text-xs uppercase tracking-widest font-bold">Wholesale Enquiries</span>
                <a href="tel:+919309393216" className="hover:text-white transition-colors">+91 93093 93216</a>
              </div>
            </div>
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
