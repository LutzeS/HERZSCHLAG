import React, { useState, useRef, useEffect } from 'react';
import { EVENTS } from '../constants';
import { EventItem } from '../types';
import { Calendar, Clock, Music, Facebook, Twitter, Info, CalendarPlus, X, Bell, Check, Ticket, User, Mail } from 'lucide-react';
import Modal from './Modal';

// Helper to parse event date strings relative to current year
const parseEventDate = (dateStr: string, timeStr: string): Date => {
  const months: { [key: string]: number } = {
      'JAN': 0, 'FEB': 1, 'MÄR': 2, 'APR': 3, 'MAI': 4, 'JUN': 5,
      'JUL': 6, 'AUG': 7, 'SEP': 8, 'OKT': 9, 'NOV': 10, 'DEZ': 11
  };
  
  // Parse date: "12. NOV" -> Day: 12, Month: 10 (Nov)
  const [dayStr, monthStr] = dateStr.replace('.', '').split(' ');
  const [hourStr, minStr] = timeStr.split(':');
  
  const now = new Date();
  // Default to current year
  return new Date(now.getFullYear(), months[monthStr] || 0, parseInt(dayStr), parseInt(hourStr), parseInt(minStr));
};

interface RsvpData {
  [eventId: string]: {
    name: string;
    email: string;
    timestamp: number;
  }
}

interface EventCardProps {
  event: EventItem;
  isRsvped: boolean;
  onSelect: (event: EventItem) => void;
  onShare: (platform: 'facebook' | 'twitter', bandName: string) => void;
  onAddToCalendar: (event: EventItem) => void;
  onRsvp: (event: EventItem) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, isRsvped, onSelect, onShare, onAddToCalendar, onRsvp }) => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Determine if event is in the past
  const eventDate = parseEventDate(event.date, event.time);
  const isPast = eventDate < new Date();

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current || !containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Check if element is in viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Calculate distance from center of viewport
        const distance = (rect.top + rect.height / 2) - (windowHeight / 2);
        // Apply parallax speed (slower movement than scroll)
        const translateY = distance * 0.15;
        
        parallaxRef.current.style.transform = `translateY(${translateY}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`group relative flex flex-col h-full transition-all duration-500 overflow-hidden rounded-sm
      ${isPast 
        ? 'bg-herz-black border border-white/5 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 hover:border-gray-700' 
        : 'bg-gradient-to-b from-[#121212] to-herz-black border border-herz-gold/20 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:border-herz-gold/60 hover:shadow-[0_10px_40px_-10px_rgba(212,175,55,0.15)] hover:-translate-y-1'
      }
    `}>
      {/* Status Badge */}
      <div className={`absolute top-0 left-0 z-30 px-3 py-1 text-[10px] font-bold uppercase tracking-widest shadow-md
        ${isPast ? 'bg-gray-800 text-gray-400' : 'bg-herz-gold text-herz-black'}
      `}>
        {isPast ? 'Vergangen' : 'Kommend'}
      </div>

      {/* Image Header with Parallax & Smooth Zoom */}
      <div 
        ref={containerRef}
        className="h-52 overflow-hidden relative flex-shrink-0 cursor-pointer" 
        onClick={() => onSelect(event)}
      >
         <div className={`absolute top-0 right-0 px-4 py-2 z-20 font-bold uppercase tracking-wider text-xs shadow-md flex items-center gap-2
            ${isPast ? 'bg-gray-800 text-gray-400' : 'bg-herz-gold/90 backdrop-blur text-herz-black'}
         `}>
            <Music size={14} strokeWidth={2.5} />
            {event.genre}
         </div>
         
         {/* Parallax Wrapper */}
         <div 
            ref={parallaxRef} 
            className="absolute inset-0 h-[140%] -top-[20%] w-full will-change-transform"
         >
             <img 
                src={event.imageUrl} 
                alt={event.bandName}
                className="w-full h-full object-cover transform transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
             />
         </div>
         
         {/* Enhanced Gradient Overlay for Readability */}
         <div className="absolute inset-0 bg-gradient-to-t from-herz-black via-herz-black/40 to-transparent opacity-80 z-10 pointer-events-none"></div>
      </div>

      {/* Content */}
      <div className="p-8 relative flex flex-col flex-grow z-10">
         {/* Date Badge */}
         <div className={`absolute -top-8 left-6 border p-3 text-center min-w-[64px] shadow-xl z-20 bg-[#121212]
            ${isPast ? 'border-gray-700' : 'border-herz-gold/40 group-hover:border-herz-gold transition-colors'}
         `}>
            <span className={`block font-bold text-lg leading-none mb-1 ${isPast ? 'text-gray-500' : 'text-herz-gold'}`}>
              {event.date.split('.')[0]}
            </span>
            <span className={`block text-[10px] uppercase font-bold tracking-wider ${isPast ? 'text-gray-600' : 'text-herz-cream'}`}>
              {event.date.split(' ')[1]}
            </span>
         </div>

         <h3 
            className={`font-serif text-2xl mt-4 mb-3 transition-colors cursor-pointer leading-tight
              ${isPast ? 'text-gray-400 group-hover:text-herz-cream' : 'text-herz-cream group-hover:text-herz-gold'}
            `}
            onClick={() => onSelect(event)}
         >
            {event.bandName}
         </h3>
         <div className="w-10 h-0.5 bg-herz-gold/30 mb-4 group-hover:w-20 transition-all duration-500"></div>

         <p className="text-gray-400 text-sm mb-6 line-clamp-3 font-light leading-relaxed flex-grow">
            {event.description}
         </p>
         
         <div className="flex items-center justify-between pt-5 border-t border-white/5 text-xs text-gray-300 uppercase tracking-wider mt-auto">
            <div className={`flex items-center gap-2 ${isPast ? 'text-gray-500' : ''}`}>
               <Clock size={14} className={isPast ? 'text-gray-600' : 'text-herz-gold'} />
               <span>Start: {event.time}</span>
            </div>
            
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-3 border-r border-white/10 pr-4">
                   <button 
                      onClick={(e) => { e.stopPropagation(); onShare('facebook', event.bandName); }}
                      className="text-gray-500 hover:text-[#1877F2] transition-colors"
                      title="Auf Facebook teilen"
                   >
                      <Facebook size={16} />
                   </button>
                   <button 
                      onClick={(e) => { e.stopPropagation(); onShare('twitter', event.bandName); }}
                      className="text-gray-500 hover:text-[#1DA1F2] transition-colors"
                      title="Auf Twitter teilen"
                   >
                      <Twitter size={16} />
                   </button>
                   <button
                      onClick={(e) => { e.stopPropagation(); onAddToCalendar(event); }}
                      className={`transition-colors ${isPast ? 'text-gray-600 cursor-not-allowed' : 'text-gray-500 hover:text-herz-gold'}`}
                      title="Zum Kalender hinzufügen"
                      disabled={isPast}
                   >
                      <CalendarPlus size={16} />
                   </button>
                </div>

                {/* RSVP Button */}
                <button
                   onClick={(e) => { e.stopPropagation(); onRsvp(event); }}
                   disabled={isPast}
                   className={`flex items-center gap-1 transition-all ${
                     isRsvped 
                       ? 'text-green-500' 
                       : isPast ? 'text-gray-600 cursor-not-allowed' : 'text-herz-gold hover:text-white'
                   }`}
                   title={isRsvped ? "Angemeldet" : "RSVP / Zusagen"}
                >
                   {isRsvped ? <Check size={16} /> : <Ticket size={16} />}
                   <span className="hidden sm:inline">{isRsvped ? 'Dabei' : 'RSVP'}</span>
                </button>
            </div>
         </div>
      </div>
    </div>
  );
};

const Events: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [calendarConfig, setCalendarConfig] = useState<{event: EventItem, duration: number, reminder: boolean} | null>(null);
  
  // RSVP State
  const [rsvpModalEvent, setRsvpModalEvent] = useState<EventItem | null>(null);
  const [userRsvps, setUserRsvps] = useState<RsvpData>({});
  const [rsvpForm, setRsvpForm] = useState({ name: '', email: '' });

  // Load RSVPs from local storage on mount
  useEffect(() => {
    const storedRsvps = localStorage.getItem('herzschlag_rsvps');
    if (storedRsvps) {
      try {
        setUserRsvps(JSON.parse(storedRsvps));
      } catch (e) {
        console.error("Failed to parse RSVPs", e);
      }
    }
  }, []);

  const handleShare = (platform: 'facebook' | 'twitter', bandName: string) => {
    const text = encodeURIComponent(`Ich gehe zu ${bandName} im HERZSCHLAG Pub! Kommst du mit?`);
    const url = encodeURIComponent(window.location.href);
    
    let shareUrl = '';
    if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`;
    } else {
      shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const openCalendarModal = (event: EventItem) => {
    setCalendarConfig({ event, duration: 3, reminder: false });
  };

  const handleRsvpClick = (event: EventItem) => {
    setRsvpModalEvent(event);
    if (userRsvps[event.id]) {
        setRsvpForm({
            name: userRsvps[event.id].name,
            email: userRsvps[event.id].email
        });
    } else {
        setRsvpForm({ name: '', email: '' });
    }
  };

  const submitRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpModalEvent) return;

    const newRsvps = {
        ...userRsvps,
        [rsvpModalEvent.id]: {
            name: rsvpForm.name,
            email: rsvpForm.email,
            timestamp: Date.now()
        }
    };

    setUserRsvps(newRsvps);
    localStorage.setItem('herzschlag_rsvps', JSON.stringify(newRsvps));
    setRsvpModalEvent(null);
    setRsvpForm({ name: '', email: '' });
  };

  const executeAddToCalendar = () => {
    if (!calendarConfig) return;
    const { event, duration, reminder } = calendarConfig;

    const eventDate = parseEventDate(event.date, event.time);
    const endDate = new Date(eventDate.getTime() + duration * 60 * 60 * 1000); 

    const format = (d: Date) => d.toISOString().replace(/-|:|\.\d{3}/g, "");

    let eventTitle = `${event.bandName} Live @ HERZSCHLAG`;
    if (reminder) {
        eventTitle = `[REMINDER] ${eventTitle}`;
    }

    const title = encodeURIComponent(eventTitle);
    const details = encodeURIComponent(`${event.description}\n\nGenre: ${event.genre}\n${reminder ? '\n*Reminder set for this event*' : ''}`);
    const location = encodeURIComponent('HERZSCHLAG Musik-Pub, Altstadtmarkt 12, 38100 Braunschweig');
    
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${format(eventDate)}/${format(endDate)}&details=${details}&location=${location}`;
    window.open(url, '_blank');
    setCalendarConfig(null);
  };

  return (
    <section id="events" className="py-20 bg-herz-charcoal relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-herz-gold/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-herz-cream mb-4">Live auf der Bühne</h2>
          <p className="text-herz-gold tracking-[0.2em] uppercase text-sm font-bold">Der Puls der Nacht</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
          {EVENTS.map((event) => (
            <EventCard 
              key={event.id} 
              event={event}
              isRsvped={!!userRsvps[event.id]} 
              onSelect={setSelectedEvent} 
              onShare={handleShare}
              onAddToCalendar={openCalendarModal}
              onRsvp={handleRsvpClick}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
           <a href="#" className="inline-block border-b border-herz-gold text-herz-gold pb-1 hover:text-white hover:border-white transition-all uppercase tracking-widest text-sm font-bold">
              Alle Events ansehen
           </a>
        </div>
      </div>

      {/* Calendar Config Dialog */}
      {calendarConfig && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={() => setCalendarConfig(null)} />
            <div className="relative bg-[#1a1a1a] border border-herz-gold/50 shadow-[0_0_50px_rgba(212,175,55,0.2)] rounded-sm p-8 w-full max-w-md animate-fade-in-up">
                <button 
                  onClick={() => setCalendarConfig(null)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-herz-cream transition-colors"
                >
                  <X size={20} />
                </button>
                
                <h3 className="text-xl font-serif text-herz-gold mb-1">Zum Kalender hinzufügen</h3>
                <p className="text-herz-cream font-bold mb-6">{calendarConfig.event.bandName}</p>
                
                <div className="space-y-6">
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Dauer des Events</label>
                        <select 
                            value={calendarConfig.duration}
                            onChange={(e) => setCalendarConfig({...calendarConfig, duration: parseInt(e.target.value)})}
                            className="w-full bg-herz-black border border-gray-700 text-herz-cream p-3 focus:outline-none focus:border-herz-gold transition-colors appearance-none"
                        >
                            <option value={2}>2 Stunden</option>
                            <option value={3}>3 Stunden</option>
                            <option value={4}>4 Stunden</option>
                            <option value={5}>5 Stunden</option>
                        </select>
                    </div>

                    <div 
                        className="flex items-center gap-3 cursor-pointer group"
                        onClick={() => setCalendarConfig({...calendarConfig, reminder: !calendarConfig.reminder})}
                    >
                        <div className={`w-5 h-5 border rounded-sm flex items-center justify-center transition-colors ${calendarConfig.reminder ? 'bg-herz-gold border-herz-gold' : 'border-gray-600 group-hover:border-herz-gold'}`}>
                            {calendarConfig.reminder && <Check size={14} className="text-herz-black" />}
                        </div>
                        <span className="text-sm text-gray-400 group-hover:text-herz-cream transition-colors">Erinnerung im Titel markieren</span>
                    </div>

                    <button 
                        onClick={executeAddToCalendar}
                        className="w-full bg-herz-red text-white font-bold uppercase tracking-widest py-3 hover:bg-white hover:text-herz-red transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                        <CalendarPlus size={18} />
                        Hinzufügen
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* RSVP Modal */}
      {rsvpModalEvent && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity" onClick={() => setRsvpModalEvent(null)} />
             <div className="relative bg-[#1a1a1a] border border-herz-gold shadow-2xl rounded-sm p-8 w-full max-w-md animate-fade-in-up">
                 <button 
                   onClick={() => setRsvpModalEvent(null)}
                   className="absolute top-4 right-4 text-gray-500 hover:text-herz-cream transition-colors"
                 >
                   <X size={20} />
                 </button>

                 <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-herz-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-herz-gold/30">
                        <Ticket size={24} className="text-herz-gold" />
                    </div>
                    <h3 className="text-2xl font-serif text-herz-cream mb-1">Gästeliste</h3>
                    <p className="text-herz-gold text-sm uppercase tracking-widest">{rsvpModalEvent.bandName}</p>
                 </div>

                 <form onSubmit={submitRsvp} className="space-y-5">
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500">
                           <User size={12} /> Name
                        </label>
                        <input 
                           type="text" 
                           required
                           value={rsvpForm.name}
                           onChange={(e) => setRsvpForm({...rsvpForm, name: e.target.value})}
                           placeholder="Max Mustermann"
                           className="w-full bg-herz-black border border-gray-700 text-herz-cream p-3 focus:outline-none focus:border-herz-gold transition-colors rounded-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500">
                           <Mail size={12} /> Email
                        </label>
                        <input 
                           type="email" 
                           required
                           value={rsvpForm.email}
                           onChange={(e) => setRsvpForm({...rsvpForm, email: e.target.value})}
                           placeholder="max@beispiel.de"
                           className="w-full bg-herz-black border border-gray-700 text-herz-cream p-3 focus:outline-none focus:border-herz-gold transition-colors rounded-sm"
                        />
                    </div>

                    <p className="text-[10px] text-gray-500 italic text-center leading-relaxed">
                        Mit Ihrer Zusage sichern Sie sich einen Platz auf der digitalen Gästeliste. Wir senden Ihnen eine Bestätigung per E-Mail.
                    </p>

                    <button 
                        type="submit"
                        className="w-full bg-herz-gold text-herz-black font-bold uppercase tracking-widest py-3 hover:bg-white transition-colors duration-300 shadow-lg flex items-center justify-center gap-2"
                    >
                        <Check size={18} />
                        Zusagen
                    </button>
                 </form>
             </div>
        </div>
      )}

      {/* Detail Modal */}
      <Modal isOpen={!!selectedEvent} onClose={() => setSelectedEvent(null)}>
        {selectedEvent && (
          <div className="flex flex-col h-full bg-herz-black text-herz-cream">
            {/* Modal Header Image */}
            <div className="h-64 sm:h-80 w-full relative shrink-0">
               <img 
                 src={selectedEvent.imageUrl} 
                 alt={selectedEvent.bandName}
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-herz-black via-herz-black/40 to-transparent"></div>
               <div className="absolute bottom-0 left-0 p-6 sm:p-10 w-full">
                 <div className="flex items-center gap-3 mb-2">
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-herz-gold text-herz-black font-bold uppercase text-[10px] tracking-widest">
                      <Music size={12} strokeWidth={3} />
                      {selectedEvent.genre}
                    </span>
                    <span className="inline-block px-3 py-1 bg-herz-red text-white font-bold uppercase text-[10px] tracking-widest">
                       Live Music
                    </span>
                 </div>
                 <h2 className="text-3xl sm:text-5xl font-serif text-herz-cream drop-shadow-xl">{selectedEvent.bandName}</h2>
               </div>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 sm:p-10 bg-herz-charcoal border-t border-herz-gold/20 flex-grow">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                  
                  {/* Left: Info Column */}
                  <div className="md:col-span-1 space-y-6">
                      <div className="space-y-4">
                          <div className="flex items-center gap-3 text-herz-gold border-b border-white/10 pb-3">
                             <Calendar size={20} />
                             <div>
                               <span className="block text-[10px] uppercase text-gray-400 tracking-widest">Datum</span>
                               <span className="text-lg font-serif">{selectedEvent.date}</span>
                             </div>
                          </div>
                          <div className="flex items-center gap-3 text-herz-gold border-b border-white/10 pb-3">
                             <Clock size={20} />
                             <div>
                               <span className="block text-[10px] uppercase text-gray-400 tracking-widest">Beginn</span>
                               <span className="text-lg font-serif">{selectedEvent.time} Uhr</span>
                             </div>
                          </div>
                          <div className="flex items-center gap-3 text-herz-gold border-b border-white/10 pb-3">
                             <Music size={20} />
                             <div>
                               <span className="block text-[10px] uppercase text-gray-400 tracking-widest">Genre</span>
                               <span className="text-lg font-serif">{selectedEvent.genre}</span>
                             </div>
                          </div>
                      </div>

                      {/* RSVP in Modal */}
                      <button
                          onClick={() => handleRsvpClick(selectedEvent)}
                          className={`w-full py-3 flex justify-center items-center gap-2 transition-all rounded-sm uppercase tracking-widest text-[10px] font-bold border ${
                            userRsvps[selectedEvent.id] 
                             ? 'bg-herz-black border-green-600 text-green-500' 
                             : 'bg-herz-gold text-herz-black border-herz-gold hover:bg-white'
                          }`}
                      >
                          {userRsvps[selectedEvent.id] ? <Check size={16} /> : <Ticket size={16} />}
                          {userRsvps[selectedEvent.id] ? 'Sie sind angemeldet' : 'Jetzt Zusagen (RSVP)'}
                      </button>

                      <button
                          onClick={() => openCalendarModal(selectedEvent)}
                          className="w-full border border-herz-gold/30 hover:border-herz-gold text-herz-gold hover:text-white py-2 flex justify-center items-center gap-2 transition-all rounded-sm uppercase tracking-widest text-[10px] font-bold group"
                      >
                          <CalendarPlus size={16} className="group-hover:scale-110 transition-transform" />
                          Zum Kalender
                      </button>

                      <div className="pt-4">
                         <span className="text-[10px] uppercase text-gray-500 font-bold tracking-widest block mb-3">Event teilen</span>
                         <div className="flex gap-3">
                            <button 
                               onClick={() => handleShare('facebook', selectedEvent.bandName)} 
                               className="flex-1 bg-[#3b5998] hover:bg-[#4c70ba] text-white py-2 flex justify-center items-center transition-colors rounded-sm"
                            >
                               <Facebook size={18} />
                            </button>
                            <button 
                               onClick={() => handleShare('twitter', selectedEvent.bandName)} 
                               className="flex-1 bg-[#1DA1F2] hover:bg-[#40a9f3] text-white py-2 flex justify-center items-center transition-colors rounded-sm"
                            >
                               <Twitter size={18} />
                            </button>
                         </div>
                      </div>
                  </div>

                  {/* Right: Description Column */}
                  <div className="md:col-span-2">
                      <h3 className="text-herz-gold text-sm uppercase tracking-[0.2em] font-bold mb-4">Über das Event</h3>
                      <p className="text-gray-300 leading-relaxed font-light text-lg mb-6 first-letter:text-4xl first-letter:font-serif first-letter:text-herz-gold first-letter:mr-2 first-letter:float-left">
                        {selectedEvent.description}
                      </p>
                      <p className="text-gray-400 leading-relaxed font-light mb-8">
                        Tauchen Sie ein in eine Nacht voller Rhythmus und Leidenschaft. Unsere Barcrew serviert Ihnen dazu passend unsere Signature-Drinks, während Sie in der einzigartigen Atmosphäre des Herzschlags den Alltag vergessen.
                        <br/><br/>
                        <span className="text-herz-gold italic">Tipp:</span> Kommen Sie rechtzeitig, um sich die besten Plätze zu sichern oder nutzen Sie unsere Reservierungsmöglichkeit.
                      </p>

                      <a href="#reservation" onClick={() => setSelectedEvent(null)} className="inline-block px-8 py-3 bg-herz-red text-white font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-herz-red transition-all shadow-lg">
                         Tisch jetzt reservieren
                      </a>
                  </div>
               </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Events;