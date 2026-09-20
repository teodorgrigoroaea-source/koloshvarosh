import React from 'react';
import { Place } from '../types';
import { Heart, MapPin, Clock, ExternalLink, Sparkles } from 'lucide-react';

interface PlaceCardProps {
  place: Place;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onSelect: (place: Place) => void;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({
  place,
  isSaved,
  onToggleSave,
  onSelect,
}) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
      {/* Image & Badges */}
      <div className="relative aspect-[16/10] overflow-hidden cursor-pointer bg-stone-100" onClick={() => onSelect(place)}>
        <img
          src={place.imageUrl}
          alt={place.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-70 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="pointer-events-auto px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 text-stone-800 backdrop-blur-md shadow-sm">
            {place.neighborhood}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(place.id);
            }}
            aria-label={isSaved ? "Șterge din favorite" : "Adaugă la favorite"}
            className={`pointer-events-auto p-2 rounded-full backdrop-blur-md transition-all duration-200 shadow-md ${
              isSaved
                ? 'bg-rose-500 text-white scale-110 shadow-rose-500/30'
                : 'bg-white/80 text-stone-700 hover:bg-white hover:text-rose-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* First Timer Badge */}
        {place.isEssentialFirstTimer && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500 text-white shadow-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Must-See Prima Dată</span>
          </div>
        )}

        {/* Price Level */}
        <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md text-xs font-semibold bg-black/60 text-white backdrop-blur-sm">
          {place.priceLevel}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between cursor-pointer" onClick={() => onSelect(place)}>
        <div>
          <h3 className="font-bold text-lg text-stone-900 group-hover:text-orange-600 transition-colors line-clamp-1">
            {place.name}
          </h3>
          <p className="text-sm text-stone-500 mt-1 line-clamp-2">
            {place.tagline}
          </p>

          {/* Local Tip Snippet */}
          <div className="mt-3.5 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900 flex items-start gap-2">
            <span className="font-bold shrink-0 text-amber-700">💡 Pont:</span>
            <span className="line-clamp-2 italic">{place.insiderTip}</span>
          </div>
        </div>

        {/* Footer Meta */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-stone-400" />
            <span>{place.durationEstimate}</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={place.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 text-orange-600 hover:text-orange-700 font-semibold hover:underline"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Harta</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
