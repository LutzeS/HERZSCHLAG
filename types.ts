
export interface MenuItem {
  id: string;
  category: 'speisen' | 'getraenke';
  name: string;
  description: string;
  price: string;
  isSpecial?: boolean;
  imageUrl?: string;
}

export interface EventItem {
  id: string;
  date: string;
  time: string;
  bandName: string;
  genre: string;
  description: string;
  imageUrl?: string;
}

export interface OpeningHour {
  day: string;
  hours: string;
}
