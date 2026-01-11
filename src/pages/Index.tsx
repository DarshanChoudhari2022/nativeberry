import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import SocialBar from '@/components/SocialBar';
import NavDots from '@/components/NavDots';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import BerriesSection from '@/components/BerriesSection';
import WholesaleSection from '@/components/WholesaleSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;

        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="bg-red-deep">
      <Navbar />
      <SocialBar />
      <NavDots activeSection={activeSection} totalSections={5} />
      <HeroSection />
      <AboutSection />
      <BerriesSection />
      <WholesaleSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
