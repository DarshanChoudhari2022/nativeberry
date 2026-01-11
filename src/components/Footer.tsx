const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8 items-center text-center md:text-left">
          {/* Logo */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🍓</span>
              <span className="font-display text-2xl font-bold text-primary-foreground">
                Native Berries
              </span>
            </div>
            <p className="text-background/60 text-sm">
              The Real Gavakries of Mahabaleshwar
            </p>
          </div>

          {/* Address */}
          <div className="text-background/80 text-sm">
            <p>Parking No 4, Near Mapro Garden,</p>
            <p>Gureghar, Mahabaleshwar</p>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-background/60 text-sm">
              © 2026 Native Berry Farms.
            </p>
            <p className="text-background/40 text-xs mt-1">
              Grown with ❤️ since 1999
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
