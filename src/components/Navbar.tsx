import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ChevronLeft, Menu, X } from 'lucide-react';
import logo from '@/assets/logo_white_transparent.png';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: t('nav.home'), href: '/#home' },
    { label: t('nav.about'), href: '/#about' },
    { label: t('nav.berries'), href: '/#berries' },
    { label: t('nav.wholesale'), href: '/#wholesale' },
    { label: t('nav.contact'), href: '/#contact' },
  ];
  return (
    <nav className={`fixed top-0 left-0 right-0 z-[200] px-6 md:px-12 py-2 transition-all duration-300 ${isScrolled ? 'bg-red-dark/95 backdrop-blur-md py-2 shadow-lg pointer-events-auto' : 'bg-transparent py-4 pointer-events-none'}`}>
      <div className="flex items-center justify-between pointer-events-auto">
        <a href="/" className={`block transition-all duration-300 ${isScrolled ? 'w-20 h-20 md:w-24 md:h-24' : 'w-32 h-32 md:w-40 md:h-40'}`}>
          <img src={logo} alt="Native Berry Farms" className="w-full h-full object-contain filter drop-shadow-md" />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-white hover:text-[#FFD700] transition-colors text-sm font-bold uppercase tracking-widest relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFD700] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <a href="/#contact" className="bg-[#FFD700] text-[#781B26] px-6 py-2 rounded-full font-bold text-sm tracking-wide hover:scale-105 transition-transform shadow-lg">
            {t('nav.order')}
          </a>
        </div>

        {/* Hamburger Menu (Mobile Only) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white hover:opacity-80 transition-opacity"
          >
            {isMobileMenuOpen ? (
              <X className="w-8 h-8" />
            ) : (
              <div className="flex flex-col gap-1.5">
                <span className="block w-8 h-0.5 bg-white"></span>
                <span className="block w-6 h-0.5 bg-white ml-auto"></span>
                <span className="block w-8 h-0.5 bg-white"></span>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-red-dark/95 z-40 flex items-center justify-center pointer-events-auto">
          <div className="flex flex-col items-center gap-8 text-white">
            {/* Navigation Items */}
            {menuItems.map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-2">
                <a
                  href={item.href}
                  className="text-3xl font-light hover:opacity-70 transition-opacity"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>

                {/* Mobile Submenu for Berries */}
                {item.href === '/#berries' && (
                  <div className="flex flex-col gap-2 mt-1 items-center">
                    <a href="/strawberries" className="text-lg opacity-80 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>{t('berry.strawberries')}</a>
                    <a href="/mulberries" className="text-lg opacity-80 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>{t('berry.mulberries')}</a>
                    <a href="/raspberries" className="text-lg opacity-80 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>{t('berry.raspberries')}</a>
                    <a href="/golden-berries" className="text-lg opacity-80 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>{t('berry.goldenberries')}</a>
                  </div>
                )}
              </div>
            ))}

            <a
              href="/#contact"
              className="bg-[#FFD700] text-[#781B26] px-8 py-3 rounded-full font-bold text-lg tracking-wide hover:scale-105 transition-transform shadow-lg mt-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.order')}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
