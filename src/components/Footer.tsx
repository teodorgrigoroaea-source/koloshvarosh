import React from 'react';
import { Heart, Compass, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-950 text-stone-400 py-12 border-t border-stone-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏰</span>
            <div>
              <div className="font-serif font-bold text-white text-base">
                Koloshvarosh • Ghid de Cluj-Napoca
              </div>
              <p className="text-xs text-stone-500">
                Fără stres, fără program pe ore. Doar experiențe bune în inima Transilvaniei.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs">
            <span className="flex items-center gap-1.5 text-stone-300">
              <MapPin className="w-3.5 h-3.5 text-orange-500" />
              Cluj-Napoca / Kolozsvár / Klausenburg
            </span>
            <span className="text-stone-600">•</span>
            <span className="flex items-center gap-1">
              Făcut cu <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" /> pentru călători curioși
            </span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-stone-900 text-center text-xs text-stone-600">
          Să ai 3 zile de neuitat la Cluj! „No hai, drum bun!” 🚂☕
        </div>
      </div>
    </footer>
  );
};
