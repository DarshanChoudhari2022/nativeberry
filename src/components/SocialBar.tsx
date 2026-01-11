import { Instagram, Facebook, Twitter } from 'lucide-react';

const SocialBar = () => {
  return (
    <div className="social-bar hidden md:flex">
      <a href="#" className="text-white/70 hover:text-white transition-colors">
        <Instagram className="w-5 h-5" />
      </a>
      <a href="#" className="text-white/70 hover:text-white transition-colors">
        <Facebook className="w-5 h-5" />
      </a>
      <a href="#" className="text-white/70 hover:text-white transition-colors">
        <Twitter className="w-5 h-5" />
      </a>
      <div className="w-px h-16 bg-white/30 mx-auto"></div>
      <span className="text-white/70 text-xs tracking-widest transform -rotate-90 origin-center whitespace-nowrap mt-8">
        SHARE
      </span>
    </div>
  );
};

export default SocialBar;
