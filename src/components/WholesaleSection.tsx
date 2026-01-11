import { Gift, Truck, ChefHat } from 'lucide-react';
import blueCrateImg from '@/assets/blue-crate.jpeg';

const wholesaleOptions = [
  {
    icon: Gift,
    title: 'Corporate Gifting',
    description: 'Premium packaging for Diwali, festivals & corporate events.',
    emoji: '🎁',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: Truck,
    title: 'Wholesale',
    description: 'Daily bulk dispatch to Pune & Mumbai markets.',
    emoji: '🚛',
    color: 'bg-accent/10 text-accent',
  },
  {
    icon: ChefHat,
    title: 'HORECA',
    description: 'Direct supply to Hotels, Restaurants & Chefs.',
    emoji: '👨‍🍳',
    color: 'bg-secondary/20 text-secondary',
  },
];

const WholesaleSection = () => {
  return (
    <section id="wholesale" className="section-spacing bg-primary relative overflow-hidden">
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }} />
      </div>

      <div className="container mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary-foreground/80 font-bold text-sm tracking-wider uppercase mb-3">
            B2B Partnership
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4">
            Partner with the Source
          </h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto text-lg">
            Cut out the middlemen. Work directly with the farmers.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <img
              src={blueCrateImg}
              alt="Fresh strawberries ready for wholesale"
              className="w-full rounded-3xl shadow-2xl"
            />
            <div className="absolute -top-4 -left-4 bg-card rounded-2xl shadow-xl p-4">
              <p className="font-display text-3xl font-bold text-primary">500kg+</p>
              <p className="text-sm text-muted-foreground">Daily Capacity</p>
            </div>
          </div>

          {/* Cards */}
          <div className="space-y-6 order-1 lg:order-2">
            {wholesaleOptions.map((option) => (
              <a
                key={option.title}
                href="https://wa.me/919356257779?text=Hi!%20I%20am%20interested%20in%20B2B%20partnership"
                target="_blank"
                rel="noopener noreferrer"
                className="card-playful p-6 flex items-start gap-4 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-2xl ${option.color} flex items-center justify-center text-2xl flex-shrink-0`}>
                  {option.emoji}
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {option.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {option.description}
                  </p>
                </div>
                <span className="text-muted-foreground group-hover:text-primary transition-colors">→</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WholesaleSection;
