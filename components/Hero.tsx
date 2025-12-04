import React from 'react';
import { ChevronDown } from 'lucide-react';
import Logo from './Logo';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-herz-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2574&auto=format&fit=crop" 
          alt="Pub Atmosphere" 
          // Changed opacity-40 to opacity-60 for a brighter look
          className="w-full h-full object-cover opacity-60 scale-105 animate-[pulse_15s_ease-in-out_infinite]"
        />
        {/* Adjusted gradient: More transparency in center, darker edges for focus */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-herz-black/40 to-herz-black/95"></div>
        {/* Bottom fade to seamlessly merge with next section */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-herz-black to-transparent"></div>
        
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-10 mix-blend-overlay"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 w-full max-w-4xl mx-auto flex flex-col items-center justify-center h-full pt-16">
        
        {/* Large Logo Integration using Image Component */}
        <div className="mb-6 md:mb-8 relative group w-full max-w-[300px] sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto transform transition-transform hover:scale-105 duration-1000">
           {/* Subtle Gold Glow behind logo - slightly increased for contrast against brighter bg */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-black/60 blur-[60px] rounded-full"></div>
          
          {/* Use variant="hero" to load Herzblatt-Logo_1.png */}
          <Logo variant="hero" className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] animate-heartbeat relative z-10" />
        </div>
        
        {/* Text and CTA Area */}
        <div className="animate-fade-in-up delay-100 flex flex-col items-center w-full">
           <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-herz-cream drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] leading-tight mb-5 tracking-wide">
             Wo das Herz <span className="italic text-herz-gold font-serif font-medium drop-shadow-lg">im Takt</span> schlägt.
           </h2>
           
           {/* Distinct Red Separator Line */}
           <div className="w-20 md:w-32 h-1 bg-herz-red mb-10 shadow-[0_0_15px_rgba(138,28,28,0.8)] rounded-full"></div>
           
           {/* Buttons */}
           <div className="flex flex-col sm:flex-row gap-5 w-full max-w-[500px] justify-center px-4">
              <a href="#contact" className="flex-1 text-center px-6 py-4 bg-herz-red text-white font-sans font-bold uppercase tracking-[0.15em] hover:bg-[#a02222] transition-all duration-300 shadow-xl hover:shadow-red-900/40 text-sm md:text-base border border-herz-red rounded-sm backdrop-blur-sm bg-opacity-90">
                Tisch reservieren
              </a>
              <a href="#events" className="flex-1 text-center px-6 py-4 bg-black/40 border border-herz-gold text-herz-gold font-sans font-bold uppercase tracking-[0.15em] hover:bg-herz-gold hover:text-herz-black transition-all duration-300 text-sm md:text-base rounded-sm backdrop-blur-md shadow-lg">
                Programm
              </a>
           </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce z-10 text-herz-gold/80 hover:text-herz-gold transition-colors cursor-pointer p-2 drop-shadow-md" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth'})}>
        <ChevronDown size={32} strokeWidth={1.5} />
      </div>
    </section>
  );
};

export default Hero;