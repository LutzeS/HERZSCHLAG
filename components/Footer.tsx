import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-herz-black pt-20 pb-10 border-t border-herz-gold/10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-herz-gold/30 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
           
           {/* Logo Section */}
           <div className="mb-6 md:mb-0 text-center md:text-left flex flex-col items-center md:items-start">
              <Logo className="h-28 w-auto mb-4 opacity-90 hover:opacity-100 transition-opacity" />
              <p className="text-gray-500 text-xs uppercase tracking-[0.2em] max-w-xs leading-relaxed mt-2 text-center md:text-left">
                 Live-Musik, ehrliche Küche & <br/>die besten Nächte der Stadt.
              </p>
           </div>
           
           <div className="flex space-x-8">
              <a href="#" className="group flex flex-col items-center text-gray-500 hover:text-herz-gold transition-colors">
                 <div className="p-3 border border-gray-800 rounded-full group-hover:border-herz-gold transition-colors mb-2">
                    <Facebook size={20} />
                 </div>
                 <span className="text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-6">Facebook</span>
              </a>
              <a href="#" className="group flex flex-col items-center text-gray-500 hover:text-herz-red transition-colors">
                 <div className="p-3 border border-gray-800 rounded-full group-hover:border-herz-red transition-colors mb-2">
                    <Instagram size={20} />
                 </div>
                 <span className="text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-6">Instagram</span>
              </a>
              <a href="#" className="group flex flex-col items-center text-gray-500 hover:text-herz-gold transition-colors">
                 <div className="p-3 border border-gray-800 rounded-full group-hover:border-herz-gold transition-colors mb-2">
                    <Twitter size={20} />
                 </div>
                 <span className="text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-6">Twitter</span>
              </a>
           </div>
        </div>
        
        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-600 uppercase tracking-widest font-bold">
           <div className="flex space-x-8 mb-4 md:mb-0">
              <a href="#" className="hover:text-herz-cream transition-colors relative group">
                 Impressum
                 <span className="absolute -bottom-1 left-0 w-0 h-px bg-herz-gold transition-all group-hover:w-full"></span>
              </a>
              <a href="#" className="hover:text-herz-cream transition-colors relative group">
                 Datenschutz
                 <span className="absolute -bottom-1 left-0 w-0 h-px bg-herz-gold transition-all group-hover:w-full"></span>
              </a>
              <a href="#" className="hover:text-herz-cream transition-colors relative group">
                 AGB
                 <span className="absolute -bottom-1 left-0 w-0 h-px bg-herz-gold transition-all group-hover:w-full"></span>
              </a>
           </div>
           <div>
              &copy; {new Date().getFullYear()} Herzschlag Pub. Alle Rechte vorbehalten.
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;