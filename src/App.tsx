import React, { useState, useEffect, useMemo } from 'react';
import { CLUJ_PLACES } from './data/clujData';
import { Place, Category, Vibe } from './types';
import { Header } from './components/Header';
import { CategoryFilter } from './components/CategoryFilter';
import { PlaceCard } from './components/PlaceCard';
import { PlaceModal } from './components/PlaceModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { RandomizerModal } from './components/RandomizerModal';
import { ClujTipsSection } from './components/ClujTipsSection';
import { Footer } from './components/Footer';
import { Compass, Sparkles, Coffee, Sunset, Moon, Utensils, Heart } from 'lucide-react';

export const App: React.FC = () => {
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedVibe, setSelectedVibe] = useState<Vibe | 'all'>('all');
  const [showOnlyMustSee, setShowOnlyMustSee] = useState(false);

  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isRandomizerOpen, setIsRandomizerOpen] = useState(false);

  // LocalStorage for saved & visited
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('koloshvarosh_saved');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [visitedIds, setVisitedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('koloshvarosh_visited');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('koloshvarosh_saved', JSON.stringify(savedIds));
  }, [savedIds]);

  useEffect(() => {
    localStorage.setItem('koloshvarosh_visited', JSON.stringify(visitedIds));
  }, [visitedIds]);

  // Wishlist handlers
  const handleToggleSave = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleVisited = (id: string) => {
    setVisitedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleClearWishlist = () => {
    if (window.confirm('Sigur vrei să golești toată lista ta salvată?')) {
      setSavedIds([]);
      setVisitedIds([]);
    }
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<Category, number> = {
      all: CLUJ_PLACES.length,
      'must-see': 0,
      coffee: 0,
      food: 0,
      nightlife: 0,
      nature: 0,
      daytrips: 0,
    };

    CLUJ_PLACES.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });

    return counts;
  }, []);

  // Filtered places
  const filteredPlaces = useMemo(() => {
    return CLUJ_PLACES.filter((place) => {
      // Category filter
      if (selectedCategory !== 'all' && place.category !== selectedCategory) {
        return false;
      }

      // Vibe filter
      if (selectedVibe !== 'all' && place.vibe !== selectedVibe) {
        return false;
      }

      // Must see filter
      if (showOnlyMustSee && !place.isEssentialFirstTimer) {
        return false;
      }

      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = place.name.toLowerCase().includes(q);
        const matchesAlt = place.romanianOrHungarianAltName?.toLowerCase().includes(q);
        const matchesTagline = place.tagline.toLowerCase().includes(q);
        const matchesDesc = place.description.toLowerCase().includes(q);
        const matchesTip = place.insiderTip.toLowerCase().includes(q);
        const matchesNeighborhood = place.neighborhood.toLowerCase().includes(q);
        const matchesTags = place.tags.some((t) => t.toLowerCase().includes(q));

        if (!matchesName && !matchesAlt && !matchesTagline && !matchesDesc && !matchesTip && !matchesNeighborhood && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, selectedVibe, showOnlyMustSee, searchQuery]);

  const savedPlaces = useMemo(() => {
    return CLUJ_PLACES.filter((p) => savedIds.includes(p.id));
  }, [savedIds]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900">
      {/* Top Header & Hero */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        savedCount={savedIds.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenRandomizer={() => setIsRandomizerOpen(true)}
        onQuickCategorySelect={(cat) => {
          setSelectedCategory(cat);
          const el = document.getElementById('discovery-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full" id="discovery-section">
        {/* Mindset Card: Cum să abordezi cele 3 zile */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-transparent border border-orange-200/70 mb-10 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-600 text-white mb-2 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                Filosofia Clujului: Zero Stres
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900">
                Cum să abordezi orașul în 3 zile fără program fix
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                Clujul nu este un oraș pe care să-l alergi cu cronometrul în mână. Secretul este să mergi pe ritmul zilei:
              </p>
            </div>

            {/* Micro Flow Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <div className="p-3 rounded-2xl bg-white/80 border border-stone-200 shadow-sm flex flex-col justify-between">
                <div className="flex items-center gap-2 text-amber-700 font-bold">
                  <Coffee className="w-4 h-4 shrink-0" />
                  <span>Dimineața</span>
                </div>
                <p className="text-[11px] text-stone-500 mt-1">
                  Specialty coffee & brunch pe Eroilor sau Napoca.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-white/80 border border-stone-200 shadow-sm flex flex-col justify-between">
                <div className="flex items-center gap-2 text-orange-700 font-bold">
                  <Utensils className="w-4 h-4 shrink-0" />
                  <span>Prânzul</span>
                </div>
                <p className="text-[11px] text-stone-500 mt-1">
                  Varză a la Cluj la Vărzărie sau ciorbă în pită la Zama.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-white/80 border border-stone-200 shadow-sm flex flex-col justify-between">
                <div className="flex items-center gap-2 text-rose-700 font-bold">
                  <Sunset className="w-4 h-4 shrink-0" />
                  <span>Apusul</span>
                </div>
                <p className="text-[11px] text-stone-500 mt-1">
                  Urcat pe jos pe Cetățuia sau hidrobiciclete în Parc.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-white/80 border border-stone-200 shadow-sm flex flex-col justify-between">
                <div className="flex items-center gap-2 text-purple-700 font-bold">
                  <Moon className="w-4 h-4 shrink-0" />
                  <span>Seara</span>
                </div>
                <p className="text-[11px] text-stone-500 mt-1">
                  Piața Muzeului, barul Steampunk Enigma sau jazz la Charlie.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900">
            Alege ce-ți face cu ochiul ({filteredPlaces.length} opțiuni)
          </h2>
        </div>

        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedVibe={selectedVibe}
          onSelectVibe={setSelectedVibe}
          showOnlyMustSee={showOnlyMustSee}
          onToggleMustSee={() => setShowOnlyMustSee(!showOnlyMustSee)}
          categoryCounts={categoryCounts}
        />

        {/* Places Grid */}
        {filteredPlaces.length === 0 ? (
          <div className="my-16 text-center py-16 px-4 bg-white rounded-3xl border border-dashed border-stone-300">
            <span className="text-4xl">🔍</span>
            <h3 className="text-lg font-bold text-stone-800 mt-3">
              Nu am găsit rezultate pentru criteriile tale
            </h3>
            <p className="text-sm text-stone-500 mt-1 max-w-sm mx-auto">
              Încearcă să resetezi filtrele sau să cauți alt termen („cafea”, „varză”, „grădina”).
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedVibe('all');
                setShowOnlyMustSee(false);
              }}
              className="mt-4 px-5 py-2.5 rounded-xl bg-orange-600 text-white font-bold text-xs hover:bg-orange-700 transition-colors"
            >
              Resetează toate filtrele
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPlaces.map((place) => (
              <PlaceCard
                key={place.id}
                place={place}
                isSaved={savedIds.includes(place.id)}
                onToggleSave={handleToggleSave}
                onSelect={(p) => setSelectedPlace(p)}
              />
            ))}
          </div>
        )}

        {/* Practical Survival Tips Component */}
        <ClujTipsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Place Detail Modal */}
      <PlaceModal
        place={selectedPlace}
        isOpen={!!selectedPlace}
        onClose={() => setSelectedPlace(null)}
        isSaved={selectedPlace ? savedIds.includes(selectedPlace.id) : false}
        onToggleSave={handleToggleSave}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        savedPlaces={savedPlaces}
        visitedIds={visitedIds}
        onToggleVisited={handleToggleVisited}
        onRemove={handleToggleSave}
        onSelectPlace={(p) => {
          setIsWishlistOpen(false);
          setSelectedPlace(p);
        }}
        onClearAll={handleClearWishlist}
      />

      {/* Randomizer Modal */}
      <RandomizerModal
        isOpen={isRandomizerOpen}
        onClose={() => setIsRandomizerOpen(false)}
        places={CLUJ_PLACES}
        onSelectPlace={(p) => {
          setIsRandomizerOpen(false);
          setSelectedPlace(p);
        }}
      />
    </div>
  );
};
