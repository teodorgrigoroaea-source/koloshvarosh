import React from 'react';
import { Search, Heart, Dices, Sparkles, MapPin, Compass } from 'lucide-react';
import { Category } from '../types';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  savedCount: number;
  onOpenWishlist: () => void;
  onOpenRandomizer: () => void;
  onQuickCategorySelect: (cat: Category) => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  savedCount,
  onOpenWishlist,
  onOpenRandomizer,
  onQuickCategorySelect,
}) => {
  return (
    <header className="relative">
      {/* Top Navbar */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white shadow-md shadow-orange-500/20 text-xl font-black">
              🏰
            </div>
            <div>
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-stone-900 flex items-center gap-1.5 font-serif">
                Koloshvarosh
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">
                  Cluj Guide
                </span>
              </span>
              <p className="text-[11px] text-stone-400 hidden sm:block">
                Fără orar fix • Descoperă orașul în ritmul tău
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Surprise Me button */}
            <button
              onClick={onOpenRandomizer}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all"
              title="Nu știi ce să faci acum? Lasă zarul să aleagă!"
            >
              <Dices className="w-4 h-4" />
              <span className="hidden sm:inline">Surprinde-mă</span>
              <span className="sm:hidden">Zar</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm shadow-sm transition-all relative"
            >
              <Heart className={`w-4 h-4 text-rose-400 ${savedCount > 0 ? 'fill-current' : ''}`} />
              <span className="hidden md:inline">Lista Mea</span>
              {savedCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-black bg-rose-500 text-white">
                  {savedCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 opacity-25 mix-blend-luminosity">
          <img
            src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1920&q=80"
            alt="Cluj-Napoca Panorama"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/80 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold mb-4 border border-orange-500/30">
            <Compass className="w-3.5 h-3.5" />
            <span>Escapadă de 3 Zile • Cluj-Napoca</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-serif tracking-tight text-white leading-tight">
            Mergi la Cluj? <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400">
              Zero program pe ore, doar experiențe faine.
            </span>
          </h1>

          <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Dacă nu ai mai fost la Cluj, nu ai nevoie de un tabel strict pe zile. Ai nevoie de locuri verificate pe care să le alegi spontan: cafea de specialitate legendară, varză a la Cluj, apus la Cetățuia și baruri unice.
          </p>

          {/* Search Bar in Hero */}
          <div className="mt-8 max-w-xl mx-auto">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-stone-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Caută orice: varză, apus, steampunk, cafea, salină..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-stone-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white/15 transition-all shadow-xl"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-4 text-xs font-bold text-stone-400 hover:text-white px-2 py-1 rounded-md bg-white/10"
                >
                  Șterge
                </button>
              )}
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-stone-400 font-semibold mr-1">Comenzi rapide:</span>
            <button
              onClick={() => onQuickCategorySelect('must-see')}
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-stone-200 border border-white/10 transition-colors"
            >
              🏰 Simbolurile Clujului
            </button>
            <button
              onClick={() => onQuickCategorySelect('coffee')}
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-stone-200 border border-white/10 transition-colors"
            >
              ☕ Cafea de Specialitate
            </button>
            <button
              onClick={() => onQuickCategorySelect('food')}
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-stone-200 border border-white/10 transition-colors"
            >
              🍲 Varză a la Cluj & Papanași
            </button>
            <button
              onClick={() => onQuickCategorySelect('nightlife')}
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-stone-200 border border-white/10 transition-colors"
            >
              🍻 Barul Steampunk Enigma
            </button>
            <button
              onClick={() => onQuickCategorySelect('daytrips')}
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-stone-200 border border-white/10 transition-colors"
            >
              🚗 Salina Turda
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
