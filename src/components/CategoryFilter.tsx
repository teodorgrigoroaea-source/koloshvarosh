import React from 'react';
import { Category, Vibe } from '../types';
import { CATEGORIES_CONFIG } from '../data/clujData';
import { 
  Compass, 
  Landmark, 
  Coffee, 
  Utensils, 
  Beer, 
  Trees, 
  Car, 
  Sparkles, 
  Clock, 
  Filter 
} from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: Category;
  onSelectCategory: (cat: Category) => void;
  selectedVibe: Vibe | 'all';
  onSelectVibe: (vibe: Vibe | 'all') => void;
  showOnlyMustSee: boolean;
  onToggleMustSee: () => void;
  categoryCounts: Record<Category, number>;
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Compass,
  Landmark,
  Coffee,
  Utensils,
  Beer,
  Trees,
  Car,
};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedVibe,
  onSelectVibe,
  showOnlyMustSee,
  onToggleMustSee,
  categoryCounts,
}) => {
  const vibes: { id: Vibe | 'all'; label: string }[] = [
    { id: 'all', label: 'Toate ritmurile' },
    { id: 'rapid', label: '⚡ Rapid (< 1 oră)' },
    { id: 'chill', label: '☕ Relaxat (1 - 2 ore)' },
    { id: 'half-day', label: '🌄 Jumătate de zi' },
  ];

  return (
    <div className="space-y-4 my-8">
      {/* Category Pills Carousel/Wrap */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
        {CATEGORIES_CONFIG.map((cat) => {
          const IconComp = iconMap[cat.icon] || Compass;
          const isSelected = selectedCategory === cat.id;
          const count = categoryCounts[cat.id as Category] || 0;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id as Category)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all shrink-0 shadow-sm ${
                isSelected
                  ? 'bg-orange-600 text-white shadow-orange-600/30 shadow-md scale-105'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200/80 hover:border-stone-300'
              }`}
            >
              <IconComp className="w-4 h-4" />
              <span>{cat.label}</span>
              <span
                className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                  isSelected ? 'bg-orange-700 text-white' : 'bg-stone-100 text-stone-500'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Sub-Filters: Vibe & First-Timer toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold text-stone-400 flex items-center gap-1 mr-1">
            <Clock className="w-3.5 h-3.5" />
            Timp:
          </span>
          {vibes.map((v) => (
            <button
              key={v.id}
              onClick={() => onSelectVibe(v.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                selectedVibe === v.id
                  ? 'bg-stone-900 text-white font-semibold'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>

        {/* Must-See Toggle */}
        <button
          onClick={onToggleMustSee}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            showOnlyMustSee
              ? 'bg-amber-500 text-white shadow-md shadow-amber-500/25 ring-2 ring-amber-300'
              : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 fill-current" />
          <span>Doar cele esențiale (Must-See)</span>
        </button>
      </div>
    </div>
  );
};
