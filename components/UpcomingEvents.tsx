
import React from 'react';
import { EVENTS } from '../constants';
import { Calendar, Clock, Music, ArrowRight } from 'lucide-react';

// Helper to parse event date (Duplicated to be self-contained in this component)
const parseEventDate = (dateStr: string, timeStr: string): Date => {
  const months: { [key: string]: number } = {
      'JAN': 0, 'FEB': 1, 'MÄR': 2, 'APR': 3, 'MAI': 4, 'JUN': 5,
      'JUL': 6, 'AUG': 7, 'SEP': 8, 'OKT': 9, 'NOV': 10, 'DEZ': 11
  };
  const [dayStr, monthStr] = dateStr.replace('.', '').split(' ');
  const [hourStr, minStr] = timeStr.split(':');
  const now = new Date();
  return new Date(now.getFullYear(), months[monthStr] || 0, parseInt(dayStr), parseInt(hourStr), parseInt(minStr));
};

const UpcomingEvents: React.FC = () => {
  const now = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(now.getDate() + 7);

  // Filter events: Date must be >= now AND <= nextWeek
  const upcomingEvents = EVENTS.filter(event => {
    const eventDate = parseEventDate(event.date, event.time);
    return eventDate >= now && eventDate <= nextWeek;
  }).sort((a, b) => {
    return parseEventDate(a.date, a.time).getTime() - parseEventDate(b.date, b.time).getTime();
  });

  if (upcomingEvents.length === 0) return null;

  return (
    <section className="bg-gradient-to-b from-herz-black to-herz-charcoal py-16 border-b border-herz-gold/10 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-herz-red/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
           <div>
              <div className="flex items-center gap-2 mb-2">
                 <span className="w-2 h-2 bg-herz-red rounded-full animate-pulse"></span>
                 <span className="text-herz-red font-bold uppercase tracking-widest text-xs">Nicht verpassen</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-herz-cream">Diese Woche im Herzschlag</h2>
           </div>
           <a href="#events" className="text-herz-gold hover:text-white transition-colors text-sm uppercase tracking-widest flex items-center gap-2">
              Zum kompletten Programm <ArrowRight size={16} />
           </a>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {upcomingEvents.map((event) => (
            <div 
              key={event.id}
              className="group relative flex flex-col md:flex-row bg-herz-black border border-herz-gold/40 hover:border-herz-gold rounded-sm overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]"
            >
              {/* Highlight Strip */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-herz-gold group-hover:bg-herz-red transition-colors z-20"></div>

              {/* Image Section (Landscape on Desktop) */}
              <div className="w-full md:w-1/3 relative h-48 md:h-auto overflow-hidden">
                 <img 
                    src={event.imageUrl} 
                    alt={event.bandName} 
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                 />
                 <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500"></div>
                 
                 {/* Floating Date for visual punch */}
                 <div className="absolute top-4 left-4 bg-herz-black/90 backdrop-blur border border-herz-gold/20 p-2 text-center min-w-[60px] shadow-xl">
                    <span className="block text-herz-gold font-bold text-lg leading-none">{event.date.split('.')[0]}</span>
                    <span className="block text-herz-cream text-[10px] uppercase">{event.date.split(' ')[1]}</span>
                 </div>
              </div>

              {/* Content Section */}
              <div className="flex-1 p-6 md:p-8 flex flex-col justify-center relative">
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Music size={100} className="text-herz-gold transform rotate-12" />
                 </div>

                 <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2 text-xs text-herz-gold font-bold uppercase tracking-widest">
                       <span className="flex items-center gap-1"><Clock size={12} /> {event.time} Uhr</span>
                       <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                       <span>{event.genre}</span>
                    </div>
                    
                    <h3 className="font-serif text-3xl text-herz-cream mb-3 group-hover:text-herz-gold transition-colors">{event.bandName}</h3>
                    
                    <p className="text-gray-400 font-light mb-6 max-w-2xl text-sm leading-relaxed">
                       {event.description}
                    </p>

                    <div className="flex items-center gap-4">
                       <button className="px-6 py-2 bg-herz-gold text-herz-black text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors shadow-lg">
                          Tisch reservieren
                       </button>
                       <span className="text-xs text-gray-500 italic">Nur noch wenige Plätze verfügbar!</span>
                    </div>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
