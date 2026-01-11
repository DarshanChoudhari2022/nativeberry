import strawberryImg from '@/assets/strawberry-closeup.jpeg';
import growingImg from '@/assets/growing-strawberry.jpeg';
import harvestImg from '@/assets/fresh-harvest.jpeg';
import singleImg from '@/assets/single-strawberry.jpeg';

const products = [
  {
    name: 'Strawberry',
    tagline: 'The Mahabaleshwar Classic',
    description: 'Sweet, Red, & Juicy. The crown jewel of our farm.',
    image: strawberryImg,
    color: 'bg-primary',
    shadowColor: 'shadow-[0_20px_50px_-15px_rgba(239,68,68,0.4)]',
  },
  {
    name: 'Mulberry',
    tagline: 'The Wild Dark Pearl',
    description: 'Deep purple, intensely sweet with earthy undertones.',
    image: growingImg,
    color: 'bg-mulberry',
    shadowColor: 'shadow-[0_20px_50px_-15px_rgba(139,92,246,0.4)]',
  },
  {
    name: 'Raspberry',
    tagline: 'Exotic Tartness',
    description: 'Perfect balance of sweet and tart.',
    image: harvestImg,
    color: 'bg-secondary',
    shadowColor: 'shadow-[0_20px_50px_-15px_rgba(244,114,182,0.4)]',
  },
  {
    name: 'Golden Berry',
    tagline: 'Cape Gooseberry',
    description: "Nature's Wrapped Candy with citrus twist.",
    image: singleImg,
    color: 'bg-golden',
    shadowColor: 'shadow-[0_20px_50px_-15px_rgba(251,191,36,0.4)]',
  },
];

const ProductShowcase = () => {
  return (
    <section id="berries" className="section-spacing bg-muted/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 text-6xl opacity-30">🍓</div>
      <div className="absolute bottom-20 right-10 text-5xl opacity-30">🫐</div>

      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-accent font-bold text-sm tracking-wider uppercase mb-3">
            Berry "Good" Farming
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Sustainably <span className="text-primary">Grown</span> Berries
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Balancing quality, taste and environment
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product.name}
              className={`card-playful overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-3 ${product.shadowColor}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Color overlay on hover */}
                <div className={`absolute inset-0 ${product.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-2xl font-bold text-foreground mb-1">
                  {product.name}
                </h3>
                <p className="text-primary font-semibold text-sm mb-2">
                  {product.tagline}
                </p>
                <p className="text-muted-foreground text-sm">
                  {product.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="https://wa.me/919356257779?text=Hi!%20I%20want%20to%20know%20about%20berries%20available"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-berry inline-flex items-center gap-2"
          >
            Order Fresh Berries
            <span>🍓</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
