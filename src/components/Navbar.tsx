import { useState } from 'react';
import { ChevronLeft, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6">
      <div className="flex items-center justify-between">
        {/* Back Button */}
        <a 
          href="#" 
          className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="font-medium hidden sm:inline">Back</span>
        </a>

        {/* Hamburger Menu */}
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

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-red-dark/95 z-40 flex items-center justify-center">
          <div className="flex flex-col items-center gap-8 text-white">
            {['Home', 'About Us', 'Our Berries', 'Wholesale', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-3xl font-light hover:opacity-70 transition-opacity"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
