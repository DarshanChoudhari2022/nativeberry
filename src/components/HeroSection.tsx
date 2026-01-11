import strawberryImg from '@/assets/strawberry-closeup.jpeg';
import harvestImg from '@/assets/fresh-harvest.jpeg';
import singleImg from '@/assets/single-strawberry.jpeg';
import growingImg from '@/assets/growing-strawberry.jpeg';
import blueCrateImg from '@/assets/blue-crate.jpeg';
import heroFarmImg from '@/assets/hero-farm.jpeg';

const HeroSection = () => {
  const floatingBerries = [
    { img: strawberryImg, top: '15%', left: '8%', delay: '0s', size: 'w-24 h-24 md:w-32 md:h-32' },
    { img: blueCrateImg, top: '10%', right: '10%', delay: '0.5s', size: 'w-28 h-28 md:w-36 md:h-36' },
    { img: harvestImg, top: '55%', left: '5%', delay: '1s', size: 'w-20 h-20 md:w-28 md:h-28' },
    { img: singleImg, top: '60%', right: '8%', delay: '0.3s', size: 'w-24 h-24 md:w-32 md:h-32' },
    { img: growingImg, bottom: '15%', left: '15%', delay: '0.7s', size: 'w-20 h-20 md:w-24 md:h-24' },
    { img: heroFarmImg, bottom: '20%', right: '15%', delay: '0.2s', size: 'w-28 h-28 md:w-36 md:h-36' },
  ];

  return (
    <section className="min-h-screen pt-20 relative overflow-hidden bg-pattern">
      {/* Decorative blobs */}
      <div className="blob bg-pink-light w-96 h-96 -top-20 -left-20" />
      <div className="blob bg-accent/20 w-80 h-80 top-40 -right-20" />
      <div className="blob bg-secondary/30 w-64 h-64 bottom-20 left-1/4" />

      {/* Decorative leaves */}
      <div className="absolute top-10 right-0 text-6xl opacity-60 rotate-45">🌿</div>
      <div className="absolute bottom-20 left-0 text-5xl opacity-50 -rotate-12">🍃</div>

      {/* Floating berry images in circle arrangement */}
      {floatingBerries.map((berry, index) => (
        <div
          key={index}
          className={`absolute ${berry.size} rounded-3xl overflow-hidden shadow-xl animate-float-slow hidden md:block`}
          style={{
            top: berry.top,
            left: berry.left,
            right: berry.right,
            bottom: berry.bottom,
            animationDelay: berry.delay,
          }}
        >
          <img
            src={berry.img}
            alt="Fresh berries"
            className="w-full h-full object-cover"
          />
          {/* Colorful shadow effect */}
          <div 
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-4 rounded-full blur-lg"
            style={{
              backgroundColor: ['#F87171', '#A78BFA', '#34D399', '#FBBF24', '#60A5FA', '#F472B6'][index],
              opacity: 0.4,
            }}
          />
        </div>
      ))}

      {/* Center content */}
      <div className="container mx-auto px-4 min-h-screen flex flex-col items-center justify-center text-center relative z-10">
        <p className="text-secondary font-semibold text-lg mb-2 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          Welcome to the heart of the
        </p>
        
        <h1 
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-4 animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}
        >
          <span className="text-primary">Berries</span>
          <br />
          <span className="text-foreground">World</span>
        </h1>

        <a 
          href="#berries"
          className="mt-6 text-primary font-semibold flex flex-col items-center gap-2 animate-fade-in-up hover:scale-105 transition-transform"
          style={{ animationDelay: '0.4s' }}
        >
          <span>Meet the Berries</span>
          <span className="text-2xl animate-bounce-gentle">↓</span>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
