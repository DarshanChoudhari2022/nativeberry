const Footer = () => {
  return (
    <footer className="bg-red-dark text-white py-12 px-6 md:px-12">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8 items-center text-center md:text-left">
          {/* Logo */}
          <div>
            <h3 className="text-2xl font-bold mb-2">
              <span className="font-script text-3xl">Native</span> Berry Farms
            </h3>
            <p className="text-white/60 text-sm">
              The Real Gavakries of Mahabaleshwar
            </p>
          </div>

          {/* Address */}
          <div className="text-white/70 text-sm">
            <p>Parking No 4, Near Mapro Garden,</p>
            <p>Gureghar, Mahabaleshwar</p>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-white/60 text-sm">
              © 2026 Native Berry Farms.
            </p>
            <p className="text-white/40 text-xs mt-1">
              Grown with ❤️ since 1999
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
