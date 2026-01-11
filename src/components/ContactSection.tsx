import { MessageCircle, Phone, HelpCircle, MapPin } from 'lucide-react';

const contactCards = [
  {
    emoji: '💬',
    title: 'WhatsApp Order',
    subtitle: 'Place your order via chat',
    phone: '+91 9356257779',
    link: 'https://wa.me/919356257779?text=Hi!%20I%20want%20to%20order%20fresh%20berries',
    color: 'bg-accent/10',
    iconColor: 'text-accent',
  },
  {
    emoji: '📞',
    title: 'Talk to Farmer',
    subtitle: 'Direct line to the farm',
    phone: '+91 9284639747',
    link: 'tel:+919284639747',
    color: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    emoji: '❓',
    title: 'Order Support',
    subtitle: 'Any doubts? We help!',
    phone: '+91 9623214755',
    link: 'tel:+919623214755',
    color: 'bg-secondary/20',
    iconColor: 'text-secondary',
  },
];

const ContactSection = () => {
  return (
    <section id="contact" className="section-spacing bg-muted/30 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-20 right-10 text-6xl opacity-20">🍓</div>
      <div className="absolute bottom-10 left-10 text-5xl opacity-20">📍</div>

      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-accent font-bold text-sm tracking-wider uppercase mb-3">
            Get in Touch
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Ready to <span className="text-primary">Order?</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Three ways to connect with us. Choose what suits you best!
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          {contactCards.map((card) => (
            <a
              key={card.title}
              href={card.link}
              target={card.link.startsWith('http') ? '_blank' : undefined}
              rel={card.link.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="card-playful p-8 text-center hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${card.color} flex items-center justify-center text-3xl`}>
                {card.emoji}
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                {card.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                {card.subtitle}
              </p>
              <p className={`font-bold text-lg ${card.iconColor}`}>
                {card.phone}
              </p>
            </a>
          ))}
        </div>

        {/* Map & Location */}
        <div className="card-playful p-6 md:p-8 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Map */}
            <div className="w-full md:w-2/3 h-64 md:h-80 rounded-2xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3795.7069837831467!2d73.66097831539882!3d17.926447687608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc265c8c8c8c8c8%3A0x0!2sGureghar%2C%20Mahabaleshwar!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Native Berry Farms Location"
              />
            </div>

            {/* Location Info */}
            <div className="w-full md:w-1/3 text-center md:text-left">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 mx-auto md:mx-0 text-2xl">
                📍
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                Visit Our Farm
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                Parking No 4, Near Mapro Garden,<br />
                Gureghar, Mahabaleshwar
              </p>
              <a
                href="https://maps.app.goo.gl/8DwvM2JSx2Q4hyME9"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-berry inline-flex items-center gap-2"
              >
                Get Directions
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
