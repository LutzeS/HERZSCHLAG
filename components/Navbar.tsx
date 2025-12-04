import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Use a lower threshold for a more responsive feel
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Passive listener for performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
        scrolled 
          ? 'bg-herz-black/95 backdrop-blur-md py-2 shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-herz-gold/20' 
          : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent py-4 md:py-6 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-full">
          {/* Logo Area - Top Left */}
          <div className="flex-shrink-0 flex items-center">
            <a href="#" className="block relative group">
               {/* Use variant="navbar" to load Herzblatt-Logo_2.png */}
               <Logo 
                 variant="navbar"
                 className={`transition-all duration-500 ease-in-out object-contain ${
                   scrolled ? 'h-10 md:h-12' : 'h-16 md:h-20'
                 }`}
               />
               {/* Glow effect on hover */}
               <div className={`absolute inset-0 bg-herz-gold/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${scrolled ? 'scale-75' : 'scale-100'}`}></div>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 lg:space-x-12 items-center">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`font-sans text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 relative group py-2 text-shadow-sm
                  ${scrolled ? 'text-herz-cream hover:text-herz-gold' : 'text-herz-cream hover:text-herz-gold drop-shadow-md'}
                `}
              >
                {link.name}
                <span className={`absolute bottom-0 left-1/2 h-0.5 bg-herz-red transform -translate-x-1/2 transition-all duration-300 group-hover:w-full ${scrolled ? 'w-0' : 'w-0'}`}></span>
              </a>
            ))}
            
            {/* CTA Button in Navbar when scrolled */}
            <div className={`transition-all duration-500 transform ${scrolled ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}>
               <a href="#reservation" className="px-5 py-2 border border-herz-gold text-herz-gold hover:bg-herz-gold hover:text-herz-black text-[10px] uppercase font-bold tracking-widest transition-colors rounded-sm shadow-lg">
                 Reservieren
               </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`transition-colors p-2 ${scrolled ? 'text-herz-gold' : 'text-herz-cream hover:text-herz-gold'}`}
              aria-label="Menu"
            >
              {isOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-herz-black/95 backdrop-blur-xl border-t border-herz-gold/20 overflow-hidden transition-all duration-500 ease-in-out origin-top ${isOpen ? 'max-h-[500px] opacity-100 shadow-2xl' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-4 py-6 space-y-4 flex flex-col items-center">
          {NAV_LINKS.map((link, idx) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block w-full text-center px-3 py-3 text-sm font-bold text-herz-cream hover:text-herz-gold border-b border-white/5 tracking-[0.2em] uppercase transition-colors"
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              {link.name}
            </a>
          ))}
           <a 
              href="#reservation"
              onClick={() => setIsOpen(false)}
              className="mt-4 px-8 py-3 bg-herz-red text-white text-xs uppercase font-bold tracking-widest rounded-sm hover:bg-white hover:text-herz-red transition-colors shadow-lg w-full text-center max-w-xs"
           >
              Tisch Reservieren
           </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;