import farmLandscapeImg from '@/assets/farm-landscape.jpeg';
import heroFarmImg from '@/assets/hero-farm.jpeg';

const AboutSection = () => {
  return (
    <section id="about" className="min-h-screen section-light py-20 px-6 md:px-12 relative overflow-hidden">
      {/* Decorative strawberry outlines */}
      <div className="absolute top-20 left-10 opacity-10">
        <svg className="w-32 h-32 text-red-deep" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 10 C20 20, 10 50, 30 80 C40 95, 60 95, 70 80 C90 50, 80 20, 50 10" />
        </svg>
      </div>

      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Images Stack */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src={heroFarmImg}
                alt="Berry farm in Mahabaleshwar"
                className="w-full max-w-md rounded-3xl shadow-2xl mx-auto"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 md:right-0 z-20">
              <img
                src={farmLandscapeImg}
                alt="Landscape view"
                className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-2xl shadow-xl border-4 border-white"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-red-deep/10 rounded-full"></div>
          </div>

          {/* Content */}
          <div className="lg:pl-8">
            <p className="text-red-deep font-semibold text-sm tracking-widest uppercase mb-4">
              About Us
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-red-dark leading-tight mb-6">
              It's a Berry's<br />
              <span className="font-script text-red-deep">World!</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Discover the essence of Native Berry Farms. What started with a small farm in Gureghar, Mahabaleshwar has grown into a legacy spanning 25+ years.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Native Berry Farms is more than just a brand; it's a passion for quality. The Gade family cultivates our berries with care, ensuring every bite is a delight. We own the soil — and that makes all the difference.
            </p>

            <blockquote className="border-l-4 border-red-deep pl-6 mb-8">
              <p className="text-xl font-medium text-red-dark italic">
                "It's not just what we grow. It's how we grow it—with care, consistency, and purpose."
              </p>
            </blockquote>

            <a href="#berries" className="btn-pill btn-red inline-flex items-center gap-2">
              Explore Our Berries
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
