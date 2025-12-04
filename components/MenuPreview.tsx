import React, { useState, useEffect, useCallback } from 'react';
import { MENU_HIGHLIGHTS, HeartbeatSeparator } from '../constants';
import { Utensils, Beer, ChevronLeft, ChevronRight, Download, Info } from 'lucide-react';
import { MenuItem } from '../types';
import Modal from './Modal';

const MenuPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'speisen' | 'getraenke'>('speisen');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const filteredItems = MENU_HIGHLIGHTS.filter(item => item.category === activeTab);
  const carouselItems = MENU_HIGHLIGHTS.filter(item => item.imageUrl);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  }, [carouselItems.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section id="menu" className="py-24 bg-herz-black relative">
       {/* Decorative Gold Elements */}
       <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-herz-black via-herz-gold to-herz-black opacity-30"></div>

       <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
             <h2 className="font-serif text-5xl text-herz-cream mb-6">Kulinarik</h2>
             <p className="text-gray-400 italic">"Gutes Essen hält Leib und Seele zusammen."</p>
          </div>

          {/* Special Menu Carousel */}
          {carouselItems.length > 0 && (
             <div className="relative w-full h-64 md:h-96 mb-16 group rounded-sm overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-herz-gold/10">
                {carouselItems.map((item, index) => (
                   <div 
                      key={item.id}
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out cursor-pointer ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                      onClick={() => setSelectedItem(item)}
                   >
                      <img 
                         src={item.imageUrl} 
                         alt={item.name} 
                         className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-herz-black via-herz-black/40 to-transparent opacity-90"></div>
                      
                      <div className="absolute bottom-0 left-0 p-8 w-full">
                         <div className="inline-block px-3 py-1 bg-herz-gold text-herz-black text-[10px] font-bold uppercase tracking-widest mb-2">
                            Empfehlung der Küche
                         </div>
                         <div className="flex justify-between items-end">
                            <div>
                               <h3 className="font-serif text-3xl md:text-4xl text-herz-cream mb-2 drop-shadow-md">{item.name}</h3>
                               <p className="text-gray-300 text-sm md:text-base font-light max-w-lg hidden md:block drop-shadow-sm">{item.description}</p>
                            </div>
                            <span className="font-serif text-2xl md:text-3xl text-herz-gold">{item.price}</span>
                         </div>
                      </div>
                   </div>
                ))}

                {/* Controls - Updated for better visibility */}
                <button 
                   onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                   className="absolute top-1/2 left-4 z-20 -translate-y-1/2 p-3 text-herz-cream hover:text-herz-gold bg-black/30 hover:bg-herz-black border border-white/10 hover:border-herz-gold backdrop-blur-sm rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
                   aria-label="Vorheriges Bild"
                >
                   <ChevronLeft size={24} />
                </button>
                <button 
                   onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                   className="absolute top-1/2 right-4 z-20 -translate-y-1/2 p-3 text-herz-cream hover:text-herz-gold bg-black/30 hover:bg-herz-black border border-white/10 hover:border-herz-gold backdrop-blur-sm rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
                   aria-label="Nächstes Bild"
                >
                   <ChevronRight size={24} />
                </button>

                {/* Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
                   {carouselItems.map((_, idx) => (
                      <button
                         key={idx}
                         onClick={(e) => { e.stopPropagation(); setCurrentSlide(idx); }}
                         className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? 'bg-herz-gold w-6' : 'bg-herz-cream/30 hover:bg-herz-cream/60'}`}
                      />
                   ))}
                </div>
             </div>
          )}

          {/* Tabs */}
          <div className="flex justify-center mb-12 space-x-8">
             <button 
                onClick={() => setActiveTab('speisen')}
                className={`flex items-center gap-2 pb-2 text-sm uppercase tracking-widest transition-all duration-300 border-b-2 ${activeTab === 'speisen' ? 'text-herz-gold border-herz-gold' : 'text-gray-500 border-transparent hover:text-gray-300'}`}
             >
                <Utensils size={16} /> Speisekarte
             </button>
             <button 
                onClick={() => setActiveTab('getraenke')}
                className={`flex items-center gap-2 pb-2 text-sm uppercase tracking-widest transition-all duration-300 border-b-2 ${activeTab === 'getraenke' ? 'text-herz-gold border-herz-gold' : 'text-gray-500 border-transparent hover:text-gray-300'}`}
             >
                <Beer size={16} /> Getränke
             </button>
          </div>

          {/* Menu Items */}
          <div className="space-y-4 animate-fade-in-up">
             {filteredItems.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => setSelectedItem(item)}
                  className="group flex justify-between items-start border-b border-gray-800 pb-4 pt-4 hover:border-herz-gold transition-all duration-300 cursor-pointer hover:bg-white/5 px-4 -mx-4 rounded-sm relative overflow-hidden"
                >
                   {/* Hover indicator */}
                   <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-herz-gold transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>

                   <div className="pr-4 flex-1">
                      <div className="flex items-center gap-3">
                         <h3 className="font-serif text-xl text-herz-cream group-hover:text-herz-gold transition-colors">{item.name}</h3>
                         {item.isSpecial && (
                            <span className="text-[10px] uppercase bg-herz-gold text-herz-black px-2 py-0.5 rounded-sm font-bold tracking-wide">
                               Empfehlung
                            </span>
                         )}
                      </div>
                      <p className="text-gray-400 font-light mt-1 text-sm leading-relaxed max-w-2xl">{item.description}</p>
                   </div>
                   <div className="flex items-center gap-4">
                      <span className="text-herz-gold font-serif text-xl whitespace-nowrap">
                          {item.price}
                      </span>
                      <Info size={16} className="text-gray-600 group-hover:text-herz-cream transition-colors opacity-0 group-hover:opacity-100" />
                   </div>
                </div>
             ))}
          </div>

          <div className="mt-12 text-center">
             <a 
               href="#" 
               target="_blank" 
               rel="noopener noreferrer"
               className="inline-flex items-center gap-2 px-8 py-3 bg-transparent border border-herz-gold text-herz-gold hover:bg-herz-gold hover:text-herz-black transition-all duration-300 uppercase tracking-widest text-xs font-bold"
               onClick={(e) => e.preventDefault()}
             >
                <Download size={16} />
                Vollständige Karte (PDF)
             </a>
          </div>
          
          <div className="mt-12">
            <HeartbeatSeparator />
          </div>
       </div>

       {/* Menu Item Detail Modal */}
       <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)}>
         {selectedItem && (
            <div className="flex flex-col h-full bg-herz-black text-herz-cream">
                {/* Header Image or Pattern */}
                {selectedItem.imageUrl ? (
                    <div className="h-64 sm:h-80 w-full relative shrink-0">
                        <img 
                            src={selectedItem.imageUrl} 
                            alt={selectedItem.name} 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-herz-black via-herz-black/20 to-transparent"></div>
                    </div>
                ) : (
                    <div className="h-32 w-full bg-herz-charcoal relative shrink-0 border-b border-herz-gold/10 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-vintage-pattern opacity-10"></div>
                        {selectedItem.category === 'speisen' ? (
                            <Utensils size={48} className="text-herz-gold/20 relative z-10" />
                        ) : (
                            <Beer size={48} className="text-herz-gold/20 relative z-10" />
                        )}
                    </div>
                )}

                <div className="p-8 md:p-10 relative">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                        <div>
                            {selectedItem.isSpecial && (
                                <span className="inline-block px-3 py-1 bg-herz-gold text-herz-black text-[10px] font-bold uppercase tracking-widest mb-3 rounded-sm shadow-md">
                                    Empfehlung der Küche
                                </span>
                            )}
                            <h3 className="font-serif text-3xl md:text-5xl text-herz-cream leading-tight mb-2">{selectedItem.name}</h3>
                            <div className="text-xs text-gray-500 uppercase tracking-widest">
                                Kategorie: <span className="text-herz-gold">{selectedItem.category}</span>
                            </div>
                        </div>
                        <span className="font-serif text-3xl md:text-4xl text-herz-gold whitespace-nowrap mt-2 md:mt-0">
                            {selectedItem.price}
                        </span>
                    </div>

                    <div className="w-16 h-1 bg-herz-red mb-8 rounded-full"></div>

                    <h4 className="text-herz-gold uppercase tracking-[0.2em] text-xs font-bold mb-4">Beschreibung</h4>
                    <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed mb-8">
                        {selectedItem.description}
                    </p>
                    
                    {/* Mock Additional Info - In a real app this would come from the data */}
                    <div className="bg-herz-charcoal border border-gray-800 p-4 rounded-sm">
                        <h5 className="text-gray-500 uppercase tracking-widest text-[10px] font-bold mb-2">Hinweis</h5>
                        <p className="text-gray-400 text-xs font-light">
                            Bei Fragen zu Allergenen und Zusatzstoffen wenden Sie sich bitte an unser Servicepersonal. 
                            Alle Preise verstehen sich inklusive der gesetzlichen Mehrwertsteuer.
                        </p>
                    </div>

                    <button 
                        onClick={() => setSelectedItem(null)}
                        className="mt-8 w-full border border-herz-gold/30 hover:border-herz-gold text-herz-gold hover:text-white py-3 text-xs font-bold uppercase tracking-widest transition-colors"
                    >
                        Schließen
                    </button>
                </div>
            </div>
         )}
       </Modal>
    </section>
  );
};

export default MenuPreview;