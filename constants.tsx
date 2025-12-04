import React from 'react';
import { MenuItem, EventItem, OpeningHour } from './types';
import { Music, Utensils, Beer, Phone, MapPin, Clock } from 'lucide-react';

export const NAV_LINKS = [
  { name: 'Start', href: '#hero' },
  { name: 'Über Uns', href: '#about' },
  { name: 'Programm', href: '#events' },
  { name: 'Speisekarte', href: '#menu' },
  { name: 'Kontakt', href: '#contact' },
];

export const OPENING_HOURS: OpeningHour[] = [
  { day: 'Montag - Mittwoch', hours: '17:00 - 00:00' },
  { day: 'Donnerstag', hours: '17:00 - 01:00' },
  { day: 'Freitag - Samstag', hours: '17:00 - 03:00' },
  { day: 'Sonntag', hours: '10:00 - 00:00 (Brunch bis 14:00)' },
];

// Calculate a dynamic date for "Next 7 Days" demo purposes
const getDynamicDate = (daysToAdd: number) => {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);
  const monthNames = ['JAN', 'FEB', 'MÄR', 'APR', 'MAI', 'JUN', 'JUL', 'AUG', 'SEP', 'OKT', 'NOV', 'DEZ'];
  return `${date.getDate()}. ${monthNames[date.getMonth()]}`;
};

export const EVENTS: EventItem[] = [
  {
    id: 'highlight-dynamic',
    date: getDynamicDate(2), // Always 2 days in the future
    time: '20:30',
    bandName: 'The Herzschlag Allstars',
    genre: 'Rock Classics',
    description: 'Unsere Hausband spielt die größten Rock-Hymnen der letzten 40 Jahre. Ein Abend voller Energie!',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: '1',
    date: '12. NOV',
    time: '20:00',
    bandName: 'The Rusty Strings',
    genre: 'Acoustic Rock',
    description: 'Ehrlicher Rock mit handgemachten Klängen. Die perfekte Begleitung für einen Abend unter Freunden.',
    imageUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    date: '18. NOV',
    time: '21:00',
    bandName: 'Soul Kitchen Live',
    genre: 'Soul & Funk',
    description: 'Groovige Beats und starke Stimmen. Ein Abend zum Tanzen und Genießen.',
    imageUrl: 'https://images.unsplash.com/photo-1563841930606-67e26ce48b19?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: '3',
    date: '25. NOV',
    time: '20:00',
    bandName: 'Blues Brothers Tribute',
    genre: 'Blues',
    description: 'Wir bringen Chicago in unser Pub. Sonnenbrille aufsetzen nicht vergessen!',
    imageUrl: 'https://images.unsplash.com/photo-1524779709304-40b5a3560c60?q=80&w=2669&auto=format&fit=crop'
  }
];

export const MENU_HIGHLIGHTS: MenuItem[] = [
  {
    id: 'f1',
    category: 'speisen',
    name: 'Der Herzschlag Burger',
    description: '200g Dry-Aged Beef, karamellisierte Zwiebeln, Bacon-Jam, Cheddar & unsere geheime Haus-Sauce im Brioche Bun.',
    price: '16.90€',
    isSpecial: true,
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=2700&auto=format&fit=crop'
  },
  {
    id: 'f2',
    category: 'speisen',
    name: 'Braumeister Schnitzel',
    description: 'Zartes Kalbsschnitzel in Malz-Panade, dazu lauwarmer Kartoffel-Gurkensalat.',
    price: '21.50€',
    imageUrl: 'https://images.unsplash.com/photo-1599921841143-819065f55084?q=80&w=2600&auto=format&fit=crop'
  },
  {
    id: 'f3',
    category: 'speisen',
    name: 'Irish Stew',
    description: 'Traditioneller Lamm-Eintopf mit Wurzelgemüse, Kartoffeln und Guinness verfeinert.',
    price: '14.50€',
    imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: 'd1',
    category: 'getraenke',
    name: 'Herzschlag Dunkel',
    description: 'Unser Hausbier. Malzig, süffig, mit einer leichten Kaffeenote. 0.5l',
    price: '5.20€',
    isSpecial: true
  },
  {
    id: 'd2',
    category: 'getraenke',
    name: 'Whisky Sour Gold',
    description: 'Bourbon, Zitrone, Zuckersirup, Eiweiß und Blattgold-Finish.',
    price: '11.00€'
  }
];

export const HeartbeatSeparator = () => (
  <div className="w-full flex items-center justify-center py-8 opacity-60">
    <div className="h-px bg-herz-gold w-1/4 md:w-1/3"></div>
    <svg className="w-24 h-12 text-herz-gold mx-4" viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M0,20 L20,20 L30,5 L40,35 L50,10 L60,30 L70,20 L100,20" vectorEffect="non-scaling-stroke" />
    </svg>
    <div className="h-px bg-herz-gold w-1/4 md:w-1/3"></div>
  </div>
);