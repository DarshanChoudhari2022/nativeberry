import { MessageCircle, Phone, HelpCircle, MapPin } from 'lucide-react';

const contacts = [
  {
    icon: MessageCircle,
    title: 'WhatsApp Order',
    subtitle: 'Place your order via chat',
    phone: '+91 9356257779',
    link: 'https://wa.me/919356257779?text=Hi!%20I%20want%20to%20order%20fresh%20berries',
  },
  {
    icon: Phone,
    title: 'Talk to Farmer',
    subtitle: 'Direct line to the farm',
    phone: '+91 9284639747',
    link: 'tel:+919284639747',
  },
  {
    icon: HelpCircle,
    title: 'Order Support',
    subtitle: 'Any doubts? We help!',
    phone: '+91 9623214755',
    link: 'tel:+919623214755',
  },
];

const ContactSection = () => {
  return (
    <section id="contact" className="min-h-screen section-red py-20 px-6 md:px-12 relative overflow-hidden bg-pattern-strawberry">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-white/70 font-semibold text-sm tracking-widest uppercase mb-4">
            Get in Touch
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Ready to <span className="font-script">Order?</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Three ways to connect with us. Choose what suits you best!
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          {contacts.map((contact) => (
            <a
              key={contact.title}
              href={contact.link}
              target={contact.link.startsWith('http') ? '_blank' : undefined}
              rel={contact.link.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center hover:-translate-y-2 hover:bg-white/20 transition-all duration-300 group"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <contact.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">
                {contact.title}
              </h3>
              <p className="text-white/60 text-sm mb-4">
                {contact.subtitle}
              </p>
              <p className="font-bold text-lg text-white">
                {contact.phone}
              </p>
            </a>
          ))}
        </div>

        {/* Map & Location */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 md:p-8 max-w-4xl mx-auto">
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
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-4 mx-auto md:mx-0">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Visit Our Farm
              </h3>
              <p className="text-white/70 text-sm mb-6">
                Parking No 4, Near Mapro Garden,<br />
                Gureghar, Mahabaleshwar
              </p>
              <a
                href="https://maps.app.goo.gl/8DwvM2JSx2Q4hyME9"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill btn-white inline-flex items-center gap-2"
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
