import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Berry Home', href: '#', active: true },
    { name: 'About Us', href: '#about' },
    { name: 'Our Berries', href: '#berries' },
    { name: 'How We Grow', href: '#timeline' },
    { name: 'Wholesale', href: '#wholesale' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <span className="text-3xl">🍓</span>
            <span className="font-display text-2xl md:text-3xl font-bold text-primary">
              Native<span className="text-foreground">Berries</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`font-semibold transition-colors duration-200 ${
                  link.active 
                    ? 'text-primary border-b-2 border-primary pb-1' 
                    : 'text-foreground/70 hover:text-primary'
                }`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="btn-berry"
            >
              Contact Us
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`font-semibold py-2 ${
                    link.active ? 'text-primary' : 'text-foreground/70'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                className="btn-berry text-center mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
