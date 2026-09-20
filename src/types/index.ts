export type Category = 
  | 'all' 
  | 'must-see' 
  | 'coffee' 
  | 'food' 
  | 'nightlife' 
  | 'nature' 
  | 'daytrips';

export type Vibe = 'rapid' | 'chill' | 'half-day' | 'free';

export interface Place {
  id: string;
  name: string;
  romanianOrHungarianAltName?: string;
  tagline: string;
  category: Category;
  description: string;
  highlight: string;
  insiderTip: string;
  recommendedOrderOrTime?: string;
  vibe: Vibe;
  durationEstimate: string;
  priceLevel: 'Gratuit' | '€' | '€€' | '€€€';
  address: string;
  neighborhood: string;
  googleMapsUrl: string;
  imageUrl: string;
  tags: string[];
  isEssentialFirstTimer?: boolean;
}

export interface PracticalTip {
  icon: string;
  title: string;
  summary: string;
  details: string;
}
