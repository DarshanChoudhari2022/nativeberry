import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ChevronLeft, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const menuItems = [
    { label: t('nav.home'), href: '#home' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.berries'), href: '#berries' },
    { label: t('nav.wholesale'), href: '#wholesale' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6">
      <div className="flex items-center justify-between ml-auto">
        {/* Hamburger Menu - Pushed to right via ml-auto on container or just justified content end */}
        <div className="ml-auto">
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
        <div className="fixed inset-0 bg-red-dark/95 z-40 flex items-center justify-center">
          <div className="flex flex-col items-center gap-8 text-white">
            {/* Navigation Items */}
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-3xl font-light hover:opacity-70 transition-opacity"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
