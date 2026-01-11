import farmRowsImg from '@/assets/farm-rows.jpeg';

const timelineEvents = [
  {
    year: '1920s',
    title: 'The British Legacy',
    description: 'British introduce strawberries to the hills of Mahabaleshwar.',
    icon: '🇬🇧',
  },
  {
    year: '1930s',
    title: 'Gureghar Adopts',
    description: 'Our ancestors embrace the new crop, learning its secrets.',
    icon: '👨‍🌾',
  },
  {
    year: '1999',
    title: 'Native Berry Farms',
    description: 'The Gade family establishes Native Berry Farms.',
    icon: '🏡',
  },
  {
    year: 'Today',
    title: 'Direct to You',
    description: 'Three generations later, farm-fresh to your doorstep.',
    icon: '🚚',
  },
];

const TimelineSection = () => {
  return (
    <section id="timeline" className="section-spacing bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-20 text-4xl opacity-40">🌿</div>
      <div className="absolute bottom-10 left-10 text-5xl opacity-30">🍃</div>

      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-accent font-bold text-sm tracking-wider uppercase mb-3">
            Our Journey
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            A <span className="text-primary">Century</span> of Berries
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-accent rounded-full" />

            <div className="space-y-8">
              {timelineEvents.map((event, index) => (
                <div
                  key={event.year}
                  className="relative pl-20"
                >
                  {/* Circle with icon */}
                  <div className="absolute left-4 w-10 h-10 rounded-full bg-card shadow-lg flex items-center justify-center text-xl border-4 border-background">
                    {event.icon}
                  </div>

                  {/* Content */}
                  <div className="card-playful p-5">
                    <span className="inline-block bg-primary/10 text-primary font-bold text-sm px-3 py-1 rounded-full mb-2">
                      {event.year}
                    </span>
                    <h3 className="font-display text-xl font-bold text-foreground mb-1">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative hidden lg:block">
            <img
              src={farmRowsImg}
              alt="Native Berry Farms rows"
              className="w-full rounded-3xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-card rounded-2xl shadow-xl p-5">
              <div className="flex items-center gap-3">
                <span className="text-4xl">🍓</span>
                <div>
                  <p className="font-display text-2xl font-bold text-primary">3</p>
                  <p className="text-sm text-muted-foreground">Generations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
