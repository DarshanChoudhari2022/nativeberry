import { ChevronDown } from 'lucide-react';
import strawberryImg from '@/assets/strawberry-closeup.jpeg';

const HeroSection = () => {
  return (
    <section className="min-h-screen section-red relative overflow-hidden flex items-center bg-pattern-strawberry">
      {/* Decorative strawberry outlines in background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="absolute top-20 right-20 w-40 h-40" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M50 10 C20 20, 10 50, 30 80 C40 95, 60 95, 70 80 C90 50, 80 20, 50 10" />
        </svg>
        <svg className="absolute bottom-40 right-40 w-32 h-32" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M50 10 C20 20, 10 50, 30 80 C40 95, 60 95, 70 80 C90 50, 80 20, 50 10" />
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left: Text Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Cursive Strawberry text */}
            <h1 className="font-script text-6xl md:text-8xl lg:text-9xl text-white text-shadow leading-none mb-4">
              Straw<span className="relative">
                <span className="opacity-0">berry</span>
              </span>
            </h1>
          </div>

          {/* Center: Large Strawberry Image */}
          <div className="flex-1 flex justify-center relative">
            <div className="relative">
              {/* Main strawberry image */}
              <img
                src={strawberryImg}
                alt="Fresh Strawberry"
                className="w-64 h-80 md:w-80 md:h-96 lg:w-96 lg:h-[500px] object-cover rounded-full animate-float"
                style={{ 
                  clipPath: 'ellipse(48% 50% at 50% 50%)',
                  filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.3))'
                }}
              />
              
              {/* Cursive "berry" text behind/beside the strawberry */}
              <span className="absolute top-1/2 -translate-y-1/2 -right-20 md:-right-32 font-script text-6xl md:text-8xl lg:text-9xl text-white text-shadow">
                berry
              </span>
            </div>
          </div>

          {/* Right side space for dots navigation */}
          <div className="hidden lg:block w-20"></div>
        </div>

        {/* Nutrition Facts */}
        <div className="mt-12 lg:mt-0 lg:absolute lg:bottom-24 lg:left-12">
          <div className="flex items-center gap-8 text-white">
            <div>
              <h3 className="text-xl font-semibold mb-1">Nutrition</h3>
              <p className="text-lg font-light">facts</p>
              <div className="w-16 h-0.5 bg-white/50 mt-2"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-2 text-sm">
              <div><span className="text-white/70">Calories:</span> <span className="font-medium">32</span></div>
              <div><span className="text-white/70">Water:</span> <span className="font-medium">91%</span></div>
              <div><span className="text-white/70">Protein:</span> <span className="font-medium">0.7 grams</span></div>
              <div><span className="text-white/70">Carbs:</span> <span className="font-medium">7.7 grams</span></div>
              <div><span className="text-white/70">Sugar:</span> <span className="font-medium">4.9 grams</span></div>
              <div><span className="text-white/70">Fiber:</span> <span className="font-medium">2 grams</span></div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <ChevronDown className="w-8 h-8 text-white/70 animate-bounce" />
        </div>
      </div>

      {/* Mini strawberry thumbnail bottom right */}
      <div className="absolute bottom-6 right-24 hidden lg:block">
        <div className="w-16 h-16 rounded-lg overflow-hidden bg-golden flex items-center justify-center">
          <span className="text-2xl">🍋</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
