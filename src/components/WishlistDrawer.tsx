import React from 'react';
import { Place } from '../types';
import { X, Trash2, CheckCircle2, Circle, MapPin, ExternalLink, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedPlaces: Place[];
  visitedIds: string[];
  onToggleVisited: (id: string) => void;
  onRemove: (id: string) => void;
  onSelectPlace: (place: Place) => void;
  onClearAll: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  savedPlaces,
  visitedIds,
  onToggleVisited,
  onRemove,
  onSelectPlace,
  onClearAll,
}) => {
  if (!isOpen) return null;

  const visitedCount = savedPlaces.filter((p) => visitedIds.includes(p.id)).length;
  const progressPercent = savedPlaces.length > 0 ? Math.round((visitedCount / savedPlaces.length) * 100) : 0;

  const handleToggleCheck = (id: string) => {
    const willBeVisited = !visitedIds.includes(id);
    onToggleVisited(id);
    if (willBeVisited) {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { x: 0.9, y: 0.5 },
        colors: ['#10b981', '#3b82f6', '#f59e0b']
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-stone-200">
          {/* Header */}
          <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50/50">
            <div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500 fill-current" />
                <h2 className="text-xl font-bold text-stone-900">Lista Mea de Cluj</h2>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Locurile pe care vrei să le bifezi în cele 3 zile
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-stone-200 text-stone-500 transition-colors"
              aria-label="Închide sertarul"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress bar if has places */}
          {savedPlaces.length > 0 && (
            <div className="px-6 py-3 bg-amber-50/60 border-b border-amber-200/50 flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-xs font-semibold text-amber-900">
                <span>Progres explorare:</span>
                <span>{visitedCount} din {savedPlaces.length} vizitate ({progressPercent}%)</span>
              </div>
              <div className="w-full bg-amber-200/60 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Place List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {savedPlaces.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-4">
                <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mb-4">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg text-stone-800">Nu ai salvat încă niciun loc</h3>
                <p className="text-sm text-stone-500 mt-2 max-w-xs">
                  Apasă pe inimioara ❤️ de pe cardurile din ghid pentru a-ți salva locurile favorite fără bătăi de cap.
                </p>
              </div>
            ) : (
              savedPlaces.map((place) => {
                const isVisited = visitedIds.includes(place.id);
                return (
                  <div
                    key={place.id}
                    className={`group relative rounded-2xl border p-4 transition-all duration-200 ${
                      isVisited
                        ? 'bg-stone-50 border-stone-200 opacity-75'
                        : 'bg-white border-stone-200 hover:border-orange-300 shadow-sm'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Visited Checkbox */}
                      <button
                        onClick={() => handleToggleCheck(place.id)}
                        className="mt-1 shrink-0 text-stone-400 hover:text-emerald-600 transition-colors"
                        title={isVisited ? "Marchează ca nevizitat" : "Marchează ca vizitat"}
                      >
                        {isVisited ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                        ) : (
                          <Circle className="w-5 h-5 text-stone-300 hover:text-stone-400" />
                        )}
                      </button>

                      {/* Info */}
                      <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onSelectPlace(place)}>
                        <h4 className={`font-bold text-sm text-stone-900 group-hover:text-orange-600 transition-colors ${
                          isVisited ? 'line-through text-stone-400' : ''
                        }`}>
                          {place.name}
                        </h4>
                        <p className="text-xs text-stone-500 mt-0.5 line-clamp-1">
                          {place.tagline}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-[11px] text-stone-400">
                          <span>{place.neighborhood}</span>
                          <span>•</span>
                          <span>{place.durationEstimate}</span>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => onRemove(place.id)}
                        className="p-1.5 text-stone-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors shrink-0"
                        title="Șterge din listă"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quick Maps link */}
                    <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs">
                      <button
                        onClick={() => onSelectPlace(place)}
                        className="text-orange-600 font-semibold hover:underline"
                      >
                        Vezi detalii & ponturi
                      </button>
                      <a
                        href={place.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-stone-500 hover:text-stone-800"
                      >
                        <MapPin className="w-3 h-3" />
                        <span>Maps</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Actions */}
          {savedPlaces.length > 0 && (
            <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between">
              <button
                onClick={onClearAll}
                className="text-xs text-stone-500 hover:text-rose-600 font-medium transition-colors"
              >
                Golește toată lista
              </button>
              <button
                onClick={onClose}
                className="py-2.5 px-5 rounded-xl bg-orange-600 text-white font-bold text-xs hover:bg-orange-700 shadow-md shadow-orange-600/20 transition-all"
              >
                Gata, continuă explorarea
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
