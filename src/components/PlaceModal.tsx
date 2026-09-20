import React, { useEffect } from 'react';
import { Place } from '../types';
import { X, MapPin, Clock, ExternalLink, Heart, Sparkles, Compass, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PlaceModalProps {
  place: Place | null;
  isOpen: boolean;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export const PlaceModal: React.FC<PlaceModalProps> = ({
  place,
  isOpen,
  onClose,
  isSaved,
  onToggleSave,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !place) return null;

  const handleSaveWithConfetti = () => {
    onToggleSave(place.id);
    if (!isSaved) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#ea580c', '#f59e0b', '#ec4899']
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto z-10 border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-stone-900/60 hover:bg-stone-900 text-white backdrop-blur-md transition-colors"
          aria-label="Închide"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img
            src={place.imageUrl}
            alt={place.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white border border-white/30">
                {place.neighborhood}
              </span>
              {place.isEssentialFirstTimer && (
                <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-white">
                  <Sparkles className="w-3.5 h-3.5" />
                  Must-See Cluj
                </span>
              )}
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-white text-stone-900">
                {place.priceLevel}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold leading-tight drop-shadow-sm">
              {place.name}
            </h2>
            {place.romanianOrHungarianAltName && (
              <p className="text-xs sm:text-sm text-stone-300 italic mt-0.5">
                {place.romanianOrHungarianAltName}
              </p>
            )}
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Tagline */}
          <p className="text-base sm:text-lg font-medium text-stone-700 leading-relaxed border-l-4 border-orange-500 pl-4 py-1 bg-orange-50/40 rounded-r-lg">
            {place.tagline}
          </p>

          {/* Full Description */}
          <div>
            <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Despre acest loc</h4>
            <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
              {place.description}
            </p>
          </div>

          {/* Key Highlight */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-amber-950">De ce merită să vii aici</h4>
                <p className="text-xs sm:text-sm text-amber-900 mt-1 leading-relaxed">
                  {place.highlight}
                </p>
              </div>
            </div>
          </div>

          {/* Insider Tip & Recommended Order/Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/70">
              <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-800 flex items-center gap-1.5 mb-1.5">
                💡 Pont de localnic
              </h4>
              <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
                {place.insiderTip}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200/70">
              <h4 className="font-bold text-xs uppercase tracking-wider text-sky-800 flex items-center gap-1.5 mb-1.5">
                <Clock className="w-4 h-4" />
                Când să mergi / Ce să ceri
              </h4>
              <p className="text-xs sm:text-sm text-sky-950 leading-relaxed">
                {place.recommendedOrderOrTime || `Timp estimat recomandat: ${place.durationEstimate}`}
              </p>
            </div>
          </div>

          {/* Address & Meta */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-stone-200 text-sm text-stone-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
              <span className="font-medium text-stone-800">{place.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-stone-400 shrink-0" />
              <span>Durată medie: <strong>{place.durationEstimate}</strong></span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {place.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-600"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleSaveWithConfetti}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-bold text-sm transition-all duration-200 shadow-sm ${
                isSaved
                  ? 'bg-rose-50 text-rose-600 border-2 border-rose-300 hover:bg-rose-100'
                  : 'bg-rose-500 text-white hover:bg-rose-600 shadow-rose-500/20'
              }`}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              <span>{isSaved ? 'Salvat în Lista Mea' : 'Adaugă în Lista Mea'}</span>
            </button>

            <a
              href={place.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-bold text-sm bg-orange-600 text-white hover:bg-orange-700 shadow-lg shadow-orange-600/25 transition-all duration-200"
            >
              <Compass className="w-4 h-4" />
              <span>Deschide în Google Maps</span>
              <ExternalLink className="w-4 h-4 opacity-80" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
