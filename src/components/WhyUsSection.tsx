import farmLandscapeImg from '@/assets/farm-landscape.jpeg';

const WhyUsSection = () => {
  return (
    <section id="about" className="section-spacing bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />

      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <p className="text-accent font-bold text-sm tracking-wider uppercase mb-3">
              About Us
            </p>
            
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              It's a Berry's <span className="text-primary">World!</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-6">
              Discover the essence of Native Berry Farms
            </p>

            <p className="text-foreground/80 leading-relaxed mb-6">
              What started with a small farm in Gureghar, Mahabaleshwar has grown into a legacy spanning 25+ years. Native Berry Farms is more than just a brand; it's a passion for quality. The Gade family cultivates our berries with care, ensuring every bite is a delight.
            </p>

            <div className="bg-pink-light/50 border-l-4 border-primary rounded-r-2xl p-6 mb-8">
              <p className="text-foreground font-semibold italic">
                "It's not just what we grow. It's how we grow it—with care, consistency, and 25 years of purpose."
              </p>
            </div>

            <a href="#timeline" className="btn-berry inline-flex items-center gap-2">
              Explore More
              <span>→</span>
            </a>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative">
              <img
                src={farmLandscapeImg}
                alt="Native Berry Farms landscape in Mahabaleshwar"
                className="w-full rounded-3xl shadow-2xl"
              />
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent rounded-full flex items-center justify-center text-3xl shadow-lg">
                🌱
              </div>
              <div className="absolute -bottom-4 -left-4 bg-card rounded-2xl shadow-xl p-4">
                <p className="font-display text-3xl font-bold text-primary">25+</p>
                <p className="text-sm text-muted-foreground">Years of Farming</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
