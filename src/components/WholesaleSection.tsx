import { Gift, Truck, ChefHat } from 'lucide-react';
import blueCrateImg from '@/assets/blue-crate.jpeg';

const options = [
  {
    icon: Gift,
    title: 'Corporate Gifting',
    description: 'Premium packaging for Diwali, festivals & corporate events.',
  },
  {
    icon: Truck,
    title: 'Wholesale',
    description: 'Daily bulk dispatch to Pune & Mumbai markets.',
  },
  {
    icon: ChefHat,
    title: 'HORECA',
    description: 'Direct supply to Hotels, Restaurants & Chefs.',
  },
];

const WholesaleSection = () => {
  return (
    <section id="wholesale" className="min-h-screen section-light py-20 px-6 md:px-12 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <p className="text-red-deep font-semibold text-sm tracking-widest uppercase mb-4">
              B2B Partnership
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-red-dark leading-tight mb-6">
              Partner with<br />
              <span className="font-script text-red-deep">the Source</span>
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Cut out the middlemen. Work directly with third-generation farmers for the freshest, most reliable supply chain.
            </p>

            {/* Options */}
            <div className="space-y-6">
              {options.map((option) => (
                <div
                  key={option.title}
                  className="flex items-start gap-4 p-4 rounded-2xl hover:bg-red-light/30 transition-colors cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-xl bg-red-deep flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <option.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-red-dark text-lg mb-1">
                      {option.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {option.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <a 
              href="https://wa.me/919356257779?text=Hi!%20I%20am%20interested%20in%20B2B%20partnership"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill btn-red inline-flex items-center gap-2 mt-8"
            >
              Partner With Us
              <span>→</span>
            </a>
          </div>

          {/* Image */}
          <div className="relative">
            <img
              src={blueCrateImg}
              alt="Fresh strawberries for wholesale"
              className="w-full rounded-3xl shadow-2xl"
            />
            {/* Stats card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6">
              <p className="text-4xl font-bold text-red-deep">500kg+</p>
              <p className="text-muted-foreground text-sm">Daily Capacity</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WholesaleSection;
