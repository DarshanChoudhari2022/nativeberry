import strawberryImg from '@/assets/strawberry-closeup.jpeg';
import growingImg from '@/assets/growing-strawberry.jpeg';
import harvestImg from '@/assets/fresh-harvest.jpeg';
import singleImg from '@/assets/single-strawberry.jpeg';

const berries = [
  {
    name: 'Strawberry',
    tagline: 'The Mahabaleshwar Classic',
    image: strawberryImg,
    color: 'from-red-500 to-red-700',
  },
  {
    name: 'Mulberry',
    tagline: 'The Wild Dark Pearl',
    image: growingImg,
    color: 'from-purple-500 to-purple-800',
  },
  {
    name: 'Raspberry',
    tagline: 'Exotic Tartness',
    image: harvestImg,
    color: 'from-pink-400 to-pink-600',
  },
  {
    name: 'Golden Berry',
    tagline: 'Nature\'s Wrapped Candy',
    image: singleImg,
    color: 'from-yellow-400 to-orange-500',
  },
];

const BerriesSection = () => {
  return (
    <section id="berries" className="min-h-screen section-red py-20 px-6 md:px-12 relative overflow-hidden bg-pattern-strawberry">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-white/70 font-semibold text-sm tracking-widest uppercase mb-4">
            Our Collection
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Meet the <span className="font-script">Berries</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Four exceptional varieties, each with its own character
          </p>
        </div>

        {/* Berry Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {berries.map((berry, index) => (
            <div
              key={berry.name}
              className="group relative bg-white/10 backdrop-blur-sm rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-500 cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={berry.image}
                  alt={berry.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${berry.color} opacity-30`}></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-1">
                  {berry.name}
                </h3>
                <p className="text-white/70 text-sm">
                  {berry.tagline}
                </p>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="https://wa.me/918605589062?text=Hi!%20I%20want%20to%20order%20fresh%20berries"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill btn-white inline-flex items-center gap-2"
          >
            Order Fresh Now
            <span>🍓</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default BerriesSection;
