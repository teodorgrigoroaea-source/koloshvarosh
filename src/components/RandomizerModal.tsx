import React, { useState, useEffect } from 'react';
import { Place } from '../types';
import { X, Dices, Sparkles, MapPin, ExternalLink, ArrowRight, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RandomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  places: Place[];
  onSelectPlace: (place: Place) => void;
}

export const RandomizerModal: React.FC<RandomizerModalProps> = ({
  isOpen,
  onClose,
  places,
  onSelectPlace,
}) => {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    if (places.length === 0) return;
    setIsRolling(true);

    let counter = 0;
    const interval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * places.length);
      setSelectedPlace(places[randomIdx]);
      counter++;

      if (counter > 12) {
        clearInterval(interval);
        const finalIdx = Math.floor(Math.random() * places.length);
        const chosen = places[finalIdx];
        setSelectedPlace(chosen);
        setIsRolling(false);

        // Burst confetti
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#ea580c', '#f59e0b', '#10b981', '#6366f1']
        });
      }
    }, 80);
  };

  useEffect(() => {
    if (isOpen) {
      rollDice();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div
        className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 z-10 border border-stone-200 text-center animate-in fade-in zoom-in-95 duration-200">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
          aria-label="Închide"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs font-bold mb-3">
          <Dices className="w-4 h-4 animate-spin-slow" />
          <span>Ce să fac ACUM?</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
          Următoarea ta oprire la Cluj
        </h3>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Nu mai sta pe gânduri. Uite o idee spontană recomandată pentru tine:
        </p>

        {/* Selected Place Card */}
        {selectedPlace && (
          <div className={`mt-6 rounded-2xl border border-stone-200 overflow-hidden bg-stone-50 text-left transition-all duration-300 ${
            isRolling ? 'opacity-60 scale-98 blur-[0.5px]' : 'opacity-100 scale-100 shadow-md'
          }`}>
            <div className="relative h-44 w-full overflow-hidden">
              <img
                src={selectedPlace.imageUrl}
                alt={selectedPlace.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/20 backdrop-blur-md">
                  {selectedPlace.neighborhood}
                </span>
                <h4 className="font-bold text-lg mt-1 leading-snug">
                  {selectedPlace.name}
                </h4>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <p className="text-xs text-stone-600 line-clamp-2">
                {selectedPlace.tagline}
              </p>

              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900">
                <span className="font-bold text-amber-800">💡 Pont: </span>
                {selectedPlace.insiderTip}
              </div>

              <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
                <span>Durată: <strong>{selectedPlace.durationEstimate}</strong></span>
                <span>Buget: <strong>{selectedPlace.priceLevel}</strong></span>
              </div>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={rollDice}
            disabled={isRolling}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-stone-300 hover:border-orange-500 text-stone-700 font-bold text-sm hover:text-orange-600 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isRolling ? 'animate-spin' : ''}`} />
            <span>Nu-mi place, trage din nou!</span>
          </button>

          {selectedPlace && (
            <button
              onClick={() => {
                onClose();
                onSelectPlace(selectedPlace);
              }}
              disabled={isRolling}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-orange-600 text-white font-bold text-sm hover:bg-orange-700 shadow-lg shadow-orange-600/25 transition-all disabled:opacity-50"
            >
              <span>Vreau detalii</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
