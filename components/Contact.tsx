import React from 'react';
import { OPENING_HOURS } from '../constants';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="bg-herz-charcoal py-20 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Info Column */}
          <div>
            <h2 className="font-serif text-4xl text-herz-cream mb-8">Kontakt & Öffnungszeiten</h2>
            
            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-4">
                <MapPin className="text-herz-gold mt-1" size={20} />
                <div>
                  <h4 className="text-herz-cream font-bold uppercase tracking-wide text-sm mb-1">Anschrift</h4>
                  <p className="text-gray-400 font-light">Altstadtmarkt 12<br/>38100 Braunschweig</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Phone className="text-herz-gold mt-1" size={20} />
                <div>
                  <h4 className="text-herz-cream font-bold uppercase tracking-wide text-sm mb-1">Telefon</h4>
                  <p className="text-gray-400 font-light">+49 (0) 531 1234567</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="text-herz-gold mt-1" size={20} />
                <div>
                  <h4 className="text-herz-cream font-bold uppercase tracking-wide text-sm mb-2">Öffnungszeiten</h4>
                  <ul className="space-y-1">
                    {OPENING_HOURS.map((oh) => (
                      <li key={oh.day} className="flex justify-between w-full max-w-xs text-gray-400 font-light text-sm border-b border-gray-700/50 pb-1 mb-1">
                        <span>{oh.day}</span>
                        <span className="text-herz-cream">{oh.hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="w-full h-64 bg-gray-800 rounded-sm overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                {/* Simulated Map */}
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2446.064560797384!2d10.5152!3d52.2645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDE1JzUyLjIiTiAxMMKwMzAnNTQuNyJF!5e0!3m2!1sen!2sde!4v1629890000000!5m2!1sen!2sde" 
                  width="100%" 
                  height="100%" 
                  style={{border:0}} 
                  loading="lazy"
                  title="Map"
                  className="opacity-70 hover:opacity-100 transition-opacity"
                ></iframe>
            </div>
          </div>

          {/* Reservation Form */}
          <div id="reservation" className="bg-herz-black p-8 md:p-12 border border-herz-gold/20 shadow-2xl relative">
             <div className="absolute top-0 right-0 w-20 h-20 bg-herz-gold/10 rounded-bl-full"></div>
             
             <h3 className="font-serif text-3xl text-herz-gold mb-6">Tisch reservieren</h3>
             <p className="text-gray-400 text-sm mb-8 font-light">
               Sichern Sie sich Ihren Platz im Herzen des Geschehens. Für Gruppen ab 10 Personen bitten wir um telefonische Reservierung.
             </p>

             <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-gray-500">Datum</label>
                      <input type="date" className="w-full bg-herz-charcoal border border-gray-700 text-herz-cream p-3 focus:outline-none focus:border-herz-gold transition-colors" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-gray-500">Zeit</label>
                      <input type="time" className="w-full bg-herz-charcoal border border-gray-700 text-herz-cream p-3 focus:outline-none focus:border-herz-gold transition-colors" />
                   </div>
                </div>
                
                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500">Personen</label>
                    <select className="w-full bg-herz-charcoal border border-gray-700 text-herz-cream p-3 focus:outline-none focus:border-herz-gold transition-colors">
                       {[2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} Personen</option>)}
                    </select>
                </div>

                <div className="space-y-2">
                   <label className="text-xs uppercase tracking-widest text-gray-500">Name</label>
                   <input type="text" placeholder="Ihr Name" className="w-full bg-herz-charcoal border border-gray-700 text-herz-cream p-3 focus:outline-none focus:border-herz-gold transition-colors" />
                </div>
                
                <div className="space-y-2">
                   <label className="text-xs uppercase tracking-widest text-gray-500">Email</label>
                   <input type="email" placeholder="ihre@email.de" className="w-full bg-herz-charcoal border border-gray-700 text-herz-cream p-3 focus:outline-none focus:border-herz-gold transition-colors" />
                </div>

                <button type="submit" className="w-full bg-herz-gold text-herz-black font-bold uppercase tracking-widest py-4 mt-4 hover:bg-white transition-colors duration-300">
                   Jetzt Reservieren
                </button>
             </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;