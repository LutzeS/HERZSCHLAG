import React from 'react';
import { HeartbeatSeparator } from '../constants';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-herz-black relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-vintage-pattern opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Text Content */}
          <div className="order-2 md:order-1">
             <h4 className="text-herz-gold uppercase tracking-[0.2em] text-sm font-bold mb-2">Unsere Geschichte</h4>
             <h2 className="font-serif text-4xl md:text-5xl text-herz-cream mb-6 leading-tight">
               Mehr als nur ein Pub – <span className="italic text-herz-gold">ein Zuhause.</span>
             </h2>
             <div className="w-16 h-1 bg-herz-gold mb-8"></div>
             
             <p className="text-gray-300 mb-6 font-light leading-relaxed">
               Im Herzen der Stadt gelegen, ist das HERZSCHLAG der Treffpunkt für alle, die das Echte suchen. Inspiriert von den klassischen Musik-Pubs in London und Dublin, haben wir einen Ort geschaffen, an dem die Zeit für einen Moment stillsteht.
             </p>
             <p className="text-gray-300 mb-8 font-light leading-relaxed">
               Bei uns trifft rustikales Design auf modernste Soundtechnik. Dunkles Holz, weiches Leder und das warme Leuchten von Vintage-Lampen schaffen eine Atmosphäre, die zum Verweilen einlädt – egal ob beim After-Work-Bier oder beim Konzert am Wochenende.
             </p>
             
             <div className="flex items-center space-x-6">
                <div className="text-center">
                   <div className="text-3xl font-serif text-herz-gold">25+</div>
                   <div className="text-xs uppercase tracking-widest text-gray-400 mt-1">Jahre</div>
                </div>
                <div className="h-10 w-px bg-gray-700"></div>
                <div className="text-center">
                   <div className="text-3xl font-serif text-herz-gold">100+</div>
                   <div className="text-xs uppercase tracking-widest text-gray-400 mt-1">Events/Jahr</div>
                </div>
                <div className="h-10 w-px bg-gray-700"></div>
                <div className="text-center">
                   <div className="text-3xl font-serif text-herz-gold">∞</div>
                   <div className="text-xs uppercase tracking-widest text-gray-400 mt-1">Liebe</div>
                </div>
             </div>
          </div>

          {/* Image Composition */}
          <div className="order-1 md:order-2 relative">
             <div className="relative">
                <div className="absolute -inset-4 border border-herz-gold/30 rounded-sm transform rotate-3"></div>
                <img 
                  src="https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=2574&auto=format&fit=crop" 
                  alt="Interior Detail" 
                  className="relative rounded-sm shadow-2xl filter sepia-[.3] contrast-125 hover:filter-none transition-all duration-700"
                />
             </div>
             <div className="absolute -bottom-10 -left-10 w-48 h-48 hidden lg:block">
                <img 
                  src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop" 
                  alt="Drink Detail" 
                  className="w-full h-full object-cover rounded-full border-4 border-herz-black shadow-xl"
                />
             </div>
          </div>
        </div>
        
        <HeartbeatSeparator />
      </div>
    </section>
  );
};

export default About;