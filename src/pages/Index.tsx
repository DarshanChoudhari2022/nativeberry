import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import WhyUsSection from '@/components/WhyUsSection';
import ProductShowcase from '@/components/ProductShowcase';
import TimelineSection from '@/components/TimelineSection';
import WholesaleSection from '@/components/WholesaleSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <WhyUsSection />
      <ProductShowcase />
      <TimelineSection />
      <WholesaleSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
